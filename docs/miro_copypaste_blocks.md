# Bloques de Copiar y Pegar para Miro
Copia el bloque de texto que desees, ve a tu tablero de Miro ([https://miro.com/app/board/uXjVEYwAsIM=/](https://miro.com/app/board/uXjVEYwAsIM=/)), presiona `Ctrl + V` y selecciona **"Paste as sticky notes"** (Pegar como notas adhesivas). Miro las creará y organizará automáticamente.

---

### Bloque 1: Diagnóstico del Flujo Actual (Value Stream)

#### 🟢 Post-its Verdes (Lo que funciona bien):
Pipeline CI Rápido: Compilación paralela NestJS + Next.js Turbopack en < 2 min
Generación Automática Prisma: Prisma Client generado en cada build sin base de datos activa

#### 🟡 Post-its Amarillos (Lo que genera fricción):
Ramas de Larga Duración: Ramas como feacture/actualizar-front duraron días y desincronizan main
Baja Cobertura de Tests: npm run test usa --passWithNoTests; no detectamos regresiones en lógica comercial
Rutas Rotas en Sidebar: Enlaces a /compras y /finanzas mostraban 404 porque no estaban terminadas

#### 🔴 Post-its Rojos (Rompe el flujo / Genera miedo):
Deploy = Release: Si integramos a main, el cliente ve los botones sin terminar. Miedo a romper producción
Commits Acumulativos Gigantes: Commits como "modulos de hasta cotizacion" (12 archivos) imposibles de revisar en PR
Falta Branch Protection: Cualquiera puede hacer push directo a main si no configuramos reglas de protección

---

### Bloque 2: Roles Adaptados a TBD + Despliegue Continuo

#### 🟣 Product Owner (Jose):
"Aceptaré historias de 1 solo día con código que entre a main oculto tras un Feature Toggle, sin esperar 2 semanas."

#### 🔵 Developers / Tech Lead (MunGZar):
"Nunca dejaré una rama viva más de 24 horas. Integraré con Squash & Merge y revisaré PRs de compañeros en < 2h."

#### 🟠 Scrum Master:
"En la Daily preguntaré '¿qué integramos hoy a main?' y protegeré tiempo técnico para automatizar tests en CI."

#### 🚨 Regla Andon Cord:
Si el build en main se rompe en GitHub Actions, se detiene todo desarrollo nuevo hasta restaurarlo. Nada entra a main si el pipeline está en rojo.

---

### Bloque 3: Slicing de 3 Historias Reales

#### 📦 Historia A: Módulo Compras (Cámaras Dahua/Imou) - Flag: flags.comprasModule
Slice 1 (1d): Backend POST /compras con validación DTO y tests Jest
Slice 2 (0.5d): Ruta Next.js /compras oculta en Sidebar mediante Feature Flag
Slice 3 (1d): Formulario de registro de compra y cálculo de precios de costo
Slice 4 (Release): Activación general del flag por el PO en producción

#### 🔧 Historia B: Órdenes de Trabajo desde Cotización - Flag: flags.ordenesTrabajoV2
Slice 1 (0.5d): Endpoint POST /cotizaciones/:id/generar-ot con validación de estado
Slice 2 (0.5d): Botón 'Generar OT' en modal visible solo si cotización = APROBADA y flag ON
Slice 3 (1d): Tabla técnica de instalaciones y asignación de técnicos
Slice 4 (Release): Pruebas en campo con técnicos antes de liberación masiva

#### 💰 Historia C: Dashboard de Finanzas y Flujo - Flag: flags.finanzasModule
Slice 1 (0.5d): Query agregado y endpoint GET /finanzas/kpis
Slice 2 (0.5d): Widget en Dashboard envuelto en ErrorBoundary y Feature Flag
Slice 3 (0.5d): Gráfico comparativo de ingresos vs gastos
Slice 4 (Release): Encendido por rol para el Administrador

---

### Bloque 4: Scrum + TBD Playbook (Reglas de Oro y DoD)

#### 🛡️ Reglas de Oro de main:
Vida de ramas: Máximo 24 horas (Short-lived branches). Prohibidas ramas épicas
Batch Size: Entre 100 y 300 líneas de código por PR
Merge Strategy: Squash & Merge en GitHub
Desacoplamiento: Deploy continuo; Release con Feature Flag
Database: Migraciones Prisma retrocompatibles (Expand & Contract)

#### 📋 Definition of Done (DoD):
Compila sin fallos: NestJS y Next.js Turbopack
Tests de Jest pasando en GitHub Actions
PR checklist completado (.github/pull_request_template.md)
Si está incompleto, protegido tras Feature Flag
Verificado en producción con flag activo por el PO
