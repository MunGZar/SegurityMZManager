# Guía de Facilitación: Adaptación de Scrum a TBD y Despliegue Continuo
**Proyecto:** SegurityMZ Manager  
**Formato:** Hands-on + Discusión Facilitada (75 - 90 min)  
**Audiencia:** Product Owner, Tech Lead, Developers, Scrum Master / Agile Coach  

---

## 🛠️ Materiales y Setup Previo

1. **Pantalla compartida / Proyector:**
   - Repositorio [MunGZar/SegurityMZManager](https://github.com/MunGZar/SegurityMZManager) proyectado en pestaña principal.
   - Pestaña de **GitHub Actions** (`ci-cd.yml`) visible.
   - Pestaña de **GitHub Projects** o tablero de backlog.
2. **Pizarra Digital (Miro / FigJam):**
   - Canvas con los 4 bloques del taller preconfigurados (ver Sección Canvas de Miro abajo).
3. **Timer Visible:**
   - Proyectar un temporizador digital con cuenta regresiva por bloque (respetar timeboxing estricto).
4. **Documento Maestro:**
   - [SCRUM_TBD_PLAYBOOK.md](./SCRUM_TBD_PLAYBOOK.md) abierto en pantalla para captura en vivo.

---

## ⏱️ Agenda Minuto a Minuto

```
[00:00 - 00:05] Apertura y Contexto (5 min)
[00:05 - 00:25] Bloque 1: Diagnóstico del Flujo Actual (20 min)
[00:25 - 00:40] Bloque 2: Roles adaptados a TBD + CD (15 min)
[00:40 - 00:48] Bloque 3.1: Presentación de Artefactos y Ceremonias (8 min)
[00:48 - 01:08] Bloque 3.2: Actividad Práctica "Traduce tu Realidad" (20 min)
[01:08 - 01:25] Bloque 4: Construcción y Firma del Playbook en Vivo (17 min)
[01:25 - 01:30] Cierre y Primer Compromiso para Mañana (5 min)
```

---

## Bloque 1: Diagnóstico del Flujo Actual (20 min)

### Objetivo:
Hacer visible el proceso real por el que viaja una línea de código en **SegurityMZ Manager** desde que se escribe hasta que llega a producción.

### Dinámica:
1. **Dibujar la Columna de Flujo (5 min):**  
   En la pizarra digital, trazar el flujo actual:
   $$\text{Commit Local} \longrightarrow \text{Branch} \longrightarrow \text{Push} \longrightarrow \text{PR} \longrightarrow \text{CI (NestJS + Next.js)} \longrightarrow \text{Code Review} \longrightarrow \text{Merge a main} \longrightarrow \text{Deploy / Docker}$$

2. **Mapeo con Semáforos (8 min):**  
   Cada miembro coloca post-its de colores sobre cada etapa:
   - 🟢 **Verde (Funciona bien):**
     * CI en GitHub Actions es rápido (< 2 min con Turbopack y cache de npm).
     * Compilación y tipado estricto en NestJS y Next.js.
     * Pruebas unitarias integradas con Jest.
   - 🟡 **Amarillo (Fricción / Dudas):**
     * Nombres de ramas informales (ej. `feacture/actualizar-front`).
     * PRs que se acumulan por falta de disponibilidad para revisión.
     * `npm run test -- --passWithNoTests` en backend porque la cobertura de tests aún es baja.
     * Rutas en el `Sidebar` que conducían a páginas no implementadas (ej. `/compras`, `/finanzas`).
   - 🔴 **Rojo (Rompe el flujo o genera miedo):**
     * Miedo a romper `main` si se integra código de módulos incompletos.
     * Commits acumulativos gigantes (ej. "modulos de hasta cotizacion").
     * Despliegue = Liberación (si se sube a `main`, el usuario final ve cambios que aún no están listos).
     * Ausencia de Branch Protection obligatoria en el repositorio.

3. **Preguntas Rápidas de Diagnóstico (7 min):**
   - *¿Cuánto tiempo vive una rama hoy en SegurityMZ Manager?* (Respuesta esperada: días o semanas en vez de horas).
   - *¿Qué tan seguido integramos realmente a main?* (Respuesta esperada: sólo cuando la "funcionalidad completa" está terminada).
   - *¿Nuestro DoD actual garantiza que main es desplegable a producción en cualquier segundo?*

---

## Bloque 2: Roles Adaptados a TBD + CD (15 min)

### Objetivo:
Eliminar la barrera mental de que "TBD es solo de programadores" y comprometer a PO, Devs y Scrum Master.

### Discusión Facilitada (7 min):
- **Product Owner:** Pasa de ser un "inspector de entregas quincenales" a un **gestor de valor continuo**. Debe comprender qué es un *Feature Toggle* y cómo hacer Dark Launching.
- **Developers:** Adoptan la regla de oro: *"El build en main es mi responsabilidad"*. Si el CI falla, no se inicia código nuevo; se arregla de inmediato.
- **Scrum Master / Agile Coach:** Elimina el foco en "cuántos puntos de historia quemamos" y se enfoca en el **tiempo de ciclo del PR** y la **frecuencia de integración**.

### Ejercicio Práctico "Mi Post-it de Mañana" (8 min):
Cada persona escribe en la pizarra:
> *"Una cosa concreta que voy a hacer diferente en mi rol a partir de mañana"*

*Ejemplos para SegurityMZ Manager:*
- **PO:** *"No pediré que un módulo esté 100% terminado para que entre a main; aceptaré que entre oculto tras un Feature Flag."*
- **Dev Backend:** *"Haré migraciones de Prisma en dos fases (expand & contract) para no romper la base de datos en producción."*
- **Dev Frontend:** *"Ocultaré botones o pantallas incompletas usando `isFeatureEnabled()` en lugar de dejar pantallas rotas."*
- **Scrum Master:** *"En la Daily abriré el GitHub Project y el pipeline de Actions en lugar de preguntar '¿qué hiciste ayer?'."*

---

## Bloque 3: Artefactos, Ceremonias y Slicing Práctico (28 min)

### 3.1 Presentación de la Matriz de Transición (8 min)

El facilitador proyecta la siguiente tabla y pregunta fila por fila:  
*«¿Esto se parece a cómo lo hacemos hoy o está lejos?»*

| Artefacto / Ceremonia | Modo Scrum Clásico | Adaptación TBD + Continuous Deployment |
| :--- | :--- | :--- |
| **Product Backlog** | Historias de usuario monolíticas (5 a 13 puntos). | Historias descompuestas en **Slices de < 1 día** + estrategia de Feature Flag + Criterios de Aceptación verificables en producción. |
| **Sprint Backlog** | Paquete cerrado de trabajo para 2 semanas. | Lista de micro-incrementos priorizados que fluyen a `main` todos los días. |
| **Incremento** | Paquete probado que se valida al final del sprint. | **Cada commit que pasa CI en `main` es un incremento potencialmente desplegable.** |
| **Daily Scrum** | Reporte de estatus individual: "¿Qué hice? ¿Qué haré? ¿Bloqueos?". | **Inspección de integración:** "¿Qué integré ayer a `main`? ¿Qué integro hoy? ¿Hay algún PR esperando revisión?". |
| **Sprint Review** | Presentación de software en ambiente local/staging. | **Demo en producción:** Se muestran funcionalidades activando Feature Flags en vivo con datos reales. |
| **Sprint Retrospective** | Dinámica emocional o centrada en estimaciones. | **Inspección de salud técnica y métricas DORA:** Deployment Frequency, Lead Time, builds rotos y eliminación de flags viejos. |

---

### 3.2 Actividad Práctica: "Traduce tu Realidad" (20 min)

Dividir al equipo en grupos de 2 o 3 personas. Cada grupo elige **una de las siguientes 3 historias reales de SegurityMZ Manager** y la slicea para Trunk-Based Development:

#### 📁 Historia A: Módulo de Compras (Abastecimiento de Cámaras a Proveedores)
- **Problema actual:** Es un módulo grande (tabla de compras, selector de proveedor, lista de productos Dahua/Imou, actualización de stock). En Scrum clásico tomaría 2 sprints en una rama aislada.
- **Reto de Slicing TBD:**
  1. *Slice 1:* Modelo Prisma `Compra` + Endpoint POST para registrar compra (Merge a `main`).
  2. *Slice 2:* Ruta `/compras` en frontend oculta tras flag `flags.comprasModule = false`.
  3. *Slice 3:* Formulario básico funcional. El PO lo prueba en producción pasando `?ff_comprasModule=true`.
  4. *Slice 4 (Release):* Se activa el flag en `Sidebar.tsx` para todos los usuarios.

#### 📁 Historia B: Órdenes de Trabajo (Generación técnica desde Cotización)
- **Problema actual:** Si se crea la interfaz a medias, los técnicos verán órdenes sin clientes o botones rotos.
- **Reto de Slicing TBD:**
  1. *Slice 1:* Endpoint que valida si una cotización está `APROBADA` y crea la `OrdenTrabajo` en estado `PENDIENTE`.
  2. *Slice 2:* Botón "Generar OT" en el modal de cotizaciones, renderizado condicionalmente mediante flag.
  3. *Slice 3:* Pantalla `/ordenes-trabajo` con filtro de estados (en desarrollo sin romper navegación principal).

#### 📁 Historia C: Dashboard de Finanzas y Flujo de Caja
- **Problema actual:** Requiere cálculos pesados de ingresos vs egresos; no se puede pausar el despliegue del resto de la app por este reporte.
- **Reto de Slicing TBD:**
  1. *Slice 1:* Endpoint backend de KPIs con caché y query optimizado.
  2. *Slice 2:* Componente de tarjeta en el Dashboard principal envuelto en un ErrorBoundary y Feature Flag.
  3. *Slice 3:* Gráfico de barras de flujo mensual.

**Entregable de cada grupo en Miro:**
1. Nombre del Feature Flag a utilizar.
2. Lista de 3 o 4 Slices de menos de 1 día de trabajo cada uno.
3. Criterio de Aceptación verificable para cada slice en `main`.

---

## Bloque 4: Construcción del Playbook y Acuerdos (17 min)

El facilitador abre [docs/SCRUM_TBD_PLAYBOOK.md](./SCRUM_TBD_PLAYBOOK.md) y ratifica con el equipo:
1. **Los 5 Principios No Negociables.**
2. **Las 5 Reglas de Oro de integración a `main`:**
   - Ramas < 24h.
   - Batch size < 300 líneas.
   - PR Template obligatorio ([.github/pull_request_template.md](../.github/pull_request_template.md)).
   - CI Verde mandatorio antes de merge.
   - Squash & Merge en GitHub.
3. **Definition of Done (DoD) Técnico y de Negocio.**
4. **Votación de Acuerdos:** Pulgar arriba de todo el equipo como pacto de trabajo para el próximo sprint.
