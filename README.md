# SegurityMZ Manager

[![CI/CD Pipeline](https://github.com/MunGZar/SegurityMZManager/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/MunGZar/SegurityMZManager/actions/workflows/ci-cd.yml)

Sistema privado y personal para la administración de venta e instalación de cámaras de seguridad.

---

## Estructura del Proyecto

* **`backend/`**: API REST construida con NestJS y Prisma ORM.
* **`frontend/`**: Interfaz web construida con Next.js (App Router), Tailwind CSS y shadcn/ui.

---

## Requisitos Previos

* Node.js (versión 18 o superior)
* MySQL 8 corriendo localmente (por ejemplo, en el puerto 3306)

---

## Configuración y Arranque

### 1. Base de Datos (MySQL)

Asegúrate de tener un servidor MySQL activo y crea la base de datos `seguritymz_db`.

Configura las credenciales en `backend/.env`:
```env
DATABASE_URL="mysql://username:password@localhost:3306/seguritymz_db"
PORT=3001
```

Aplica el esquema y genera el cliente de Prisma:
```bash
cd backend
npx prisma migrate dev --name init
```

### 2. Ejecutar el Backend (NestJS)

Instala las dependencias y arranca el servidor de desarrollo:
```bash
cd backend
npm run start:dev
```
La API estará disponible en `http://localhost:3001/api`.

### 3. Ejecutar el Frontend (Next.js)

Instala las dependencias y arranca el servidor de desarrollo de Next.js:
```bash
cd frontend
npm run dev
```
La aplicación web estará disponible en `http://localhost:3000`.

---

## Módulos del Sistema

1. **Dashboard**: Métricas clave (ventas, instalaciones, finanzas).
2. **Clientes** (Completado): Gestión de cartera de clientes.
3. **Proveedores**: Gestión de proveedores.
4. **Marcas & Categorías**: Clasificación del catálogo.
5. **Productos**: Catálogo e inventarios.
6. **Cotizaciones**: Propuestas comerciales para clientes.
7. **Compras**: Adquisición de inventario con proveedores.
8. **Instalaciones**: Órdenes de servicio y estados técnicos.
9. **Finanzas**: Control de flujo de caja (ingresos/egresos).

---

## Integración y Despliegue Continuo (CI/CD)

El proyecto cuenta con una canalización automatizada mediante **GitHub Actions** (`.github/workflows/ci-cd.yml`) diseñada para ser rápida, ligera y fiable:

* **Disparadores**:
  * Se ejecuta automáticamente en cada `push` o `pull request` hacia la rama `main`.
  * También se puede lanzar manualmente desde la pestaña **Actions** en GitHub (`workflow_dispatch`).
* **Backend Job**:
  * Configuración de Node.js 20 con caché de npm.
  * Generación del cliente de Prisma (`npx prisma generate`).
  * Ejecución de pruebas unitarias Jest (`npm run test`).
  * Compilación de la aplicación NestJS (`npm run build`).
* **Frontend Job**:
  * Configuración de Node.js 20 con caché de npm y caché incremental de Next.js (`.next/cache`).
  * Verificación de tipado y compilación de producción con Turbopack (`npm run build`).
* **Variables configurables (opcionales)**:
  * En GitHub Settings > Secrets and variables > Actions > Variables, puedes definir `NEXT_PUBLIC_API_URL` si deseas que la compilación apunte a un dominio específico en producción.