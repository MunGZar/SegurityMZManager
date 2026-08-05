import { z } from 'zod';

export const proveedorFormSchema = z.object({
  nombre: z.string().min(1, 'El nombre del proveedor es obligatorio').trim(),
  contacto: z.string().trim().optional().or(z.literal('')),
  telefono: z.string().trim().optional().or(z.literal('')),
  whatsapp: z.string().trim().optional().or(z.literal('')),
  correo: z.string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'El correo electrónico no es válido',
    }),
  ciudad: z.string().trim().optional().or(z.literal('')),
  direccion: z.string().trim().optional().or(z.literal('')),
  observaciones: z.string().trim().optional().or(z.literal('')),
  activo: z.boolean(),
});

export type ProveedorFormData = z.infer<typeof proveedorFormSchema>;
