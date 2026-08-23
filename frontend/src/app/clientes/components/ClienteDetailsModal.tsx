import React from 'react';
import { 
  Info, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Calendar,
  Layers,
  FileCheck2,
  Wrench
} from 'lucide-react';
import { Cliente } from '@/services/clientes.service';
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

interface ClienteDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente: Cliente | null;
}

export function ClienteDetailsModal({
  open,
  onOpenChange,
  cliente,
}: ClienteDetailsModalProps) {
  if (!cliente) return null;

  const getStatusBadge = (status: string, deletedAt?: string | null) => {
    if (deletedAt) {
      return <StatusBadge variant="deleted" label="Eliminado Lógicamente" />;
    }

    switch (status) {
      case 'PROSPECTO':
        return <StatusBadge variant="prospect" label="Prospecto" />;
      case 'ACTIVO':
        return <StatusBadge variant="active" label="Cliente Activo" />;
      case 'INACTIVO':
        return <StatusBadge variant="inactive" label="Inactivo" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-zinc-800 bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Info className="h-5 w-5 text-indigo-500" />
            Detalles del Cliente
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Ficha de información completa del cliente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Card */}
          <div className="flex gap-4 items-start p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
            <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-lg uppercase shrink-0">
              {cliente.nombre.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white leading-tight truncate">{cliente.nombre}</h3>
                {getStatusBadge(cliente.status, cliente.deletedAt)}
              </div>
              <p className="text-xs text-zinc-500 mt-1">ID: {cliente.id}</p>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Identificación</span>
              <p className="text-sm text-zinc-200 font-medium">{cliente.identificacion || 'No registrado'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Teléfono</span>
              <p className="text-sm text-zinc-200 font-medium flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-zinc-500" />
                {cliente.telefono || 'No registrado'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Correo Electrónico</span>
              <p className="text-sm text-zinc-200 font-medium flex items-center gap-1.5 truncate">
                <Mail className="h-3.5 w-3.5 text-zinc-500" />
                {cliente.email || 'No registrado'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Registrado El</span>
              <p className="text-sm text-zinc-200 font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                {formatDate(cliente.createdAt, true)}
              </p>
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-1 border-t border-zinc-800/60 pt-4">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Dirección Física
            </span>
            <p className="text-sm text-zinc-200 font-medium leading-relaxed">
              {cliente.direccion || 'Sin dirección registrada'}
            </p>
          </div>

          {/* Notas */}
          <div className="space-y-1 border-t border-zinc-800/60 pt-4">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Notas Internas
            </span>
            <p className="text-sm text-zinc-300 font-medium bg-zinc-950/40 border border-zinc-800/40 p-3 rounded-lg whitespace-pre-wrap leading-relaxed">
              {cliente.notas || 'Sin anotaciones adicionales.'}
            </p>
          </div>

          {/* Relaciones Preparadas */}
          <div className="border-t border-zinc-800/60 pt-4 space-y-3">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              Relaciones Relacionadas (Pre-diseñadas)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-zinc-950/30 border border-zinc-800/50 flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-indigo-400/80" />
                <div>
                  <p className="text-xs text-zinc-500 font-medium">Cotizaciones</p>
                  <p className="text-sm font-semibold text-zinc-300">0 Registros</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950/30 border border-zinc-800/50 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-indigo-400/80" />
                <div>
                  <p className="text-xs text-zinc-500 font-medium">Instalaciones</p>
                  <p className="text-sm font-semibold text-zinc-300">0 Registros</p>
                </div>
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
