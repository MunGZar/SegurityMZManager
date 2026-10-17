# Scrum + Trunk-Based Development (TBD) Playbook
**Proyecto:** SegurityMZ Manager  
**Versión:** 1.0.0 — Octubre 2026  
**Propósito:** Definir los acuerdos de trabajo, reglas de integración continua, responsabilidades por rol y adaptación de ceremonias Scrum para operar con **main siempre desplegable y en producción**.

---

## 1. Principios Acordados (No Negociables)

1. **`main` es Sagrada y Siempre Releasable:** Ningún commit llega a `main` si rompe compilación, pruebas o compatibilidad. Si el pipeline falla, arreglarlo es la máxima prioridad del equipo (regla del *Andon Cord*).
2. **Batch Size Pequeño (< 1 día de vida):** Las ramas existen máximo 24 horas. Los cambios se dividen verticalmente en incrementos de 100 a 300 líneas de código.
3. **Desacoplar Despliegue de Liberación (Deploy ≠ Release):** El código se despliega a producción continuamente; las funcionalidades incompletas o en validación se ocultan tras *Feature Toggles* o *Branch by Abstraction*.
4. **Responsabilidad Colectiva del Pipeline:** No existe "en mi máquina funciona". El desarrollador es dueño de su cambio hasta que el pipeline de GitHub Actions finaliza en verde.
5. **Cero Tolerancia a Deuda de Integración:** Evitar ramas de larga duración (`long-lived feature branches`). La sincronización diaria con `main` previene "Merge Hell".

---

## 2. Roles Adaptados a TBD + Continuous Deployment

| Rol | Responsabilidad Tradicional | Nueva Responsabilidad en SegurityMZ Manager | Compromiso Concreto (Post-it) |
| :--- | :--- | :--- | :--- |
| **Product Owner** | Define historias completas por sprint; valida en la Review cada 2 semanas. | • Slicing vertical por valor y riesgo.<br>• Gestiona el ciclo de vida de los *Feature Toggles* (creación, activación progresiva y retiro).<br>• Define Criterios de Aceptación (AC) que puedan probarse en producción tras Dark Launch. | *"Aceptaré historias más pequeñas e independientes y decidiré el encendido de flags sin esperar al final del sprint."* |
| **Developers / Tech Lead** | Desarrollan en ramas privadas durante días; resuelven conflictos al final. | • Integración diaria a `main` (< 24h).<br>• Ownership absoluto del CI/CD de NestJS y Next.js.<br>• Aplicar *Branch by Abstraction* y migraciones de base de datos no bloqueantes en Prisma.<br>• Diseñar y limpiar Feature Toggles. | *"No mantendré ramas abiertas más de 1 día y revisaré PRs de mis compañeros en menos de 2 horas."* |
| **Scrum Master / Agile Coach** | Mide velocidad, gestiona tiempo de ceremonias. | • Vela por la salud del flujo y disciplina de integración diaria.<br>• Monitorea métricas DORA (Lead Time, Deployment Frequency, Failure Rate).<br>• Remueve fricciones en CI/CD y protege tiempo técnico para tooling y automatización. | *"Facilitaré la Daily enfocada en 'qué integramos hoy' y ayudaré a desbloquear PRs estancados."* |

---

## 3. Reglas de Oro de Integración a `main`

1. **Ramas Cortas (Short-Lived Branches):**
   - Nombres normalizados: `feat/<slice-name>`, `fix/<issue-name>`.
   - Vida máxima: **24 horas**. Si una rama requiere más de un día, no fue suficientemente sliceada.
2. **Estrategia de Merge:**
   - **Squash & Merge** o **Rebase & Merge**. Prohibidos los Merge Commits sucios que oscurezcan el historial lineal de `main`.
3. **Branch Protection Rules (En GitHub):**
   - Requiere al menos 1 aprobación (Peer Review) antes del merge.
   - Requiere comprobaciones de estado obligatorias (*Status Checks*):
     - `Backend (Test & Build)`
     - `Frontend (Build & Types)`
   - Requiere ramas actualizadas con `main` antes de fusionar (*Require branches to be up to date before merging*).
4. **Desarrollo Oculto (Dark Launching & Feature Flags):**
   - Si una vista o endpoint está incompleto, debe ingresar a `main` apagado (`flags.module_ordenes_trabajo = false`).
   - Prohibido dejar botones o rutas que arrojen errores 404 o 500 en producción.
5. **Evolución de Base de Datos Compatible Hacia Atrás (Expand & Contract):**
   - Todo cambio en `schema.prisma` debe ser compatible con la versión anterior de la app.
   - Paso 1: Agregar campo/tabla opcional (`Expand`). Desplegar.
   - Paso 2: Migrar datos y lógica de la app. Desplegar.
   - Paso 3: Eliminar campos o restricciones obsoletas (`Contract`).

---

## 4. Definition of Done (DoD) Preliminar

Una tarea o slice se considera **Done** cuando cumple:

### Checklist Técnico:
- [ ] Compila sin errores en NestJS (`npm run build`) y Next.js Turbopack (`npm run build`).
- [ ] Pasa linters (`eslint`) y formato (`prettier`) sin advertencias bloqueantes.
- [ ] Pruebas unitarias/integración Jest ejecutadas y aprobadas en el CI de GitHub Actions.
- [ ] Migraciones de Prisma probadas en entorno local sin romper datos existentes.
- [ ] Código fusionado a `main` mediante PR con checklist de TBD completado.
- [ ] Si la funcionalidad no está terminada para el cliente final, está protegida por un Feature Flag o no está expuesta en la navegación pública.

### Checklist de Negocio (PO):
- [ ] Criterios de Aceptación del slice verificados (en ambiente local o producción con flag activado).
- [ ] No genera regresiones en flujos críticos existentes (Cotizaciones, Clientes, Catálogo).
- [ ] El Product Owner conoce el estado del flag y puede habilitarlo a usuarios piloto cuando lo determine.

---

## 5. Adaptación de Ceremonias Scrum a TBD + CD

### 5.1 Sprint Planning
- **Enfoque Clásico:** Estimar historias grandes de 5-13 puntos para entregar un incremento al final de dos semanas.
- **Enfoque TBD + CD:** 
  - Se slicean las historias en porciones de valor que tomen entre **0.5 y 1 día**.
  - Se define la estrategia de Feature Flag de cada historia antes de escribir código.
  - El objetivo del sprint es un flujo continuo de valor y mantener la estabilidad de `main`.

### 5.2 Daily Scrum (15 min)
Se reemplazan las preguntas clásicas ("¿Qué hice ayer? ¿Qué haré hoy?") por preguntas de **flujo e integración continua**:
1. ¿Qué código lograste integrar a `main` en las últimas 24 horas?
2. ¿Qué vas a integrar a `main` el día de hoy y qué necesitas para que sea seguro?
3. ¿Hay algún PR abierto esperando revisión o algún build roto bloqueando el flujo?

### 5.3 Sprint Review (Demo)
- **Enfoque Clásico:** Mostrar en un entorno staging lo construido durante el sprint para recibir feedback.
- **Enfoque TBD + CD:**
  - Gran parte de los incrementos ya están en producción o activados para usuarios beta.
  - La review se centra en:
    - Demostrar el valor en vivo activando/desactivando Feature Flags en tiempo real.
    - Analizar métricas reales de uso y telemetría de producción.
    - Decidir la liberación general (encendido definitivo) o el retiro de código viejo.

### 5.4 Sprint Retrospective
- **Enfoque Clásico:** Discusión sobre relaciones interpersonales y estimaciones de velocity.
- **Enfoque TBD + CD:**
  - Análisis de las **Métricas DORA**:
    - **Deployment Frequency:** ¿Cuántas veces desplegamos a `main` esta semana?
    - **Lead Time for Changes:** ¿Cuánto tiempo pasó desde el primer commit hasta `main`?
    - **Change Failure Rate:** ¿Cuántos commits en `main` rompieron el build o causaron incidentes?
    - **Time to Restore Service (MTTR):** ¿Qué tan rápido revertimos o parchamos con fix-forward?
  - Retiro de deuda técnica y Feature Toggles obsoletos (*Flag Hygiene*).

---

## 6. Historias Sliceadas del Proyecto (Ejemplos Reales)

### Historia 1: Módulo de Compras / Abastecimiento (Cámaras Dahua/Imou)
- **Slice 1 (Backend & DB):** Modelo `Compra` y `CompraDetalle` en Prisma + servicio básico de guardado (Merge a `main`).
- **Slice 2 (Dark UI):** Pantalla `/compras` oculta en el `Sidebar` mediante flag `flags.enable_compras = false`. Accesible solo para desarrollo/admin vía parámetro.
- **Slice 3 (Integración):** Formulario de registro de compra que actualiza automáticamente el stock o precio de compra de los productos.
- **Slice 4 (Release):** PO activa el flag en el `Sidebar` para todos los usuarios.

### Historia 2: Órdenes de Trabajo desde Cotizaciones Aprobadas
- **Slice 1 (Backend):** Endpoint `POST /cotizaciones/:id/generar-orden-trabajo`.
- **Slice 2 (Frontend Toggle):** En el modal de detalle de cotización, botón "Generar OT" visible solo si el Feature Flag `flags.enable_ordenes_trabajo` está activo y la cotización está en estado `APROBADA`.
- **Slice 3 (Release & Feedback):** Visualización en `/ordenes-trabajo` con técnico asignado.

### Historia 3: Dashboard de Métricas Financieras
- **Slice 1 (API Data):** Endpoint de agregación `GET /finanzas/kpis` (ingresos por cotizaciones aprobadas vs gastos de compras).
- **Slice 2 (Widget en Dashboard):** Tarjeta de métricas en la página principal protegida por toggle; si falla o está deshabilitada, el dashboard carga normalmente sin afectar a Clientes o Productos.

---

## 7. Decisiones Pendientes y Próximos Pasos

1. **Gestión de Feature Flags:**
   - Corto Plazo: Utilidad in-code en frontend/backend (Variables de entorno o `lib/feature-flags.ts`).
   - Mediano Plazo: Evaluar ConfigCat o Unleash para encendido dinámico sin re-desplegar.
2. **Branch Protection:**
   - Activar formalmente en GitHub (`MunGZar/SegurityMZManager`) la protección sobre `main`.
3. **Métricas DORA:**
   - Configurar un dashboard de métricas en GitHub Actions para rastrear frecuencia de despliegue y duración de PRs.
