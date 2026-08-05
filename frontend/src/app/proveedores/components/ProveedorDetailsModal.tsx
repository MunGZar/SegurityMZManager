import React from 'react';
import { 
  Info, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Calendar,
  Layers,
  ShoppingBag,
  Building2,
  MessageCircle
} from 'lucide-react';
import { Proveedor } from '@/services/proveedores.service';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface ProveedorDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proveedor: Proveedor | null;
}

export function ProveedorDetailsModal({
  open,
  onOpenChange,
  proveedor,
}: ProveedorDetailsModalProps) {
  if (!proveedor) return null;

  const getStatusBadge = (activo: boolean, deletedAt?: string | null) => {
    if (deletedAt) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950/40 border border-red-500/30 text-red-400">
          Eliminado Lógicamente
        </span>
      );
    }

    if (activo) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
          Activo
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 border border-zinc-700 text-zinc-400">
          Inactivo
        </span>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-zinc-800 bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-500" />
            Ficha del Proveedor
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Detalles técnicos e información de contacto del proveedor.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Card */}
          <div className="flex gap-4 items-start p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
            <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-lg uppercase shrink-0">
              {proveedor.nombre.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white leading-tight truncate">{proveedor.nombre}</h3>
                {getStatusBadge(proveedor.activo, proveedor.deletedAt)}
              </div>
              <p className="text-xs text-zinc-500 mt-1">ID: {proveedor.id}</p>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Contacto Directo</span>
              <p className="text-sm text-zinc-200 font-medium">{proveedor.contacto || 'No especificado'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Teléfono de Soporte</span>
              <p className="text-sm text-zinc-200 font-medium flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-zinc-500" />
                {proveedor.telefono || 'No registrado'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">WhatsApp Directo</span>
              <p className="text-sm text-zinc-205 font-medium flex items-center gap-1.5 text-indigo-400">
                <MessageCircle className="h-3.5 w-3.5 text-zinc-500" />
                {proveedor.whatsapp || 'No registrado'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Correo Electrónico</span>
              <p className="text-sm text-zinc-200 font-medium flex items-center gap-1.5 truncate">
                <Mail className="h-3.5 w-3.5 text-zinc-500" />
                {proveedor.correo || 'No registrado'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Ciudad</span>
              <p className="text-sm text-zinc-200 font-medium">{proveedor.ciudad || 'No especificada'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Registrado El</span>
              <p className="text-sm text-zinc-200 font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                {new Date(proveedor.createdAt).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
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
              {proveedor.direccion || 'Sin dirección registrada'}
            </p>
          </div>

          {/* Observaciones */}
          <div className="space-y-1 border-t border-zinc-800/60 pt-4">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Observaciones del Proveedor
            </span>
            <p className="text-sm text-zinc-300 font-medium bg-zinc-950/40 border border-zinc-800/40 p-3 rounded-lg whitespace-pre-wrap leading-relaxed">
              {proveedor.observaciones || 'Sin observaciones registradas.'}
            </p>
          </div>

          {/* Relaciones futuras con Productos */}
          <div className="border-t border-zinc-800/60 pt-4 space-y-3">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              Relaciones Relacionadas (Pre-diseñadas)
            </span>
            <div className="p-3 rounded-lg bg-zinc-950/30 border border-zinc-800/50 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-400/80" />
              <div>
                <p className="text-xs text-zinc-500 font-medium">Catálogo de Productos Suministrados</p>
                <p className="text-sm font-semibold text-zinc-300">0 Productos en catálogo (Relación preparada)</p>
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
