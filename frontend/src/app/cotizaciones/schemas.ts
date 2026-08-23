import { z } from 'zod';

export const cotizacionDetalleSchema = z.object({
  productoId: z.string().optional(),
  tipo: z.enum(['PRODUCTO', 'SERVICIO']),
  nombre: z
    .string()
    .min(1, 'El nombre o concepto es obligatorio')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  descripcion: z.string().optional(),
  cantidad: z
    .number({ message: 'Debe ser un número válido' })
    .int('La cantidad debe ser entera')
    .min(1, 'La cantidad debe ser al menos 1'),
  precioUnit: z
    .number({ message: 'Debe ser un número válido' })
    .min(0, 'El precio no puede ser negativo'),
});

export const cotizacionSchema = z.object({
  clienteId: z.string().min(1, 'Debe seleccionar un cliente'),
  observaciones: z.string().optional(),
  descuento: z
    .number({ message: 'Debe ser un número válido' })
    .min(0, 'El descuento no puede ser negativo'),
  estado: z.enum(['BORRADOR', 'ENVIADA', 'APROBADA', 'RECHAZADA', 'VENCIDA']),
  detalles: z
    .array(cotizacionDetalleSchema)
    .min(1, 'La cotización debe incluir al menos un producto o servicio'),
});

export type CotizacionFormValues = z.infer<typeof cotizacionSchema>;
export type CotizacionDetalleFormValues = z.infer<typeof cotizacionDetalleSchema>;
