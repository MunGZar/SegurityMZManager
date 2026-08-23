import React, { useState } from 'react';
import { OrdenTrabajo, OrdenTrabajoEstado } from '@/services/ordenes-trabajo.service';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface ChangeEstadoOrdenModalProps {
  isOpen: boolean;
  onClose: () => void;
  orden: OrdenTrabajo | null;
  onSubmit: (id: string, estado: OrdenTrabajoEstado) => Promise<boolean>;
}

export function ChangeEstadoOrdenModal({
  isOpen,
  onClose,
  orden,
  onSubmit,
}: ChangeEstadoOrdenModalProps) {
  const [estado, setEstado] = useState<OrdenTrabajoEstado>('PENDIENTE');
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (orden) {
      setEstado(orden.estado);
    }
  }, [orden]);

  if (!orden) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await onSubmit(orden.id, estado);
    setSubmitting(false);
    if (ok) onClose();
  };

  const estadosInfo: Record<OrdenTrabajoEstado, { label: string; desc: string; color: string }> = {
    PENDIENTE: { label: 'Pendiente', desc: 'Orden creada, en espera de asignar fecha u operarios.', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
    PROGRAMADA: { label: 'Programada', desc: 'Fecha y hora coordinadas con el cliente.', color: 'border-blue-500/40 bg-blue-950/20 text-blue-300' },
    EN_PROCESO: { label: 'En Proceso', desc: 'Técnicos trabajando actualmente en terreno.', color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300' },
    FINALIZADA: { label: 'Finalizada', desc: 'Instalación terminada, probada y entregada al cliente.', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' },
    CANCELADA: { label: 'Cancelada', desc: 'Orden cancelada por el cliente o inconveniente insalvable.', color: 'border-red-500/40 bg-red-950/20 text-red-300' },
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Cambiar Estado de Orden - ${orden.folio}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300">Nuevo Estado Operativo</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as OrdenTrabajoEstado)}
            className="w-full h-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 font-semibold"
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="PROGRAMADA">Programada</option>
            <option value="EN_PROCESO">En Proceso</option>
            <option value="FINALIZADA">Finalizada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>

        <div className={`p-4 rounded-xl border ${estadosInfo[estado].color} space-y-1`}>
          <h4 className="font-bold text-sm font-mono flex items-center gap-1.5">
            <RefreshCw className="h-4 w-4" /> {estadosInfo[estado].label}
          </h4>
          <p className="text-xs opacity-90">{estadosInfo[estado].desc}</p>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
          <Button type="button" variant="ghost" onClick={onClose} disabled={submitting} className="cursor-pointer">
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={submitting || estado === orden.estado}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium gap-2 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            {submitting ? 'Actualizando...' : 'Actualizar Estado'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
