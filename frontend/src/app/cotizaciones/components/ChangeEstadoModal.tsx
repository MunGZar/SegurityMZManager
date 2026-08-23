import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { Cotizacion, CotizacionEstado } from '@/services/cotizaciones.service';

interface ChangeEstadoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cotizacion: Cotizacion | null;
  onConfirm: (id: string, estado: CotizacionEstado) => Promise<boolean>;
}

export function ChangeEstadoModal({
  open,
  onOpenChange,
  cotizacion,
  onConfirm,
}: ChangeEstadoModalProps) {
  const [estado, setEstado] = useState<CotizacionEstado>('BORRADOR');
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (cotizacion) {
      setEstado(cotizacion.estado);
    }
  }, [cotizacion]);

  if (!cotizacion) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await onConfirm(cotizacion.id, estado);
    setSubmitting(false);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] border-zinc-800 bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-white text-base flex items-center gap-2 border-b border-zinc-800 pb-3">
            <RefreshCw className="h-5 w-5 text-indigo-400" />
            Cambiar Estado de Cotización #{cotizacion.folio}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Seleccionar Nuevo Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value as CotizacionEstado)}
              className="w-full h-10 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 px-3 focus:border-indigo-500"
            >
              <option value="BORRADOR">Borrador</option>
              <option value="ENVIADA">Enviada al Cliente</option>
              <option value="APROBADA">Aprobada por el Cliente</option>
              <option value="RECHAZADA">Rechazada</option>
              <option value="VENCIDA">Vencida</option>
            </select>
          </div>

          {estado === 'APROBADA' && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-300 leading-relaxed">
                <strong>Cotización Aprobada:</strong> El documento quedará consolidado y preparado para ser transformado posteriormente en Orden de Compra e Instalación.
              </div>
            </div>
          )}

          {estado === 'RECHAZADA' && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs text-red-300 leading-relaxed">
                La cotización se marcará como no aceptada por el cliente.
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-zinc-800 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-zinc-800 text-zinc-400 hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20"
            >
              {submitting ? 'Guardando...' : 'Actualizar Estado'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
