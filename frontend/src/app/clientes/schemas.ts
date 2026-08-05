import { z } from 'zod';

export const clienteFormSchema = z.object({
  nombre: z.string().min(1, 'El nombre completo es obligatorio').trim(),
  identificacion: z.string().trim().optional().or(z.literal('')),
  telefono: z.string().trim().optional().or(z.literal('')),
  email: z.string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'El correo electrónico no es válido',
    }),
  direccion: z.string().trim().optional().or(z.literal('')),
  notas: z.string().trim().optional().or(z.literal('')),
  status: z.enum(['PROSPECTO', 'ACTIVO', 'INACTIVO'], {
    message: 'El estado es obligatorio',
  }),
});

export type ClienteFormData = z.infer<typeof clienteFormSchema>;
