'use client';

import { useState, useEffect } from 'react';

/**
 * Utilidad de Feature Flags para SegurityMZ Manager.
 * Permite desacoplar el Despliegue (Deploy continuo a main) de la Liberación (Release a usuarios).
 * 
 * Reglas de Trunk-Based Development:
 * 1. Las funcionalidades incompletas se despliegan apagadas por defecto.
 * 2. Se pueden encender en local o staging mediante variables de entorno o query params / localStorage.
 * 3. Una vez estabilizada la función y aprobada por el PO, se enciende por defecto y se programa su retiro.
 */

export interface FeatureFlags {
  comprasModule: boolean;
  finanzasModule: boolean;
  ordenesTrabajoV2: boolean;
  darkLaunchTester: boolean;
}

const defaultFlags: FeatureFlags = {
  comprasModule: process.env.NEXT_PUBLIC_FEATURE_COMPRAS === 'true',
  finanzasModule: process.env.NEXT_PUBLIC_FEATURE_FINANZAS === 'true',
  ordenesTrabajoV2: process.env.NEXT_PUBLIC_FEATURE_ORDENES_V2 === 'true',
  darkLaunchTester: process.env.NEXT_PUBLIC_FEATURE_DARK_LAUNCH === 'true',
};

export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  if (typeof window === 'undefined') {
    return defaultFlags[flag] ?? false;
  }

  try {
    const override = localStorage.getItem(`ff_${flag}`);
    if (override !== null) {
      return override === 'true';
    }
  } catch {
    // Manejo seguro en caso de SSR o restricciones
  }

  return defaultFlags[flag] ?? false;
}

/**
 * Hook de React para usar Feature Flags de forma reactiva y compatible con SSR en Next.js
 */
export function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  const [enabled, setEnabled] = useState<boolean>(defaultFlags[flag] ?? false);

  useEffect(() => {
    setEnabled(isFeatureEnabled(flag));
  }, [flag]);

  return enabled;
}
