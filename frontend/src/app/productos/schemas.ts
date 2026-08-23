import { z } from 'zod';

export const productoSchema = z.object({
  codigoInterno: z
    .string()
    .min(1, 'El código interno es obligatorio')
    .max(50, 'El código interno no puede exceder 50 caracteres'),
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(150, 'El nombre no puede exceder 150 caracteres'),
  modelo: z.string().optional(),
  descripcion: z.string().optional(),
  imagenUrl: z.string().optional(),
  activo: z.boolean(),

  // Relaciones
  marcaId: z.string().min(1, 'La marca es obligatoria'),
  categoriaId: z.string().min(1, 'La categoría es obligatoria'),
  proveedorId: z.string().min(1, 'El proveedor principal es obligatorio'),

  // Comercial
  precioCompra: z
    .number({ message: 'Debe ser un número válido' })
    .min(0, 'El precio de compra no puede ser negativo'),
  margenPorcentaje: z
    .number({ message: 'Debe ser un número válido' })
    .min(0, 'El porcentaje de margen no puede ser negativo'),
  garantiaMeses: z
    .number({ message: 'Debe ser un número válido' })
    .int('Debe ser un entero')
    .min(0, 'La garantía no puede ser negativa'),

  // Ficha técnica (opcionales)
  resolucion: z.string().optional(),
  tecnologia: z.string().optional(),
  tipo: z.string().optional(),
  lente: z.string().optional(),
  audio: z.string().optional(),
  visionNocturna: z.string().optional(),
  alimentacion: z.string().optional(),
  proteccionIP: z.string().optional(),
});

export type ProductoFormValues = z.infer<typeof productoSchema>;
