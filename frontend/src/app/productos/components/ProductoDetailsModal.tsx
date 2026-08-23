import React from 'react';
import { Producto } from '@/services/productos.service';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Package, Tag, Layers, Truck, ShieldCheck, DollarSign, Cpu } from 'lucide-react';

interface ProductoDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  producto: Producto | null;
}

export function ProductoDetailsModal({
  open,
  onOpenChange,
  producto,
}: ProductoDetailsModalProps) {
  if (!producto) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const isDeleted = Boolean(producto.deletedAt);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] border-zinc-800 bg-zinc-900 text-zinc-100 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-lg flex items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Package className="h-5 w-5 text-indigo-500" />
              <span>Ficha de Producto</span>
            </div>
            {isDeleted ? (
              <StatusBadge variant="deleted" />
            ) : producto.activo ? (
              <StatusBadge variant="active" />
            ) : (
              <StatusBadge variant="inactive" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Header Info: Imagen, Nombre, SKU, Modelo */}
          <div className="flex flex-col sm:flex-row gap-4 items-start bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
            {producto.imagenUrl ? (
              <img
                src={producto.imagenUrl}
                alt={producto.nombre}
                className="h-24 w-24 rounded-lg object-cover border border-zinc-800 bg-zinc-900 shrink-0"
              />
            ) : (
              <div className="h-24 w-24 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 shrink-0">
                <Package className="h-10 w-10" />
              </div>
            )}
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 font-semibold">
                  SKU: {producto.codigoInterno}
                </span>
                {producto.modelo && (
                  <span className="text-xs text-zinc-400 font-medium">
                    Modelo: <strong className="text-white">{producto.modelo}</strong>
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{producto.nombre}</h3>
              {producto.descripcion && (
                <p className="text-xs text-zinc-400 line-clamp-2">{producto.descripcion}</p>
              )}
            </div>
          </div>

          {/* Categorías & Proveedor */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-zinc-950/40 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Tag className="h-3 w-3 text-indigo-400" /> Marca
              </span>
              <p className="text-sm font-semibold text-white mt-1">{producto.marca?.nombre || 'Sin Marca'}</p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950/40 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-indigo-400" /> Categoría
              </span>
              <p className="text-sm font-semibold text-white mt-1">{producto.categoria?.nombre || 'Sin Categoría'}</p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950/40 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Truck className="h-3 w-3 text-indigo-400" /> Proveedor
              </span>
              <p className="text-sm font-semibold text-white mt-1">{producto.proveedor?.nombre || 'N/A'}</p>
            </div>
          </div>

          {/* Información Comercial */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-400 flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Resumen Comercial
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center sm:text-left">
              <div>
                <span className="text-xs text-zinc-500 block">Precio de Compra</span>
                <span className="text-sm font-semibold text-zinc-300 font-mono">
                  {formatCurrency(Number(producto.precioCompra))}
                </span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block">Margen Ganancia</span>
                <span className="text-sm font-semibold text-indigo-400 font-mono">
                  +{producto.margenPorcentaje}%
                </span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block">Precio de Venta</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  {formatCurrency(Number(producto.precioVenta))}
                </span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block">Garantía</span>
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" /> {producto.garantiaMeses} meses
                </span>
              </div>
            </div>
          </div>

          {/* Ficha Técnica */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-400 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-400" /> Especificaciones Técnicas
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-zinc-500 block">Resolución</span>
                <span className="font-semibold text-white">{producto.resolucion || '-'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-zinc-500 block">Tecnología</span>
                <span className="font-semibold text-white">{producto.tecnologia || '-'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-zinc-500 block">Tipo</span>
                <span className="font-semibold text-white">{producto.tipo || '-'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-zinc-500 block">Lente</span>
                <span className="font-semibold text-white">{producto.lente || '-'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-zinc-500 block">Audio</span>
                <span className="font-semibold text-white">{producto.audio || '-'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-zinc-500 block">Visión Nocturna</span>
                <span className="font-semibold text-white">{producto.visionNocturna || '-'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-zinc-500 block">Alimentación</span>
                <span className="font-semibold text-white">{producto.alimentacion || '-'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950/40 border border-zinc-800/60">
                <span className="text-zinc-500 block">Protección IP</span>
                <span className="font-semibold text-white">{producto.proteccionIP || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
