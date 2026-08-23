import React from 'react';
import { Tag, Calendar, Layers, ShoppingBag } from 'lucide-react';
import { Marca } from '@/services/marcas.service';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/shared';
import { formatDate } from '@/lib/utils';

interface MarcaDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  marca: Marca | null;
}

export function MarcaDetailsModal({
  open,
  onOpenChange,
  marca,
}: MarcaDetailsModalProps) {
  if (!marca) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-zinc-800 bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Tag className="h-5 w-5 text-indigo-500" />
            Ficha de la Marca
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Detalles técnicos e información del fabricante.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-3">
          {/* Header Card */}
          <div className="flex gap-4 items-start p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
            <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-lg uppercase shrink-0">
              {marca.nombre.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white leading-tight truncate">{marca.nombre}</h3>
                {marca.deletedAt ? (
                  <StatusBadge variant="deleted" label="Eliminado Lógicamente" />
                ) : marca.activo ? (
                  <StatusBadge variant="active" label="Activa" />
                ) : (
                  <StatusBadge variant="inactive" label="Inactiva" />
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-1">ID: {marca.id}</p>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Fecha de Creación</span>
              <p className="text-sm text-zinc-200 font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                {formatDate(marca.createdAt, true)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Última Actualización</span>
              <p className="text-sm text-zinc-200 font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                {formatDate(marca.updatedAt, true)}
              </p>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-1 border-t border-zinc-800/60 pt-4">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
              Descripción
            </span>
            <p className="text-sm text-zinc-300 font-medium bg-zinc-950/40 border border-zinc-800/40 p-3 rounded-lg whitespace-pre-wrap leading-relaxed">
              {marca.descripcion || 'Sin descripción registrada.'}
            </p>
          </div>

          {/* Relación con Productos */}
          <div className="border-t border-zinc-800/60 pt-4 space-y-3">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              Relación con Catálogo de Productos
            </span>
            <div className="p-3 rounded-lg bg-zinc-950/30 border border-zinc-800/50 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-400/80" />
              <div>
                <p className="text-xs text-zinc-500 font-medium">Productos de esta marca</p>
                <p className="text-sm font-semibold text-zinc-300">Estructura preparada para FK Productos</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2 border-t border-zinc-800">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 w-full sm:w-auto cursor-pointer"
          >
            Cerrar Ficha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
