import { z } from 'zod';

export const createOrdenSchema = z.object({
  cotizacionId: z.string().min(1, 'Debe seleccionar una cotización aprobada'),
  fechaProgramada: z.string().optional(),
  horaProgramada: z.string().optional(),
  prioridad: z.enum(['BAJA', 'MEDIA', 'ALTA', 'URGENTE']),
  direccion: z.string().optional(),
  observaciones: z.string().optional(),
});

export const updateOrdenSchema = z.object({
  fechaProgramada: z.string().optional(),
  horaProgramada: z.string().optional(),
  prioridad: z.enum(['BAJA', 'MEDIA', 'ALTA', 'URGENTE']),
  estado: z.enum(['PENDIENTE', 'PROGRAMADA', 'EN_PROCESO', 'FINALIZADA', 'CANCELADA']),
  direccion: z.string().optional(),
  observaciones: z.string().optional(),
  observacionesTecnicas: z.string().optional(),
  serialesEquipos: z.string().optional(),
  usuarioDvr: z.string().optional(),
  passwordDvrEncrypted: z.string().optional(),
  direccionIp: z.string().optional(),
  garantiaMeses: z.number().min(0).optional(),
  fechaEntrega: z.string().optional(),
});

export const addEvidenciaSchema = z.object({
  tipo: z.enum(['ANTES', 'DESPUES', 'ACTA_ENTREGA', 'OTRO']),
  url: z.string().min(1, 'La URL o ruta de la imagen es requerida'),
  descripcion: z.string().optional(),
});

export type CreateOrdenValues = z.infer<typeof createOrdenSchema>;
export type UpdateOrdenValues = z.infer<typeof updateOrdenSchema>;
export type AddEvidenciaValues = z.infer<typeof addEvidenciaSchema>;
