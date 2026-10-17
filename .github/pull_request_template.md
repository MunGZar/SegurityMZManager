## Descripción del Cambio
<!-- Resume en 1 o 2 oraciones qué resuelve este PR -->

## Tipo de Cambio
- [ ] 🚀 Nuevo Slice (Detrás de Feature Toggle)
- [ ] 🧪 Habilitación de Feature Flag (Release)
- [ ] 🐛 Corrección rápida de Bug (Fix-forward)
- [ ] 🧹 Refactor / Limpieza de Feature Toggle obsoleto
- [ ] 📦 Tarea de CI/CD o Infraestructura

## Checklist de Trunk-Based Development (TBD)
- [ ] **Batch Size:** ¿Este PR contiene menos de 300 líneas de cambio y puede revisarse en < 15 min?
- [ ] **Short-Lived Branch:** ¿Esta rama tiene menos de 24 horas de haber sido creada?
- [ ] **Desacoplamiento Deploy ≠ Release:** Si la funcionalidad está incompleta, ¿está protegida tras un Feature Flag o no afecta rutas públicas?
- [ ] **Base de Datos (Prisma):** Si incluye migración, ¿es compatible hacia atrás con la versión previa de la app?
- [ ] **CI Verde:** ¿NestJS (`npm run test`, `npm run build`) y Next.js compilaron con éxito localmente?

## Criterios de Aceptación (Slice)
<!-- Lista los criterios específicos que el PO o Revisor puede comprobar -->
- [ ] Criterio 1
- [ ] Criterio 2

## Rollback / Contingencia
<!-- ¿Cómo se apaga o mitiga si hay algún problema en main? (Ej: apagar toggle X, revertir commit) -->
