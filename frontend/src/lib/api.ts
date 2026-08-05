let memoryToken: string | null = null;
let refreshPromise: Promise<string> | null = null;

export function getAccessToken(): string | null {
  return memoryToken;
}

export function setAccessToken(token: string | null) {
  memoryToken = token;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (memoryToken) {
    headers['Authorization'] = `Bearer ${memoryToken}`;
  }

  options.credentials = 'include';

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && path !== '/auth/login' && path !== '/auth/refresh') {
    try {
      const newAccessToken = await refreshAccessToken();
      headers['Authorization'] = `Bearer ${newAccessToken}`;
      const retryResponse = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
      });

      if (!retryResponse.ok) {
        throw new Error('No autorizado tras refrescar token');
      }

      if (retryResponse.status === 204) {
        return {} as T;
      }
      return retryResponse.json();
    } catch (error) {
      setAccessToken(null);
      throw new Error('Sesión expirada');
    }
  }

  if (!response.ok) {
    let errorMessage = 'Ha ocurrido un error inesperado';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage.join(', ');
      }
    } catch (_) {}
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

async function refreshAccessToken(): Promise<string> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('No se pudo refrescar el token');
      }

      const data = await res.json();
      const token = data.accessToken;
      setAccessToken(token);
      return token;
    } catch (err) {
      setAccessToken(null);
      throw err;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
