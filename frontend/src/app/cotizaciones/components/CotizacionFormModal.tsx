import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Package, Wrench, Search, FileText, GripVertical } from 'lucide-react';
import { Cliente } from '@/services/clientes.service';
import { Producto } from '@/services/productos.service';
import { Cotizacion, CotizacionDetalleTipo } from '@/services/cotizaciones.service';
import { ProductoSelectorDialog } from './ProductoSelectorDialog';

interface FormItem {
  productoId?: string;
  tipo: CotizacionDetalleTipo;
  nombre: string;
  descripcion?: string;
  cantidad: number;
  precioUnit: number;
}

interface CotizacionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: any) => Promise<boolean>;
  initialData?: Cotizacion | null;
  clientes: Cliente[];
  productos: Producto[];
}

export function CotizacionFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  clientes,
  productos,
}: CotizacionFormModalProps) {
  const [clienteId, setClienteId] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [descuento, setDescuento] = useState<number>(0);
  const [estado, setEstado] = useState<'BORRADOR' | 'ENVIADA' | 'APROBADA' | 'RECHAZADA' | 'VENCIDA'>('BORRADOR');
  const [items, setItems] = useState<FormItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Diálogo para buscar productos en catálogo
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setClienteId(initialData.clienteId || '');
      setObservaciones(initialData.observaciones || '');
      setDescuento(Number(initialData.descuento) || 0);
      setEstado(initialData.estado);
      setItems(
        initialData.detalles.map((d) => ({
          productoId: d.productoId || undefined,
          tipo: d.tipo,
          nombre: d.nombre,
          descripcion: d.descripcion || undefined,
          cantidad: d.cantidad,
          precioUnit: Number(d.precioUnit),
        }))
      );
    } else {
      setClienteId('');
      setObservaciones('');
      setDescuento(0);
      setEstado('BORRADOR');
      setItems([]);
    }
    setErrors({});
  }, [initialData, open]);

  // Cálculos en tiempo real
  const subtotal = items.reduce((acc, curr) => acc + curr.cantidad * curr.precioUnit, 0);
  const total = Math.max(0, subtotal - descuento);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSelectProductoFromCatalog = (prod: Producto) => {
    setItems((prev) => [
      ...prev,
      {
        productoId: prod.id,
        tipo: 'PRODUCTO',
        nombre: prod.nombre,
        descripcion: prod.descripcion || `Modelo: ${prod.modelo || 'N/A'} - Marca: ${prod.marca?.nombre || 'N/A'}`,
        cantidad: 1,
        precioUnit: Number(prod.precioVenta),
      },
    ]);
  };

  const handleAddManualService = () => {
    setItems((prev) => [
      ...prev,
      {
        tipo: 'SERVICIO',
        nombre: '',
        descripcion: '',
        cantidad: 1,
        precioUnit: 0,
      },
    ]);
  };

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    setItems((prev) => {
      const updated = [...prev];
      const [movedItem] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, movedItem);
      return updated;
    });

    setDraggedIndex(null);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof FormItem, value: any) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!clienteId) newErrors.clienteId = 'Debe seleccionar un cliente';
    if (items.length === 0) newErrors.items = 'Debe agregar al menos un producto o servicio';

    items.forEach((item, index) => {
      if (!item.nombre.trim()) {
        newErrors[`item_${index}_nombre`] = 'Obligatorio';
      }
      if (item.cantidad <= 0) {
        newErrors[`item_${index}_cantidad`] = 'Min 1';
      }
      if (item.precioUnit < 0) {
        newErrors[`item_${index}_precio`] = 'Inválido';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    const payload = {
      clienteId,
      observaciones,
      descuento: Number(descuento) || 0,
      estado,
      detalles: items.map((item, idx) => ({
        ...item,
        orden: idx,
      })),
    };

    const success = await onSubmit(payload);
    setSubmitting(false);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[850px] border-zinc-800 bg-zinc-900 text-zinc-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-lg flex items-center gap-2 border-b border-zinc-800 pb-3">
              <FileText className="h-5 w-5 text-indigo-500" />
              <span>{initialData ? `Editar Cotización #${initialData.folio}` : 'Nueva Cotización Comercial'}</span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 py-2">
            {/* Cliente y Estado */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Cliente *</label>
                <select
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  className="w-full h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 px-3 focus:border-indigo-500"
                >
                  <option value="">-- Seleccionar Cliente --</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} {c.identificacion ? `(${c.identificacion})` : ''}
                    </option>
                  ))}
                </select>
                {errors.clienteId && <p className="text-xs text-red-400">{errors.clienteId}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Estado Documento</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as any)}
                  className="w-full h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 px-3 focus:border-indigo-500"
                >
                  <option value="BORRADOR">Borrador</option>
                  <option value="ENVIADA">Enviada</option>
                  <option value="APROBADA">Aprobada</option>
                  <option value="RECHAZADA">Rechazada</option>
                  <option value="VENCIDA">Vencida</option>
                </select>
              </div>
            </div>

            {/* Barra de Acciones de Ítems */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Detalle de Cotización</span>
                  <span className="text-xs font-normal text-zinc-400 font-mono">
                    ({items.length} líneas)
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => setProductSelectorOpen(true)}
                  className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs h-9 cursor-pointer"
                >
                  <Package className="h-4 w-4 mr-1.5" />
                  + Agregar desde Catálogo
                </Button>

                <Button
                  type="button"
                  onClick={handleAddManualService}
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs h-9 cursor-pointer"
                >
                  <Wrench className="h-4 w-4 mr-1.5" />
                  + Servicio Manual
                </Button>
              </div>
            </div>

            {errors.items && <p className="text-xs text-red-400 font-medium">{errors.items}</p>}

            {/* Tabla Editable de Ítems */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-900 text-zinc-400 font-semibold border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-2 w-14 text-center">Orden</th>
                      <th className="py-2.5 px-3 w-16 text-center">Tipo</th>
                      <th className="py-2.5 px-3">Concepto / Nombre</th>
                      <th className="py-2.5 px-3">Descripción / Notas</th>
                      <th className="py-2.5 px-3 w-20 text-center">Cant.</th>
                      <th className="py-2.5 px-3 w-32 text-right">P. Unitario ($)</th>
                      <th className="py-2.5 px-3 w-32 text-right">Subtotal ($)</th>
                      <th className="py-2.5 px-3 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-zinc-500">
                          No hay ítems en la cotización. Usa los botones superiores para agregar productos del catálogo o servicios manuales.
                        </td>
                      </tr>
                    ) : (
                      items.map((item, idx) => {
                        const itemSubtotal = item.cantidad * item.precioUnit;
                        return (
                          <tr
                            key={idx}
                            draggable
                            onDragStart={(e) => handleDragStart(e, idx)}
                            onDragOver={(e) => handleDragOver(e, idx)}
                            onDrop={(e) => handleDrop(e, idx)}
                            className={`hover:bg-zinc-900/60 transition-colors ${
                              draggedIndex === idx ? 'opacity-40 bg-indigo-950/30' : ''
                            }`}
                          >
                            {/* Drag Handle */}
                            <td className="py-2 px-1 text-center">
                              <div
                                title="Arrastrar para reordenar"
                                className="flex items-center justify-center cursor-grab active:cursor-grabbing text-zinc-500 hover:text-indigo-400 p-1"
                              >
                                <GripVertical className="h-4 w-4" />
                              </div>
                            </td>
                            {/* Tipo Badge */}
                            <td className="py-2 px-3 text-center">
                              {item.tipo === 'PRODUCTO' ? (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-950 text-indigo-400 border border-indigo-500/20">
                                  PROD
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/20">
                                  SERV
                                </span>
                              )}
                            </td>

                            {/* Nombre / Concepto */}
                            <td className="py-2 px-3">
                              <Input
                                value={item.nombre}
                                onChange={(e) => handleItemChange(idx, 'nombre', e.target.value)}
                                placeholder="Nombre del ítem..."
                                className="h-8 bg-zinc-900 border-zinc-800 text-xs text-white"
                              />
                            </td>

                            {/* Descripción */}
                            <td className="py-2 px-3">
                              <Input
                                value={item.descripcion || ''}
                                onChange={(e) => handleItemChange(idx, 'descripcion', e.target.value)}
                                placeholder="Detalles de instalación o modelo..."
                                className="h-8 bg-zinc-900 border-zinc-800 text-xs text-zinc-300"
                              />
                            </td>

                            {/* Cantidad */}
                            <td className="py-2 px-3">
                              <Input
                                type="number"
                                min={1}
                                value={item.cantidad}
                                onChange={(e) => handleItemChange(idx, 'cantidad', Math.max(1, parseInt(e.target.value, 10) || 1))}
                                className="h-8 bg-zinc-900 border-zinc-800 text-xs text-center text-white font-mono"
                              />
                            </td>

                            {/* Precio Unitario */}
                            <td className="py-2 px-3">
                              <Input
                                type="number"
                                min={0}
                                value={item.precioUnit}
                                onChange={(e) => handleItemChange(idx, 'precioUnit', Math.max(0, parseFloat(e.target.value) || 0))}
                                className="h-8 bg-zinc-900 border-zinc-800 text-xs text-right text-emerald-400 font-mono font-semibold"
                              />
                            </td>

                            {/* Subtotal Línea */}
                            <td className="py-2 px-3 text-right font-mono font-bold text-white text-xs">
                              {formatCurrency(itemSubtotal)}
                            </td>

                            {/* Eliminar Ítem */}
                            <td className="py-2 px-3 text-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(idx)}
                                className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-950/40"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Observaciones y Totales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Observaciones y Condiciones Comercial</label>
                <textarea
                  rows={4}
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Forma de pago, tiempo de validez de la oferta (ej: 15 días), condiciones de entrega..."
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-3 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Subtotal Ítems:</span>
                  <span className="font-mono text-zinc-200 font-medium">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Descuento Global ($):</span>
                  <Input
                    type="number"
                    min={0}
                    value={descuento}
                    onChange={(e) => setDescuento(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="h-7 w-28 bg-zinc-900 border-zinc-800 text-xs text-right font-mono text-amber-400"
                  />
                </div>

                <div className="border-t border-zinc-800 pt-2 flex justify-between items-center">
                  <span className="text-sm font-bold text-white">TOTAL FINAL:</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-zinc-800 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-zinc-800 text-zinc-400 hover:bg-zinc-800 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                {submitting ? 'Guardando...' : initialData ? 'Guardar Cambios' : 'Crear Cotización'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ProductoSelectorDialog
        open={productSelectorOpen}
        onOpenChange={setProductSelectorOpen}
        productos={productos}
        onSelectProducto={handleSelectProductoFromCatalog}
      />
    </>
  );
}
