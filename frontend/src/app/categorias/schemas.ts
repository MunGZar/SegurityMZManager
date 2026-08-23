import { z } from 'zod';

export const categoriaSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  descripcion: z.string().optional(),
  activo: z.boolean(),
});

export type CategoriaFormValues = z.infer<typeof categoriaSchema>;
