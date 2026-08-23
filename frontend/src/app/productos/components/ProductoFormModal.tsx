import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema, ProductoFormValues } from '../schemas';
import { Producto } from '@/services/productos.service';
import { Marca } from '@/services/marcas.service';
import { Categoria } from '@/services/categorias.service';
import { Proveedor } from '@/services/proveedores.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Package, DollarSign, Cpu, FileText } from 'lucide-react';

interface ProductoFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductoFormValues) => Promise<boolean>;
  initialData?: Producto | null;
  marcas: Marca[];
  categorias: Categoria[];
  proveedores: Proveedor[];
}

export function ProductoFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  marcas,
  categorias,
  proveedores,
}: ProductoFormModalProps) {
  const isEditing = Boolean(initialData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'comercial' | 'tecnica'>('general');

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductoFormValues>({
    resolver: zodResolver(productoSchema) as any,
    defaultValues: {
      codigoInterno: '',
      nombre: '',
      modelo: '',
      descripcion: '',
      imagenUrl: '',
      activo: true,
      marcaId: '',
      categoriaId: '',
      proveedorId: '',
      precioCompra: 0,
      margenPorcentaje: 35,
      garantiaMeses: 12,
      resolucion: '',
      tecnologia: '',
      tipo: '',
      lente: '',
      audio: '',
      visionNocturna: '',
      alimentacion: '',
      proteccionIP: '',
    },
  });

  const watchPrecioCompra = useWatch({ control, name: 'precioCompra' }) || 0;
  const watchMargenPorcentaje = useWatch({ control, name: 'margenPorcentaje' }) || 0;

  // Dynamic live calculation of Precio de Venta
  const calculatedPrecioVenta = Number(
    (Number(watchPrecioCompra) + Number(watchPrecioCompra) * (Number(watchMargenPorcentaje) / 100)).toFixed(2)
  );

  useEffect(() => {
    if (open) {
      setActiveTab('general');
      if (initialData) {
        reset({
          codigoInterno: initialData.codigoInterno,
          nombre: initialData.nombre,
          modelo: initialData.modelo || '',
          descripcion: initialData.descripcion || '',
          imagenUrl: initialData.imagenUrl || '',
          activo: initialData.activo,
          marcaId: initialData.marcaId,
          categoriaId: initialData.categoriaId,
          proveedorId: initialData.proveedorId,
          precioCompra: Number(initialData.precioCompra),
          margenPorcentaje: Number(initialData.margenPorcentaje),
          garantiaMeses: initialData.garantiaMeses,
          resolucion: initialData.resolucion || '',
          tecnologia: initialData.tecnologia || '',
          tipo: initialData.tipo || '',
          lente: initialData.lente || '',
          audio: initialData.audio || '',
          visionNocturna: initialData.visionNocturna || '',
          alimentacion: initialData.alimentacion || '',
          proteccionIP: initialData.proteccionIP || '',
        });
      } else {
        reset({
          codigoInterno: '',
          nombre: '',
          modelo: '',
          descripcion: '',
          imagenUrl: '',
          activo: true,
          marcaId: marcas[0]?.id || '',
          categoriaId: categorias[0]?.id || '',
          proveedorId: proveedores[0]?.id || '',
          precioCompra: 0,
          margenPorcentaje: 35,
          garantiaMeses: 12,
          resolucion: '',
          tecnologia: '',
          tipo: '',
          lente: '',
          audio: '',
          visionNocturna: '',
          alimentacion: '',
          proteccionIP: '',
        });
      }
    }
  }, [open, initialData, reset, marcas, categorias, proveedores]);

  const onFormSubmit = async (values: ProductoFormValues) => {
    setLoading(true);
    const success = await onSubmit(values);
    setLoading(false);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] border-zinc-800 bg-zinc-900 text-zinc-100 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-indigo-500" />
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 my-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'general'
                ? 'border-indigo-500 text-indigo-400 bg-zinc-800/60'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="h-4 w-4" />
            General & Relaciones
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('comercial')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'comercial'
                ? 'border-indigo-500 text-indigo-400 bg-zinc-800/60'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Precios & Márgenes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tecnica')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'tecnica'
                ? 'border-indigo-500 text-indigo-400 bg-zinc-800/60'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu className="h-4 w-4" />
            Ficha Técnica
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-2">
          {/* TAB 1: GENERAL & RELACIONES */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Código Interno / SKU <span className="text-red-400">*</span>
                  </label>
                  <Input
                    {...register('codigoInterno')}
                    placeholder="Ej: CAM-IP-001"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                  {errors.codigoInterno && (
                    <p className="text-xs text-red-400 mt-1">{errors.codigoInterno.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Modelo del Fabricante
                  </label>
                  <Input
                    {...register('modelo')}
                    placeholder="Ej: DH-IPC-HDW1431S"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Nombre del Producto <span className="text-red-400">*</span>
                </label>
                <Input
                  {...register('nombre')}
                  placeholder="Ej: Cámara Domo IP 4MP Full Color"
                  className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                />
                {errors.nombre && (
                  <p className="text-xs text-red-400 mt-1">{errors.nombre.message}</p>
                )}
              </div>

              {/* Relaciones: Marca, Categoría, Proveedor */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Marca <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('marcaId')}
                    className="w-full h-9 rounded-md bg-zinc-950/80 border border-zinc-800 text-sm text-white px-3 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar Marca...</option>
                    {marcas.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.marcaId && (
                    <p className="text-xs text-red-400 mt-1">{errors.marcaId.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Categoría <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('categoriaId')}
                    className="w-full h-9 rounded-md bg-zinc-950/80 border border-zinc-800 text-sm text-white px-3 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar Categoría...</option>
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.categoriaId && (
                    <p className="text-xs text-red-400 mt-1">{errors.categoriaId.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Proveedor Principal <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('proveedorId')}
                    className="w-full h-9 rounded-md bg-zinc-950/80 border border-zinc-800 text-sm text-white px-3 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar Proveedor...</option>
                    {proveedores.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.proveedorId && (
                    <p className="text-xs text-red-400 mt-1">{errors.proveedorId.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">URL de Imagen Principal</label>
                <Input
                  {...register('imagenUrl')}
                  placeholder="https://ejemplo.com/imagen-camara.jpg"
                  className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Descripción Comercial</label>
                <Textarea
                  {...register('descripcion')}
                  placeholder="Descripción opcional sobre especificaciones comerciales..."
                  rows={2}
                  className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activo"
                  {...register('activo')}
                  className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="activo" className="text-xs text-zinc-300 cursor-pointer font-medium">
                  Producto activo para catálogo y cotizaciones
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: COMERCIAL & MÁRGENES */}
          {activeTab === 'comercial' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Precio de Compra (Costo) <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('precioCompra', { valueAsNumber: true })}
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500 font-mono"
                  />
                  {errors.precioCompra && (
                    <p className="text-xs text-red-400 mt-1">{errors.precioCompra.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Margen de Ganancia (%) <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    {...register('margenPorcentaje', { valueAsNumber: true })}
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500 font-mono"
                  />
                  {errors.margenPorcentaje && (
                    <p className="text-xs text-red-400 mt-1">{errors.margenPorcentaje.message}</p>
                  )}
                </div>
              </div>

              {/* Preview Cálculo Automático de Precio Venta */}
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-indigo-300 font-medium">Precio de Venta Calculado (Automático)</p>
                  <p className="text-xs text-zinc-400">Fórmula: Costo + (Costo × Margen %)</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-400 font-mono">
                    ${calculatedPrecioVenta.toLocaleString('es-CL', { minimumFractionDigits: 0 })}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Garantía en Meses</label>
                <Input
                  type="number"
                  min="0"
                  {...register('garantiaMeses', { valueAsNumber: true })}
                  className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: FICHA TÉCNICA */}
          {activeTab === 'tecnica' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Resolución</label>
                  <Input
                    {...register('resolucion')}
                    placeholder="Ej: 4MP (2560 × 1440) / 1080p"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Tecnología</label>
                  <Input
                    {...register('tecnologia')}
                    placeholder="Ej: IP / HDCVI / Análoga"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Tipo de Gabinete</label>
                  <Input
                    {...register('tipo')}
                    placeholder="Ej: Domo / Bala / PTZ / NVR"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Lente / Apertura</label>
                  <Input
                    {...register('lente')}
                    placeholder="Ej: 2.8mm fijo / Varifocal 2.7-13.5mm"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Audio</label>
                  <Input
                    {...register('audio')}
                    placeholder="Ej: Micrófono Integrado / 2 vías"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Visión Nocturna</label>
                  <Input
                    {...register('visionNocturna')}
                    placeholder="Ej: Smart IR 30m / Full Color"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Alimentación Eléctrica</label>
                  <Input
                    {...register('alimentacion')}
                    placeholder="Ej: 12V DC / PoE 802.3af"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Protección IP / Resistencia</label>
                  <Input
                    {...register('proteccionIP')}
                    placeholder="Ej: IP67 / IK10"
                    className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 border-t border-zinc-800 gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
