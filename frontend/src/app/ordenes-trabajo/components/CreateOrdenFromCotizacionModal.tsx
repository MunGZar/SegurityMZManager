import React, { useState } from 'react';
import { Cotizacion } from '@/services/cotizaciones.service';
import { CreateOrdenTrabajoPayload, OrdenTrabajoPrioridad } from '@/services/ordenes-trabajo.service';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Calendar, Clock, Wrench, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CreateOrdenFromCotizacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cotizacionesAprobadas: Cotizacion[];
  onSubmit: (payload: CreateOrdenTrabajoPayload) => Promise<boolean>;
}

export function CreateOrdenFromCotizacionModal({
  isOpen,
  onClose,
  cotizacionesAprobadas,
  onSubmit,
}: CreateOrdenFromCotizacionModalProps) {
  const [selectedCotizacionId, setSelectedCotizacionId] = useState('');
  const [fechaProgramada, setFechaProgramada] = useState('');
  const [horaProgramada, setHoraProgramada] = useState('');
  const [prioridad, setPrioridad] = useState<OrdenTrabajoPrioridad>('MEDIA');
  const [direccion, setDireccion] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const selectedCotizacion = cotizacionesAprobadas.find((c) => c.id === selectedCotizacionId);

  const handleCotizacionSelect = (id: string) => {
    setSelectedCotizacionId(id);
    const cot = cotizacionesAprobadas.find((c) => c.id === id);
    if (cot?.cliente?.direccion) {
      setDireccion(cot.cliente.direccion);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCotizacionId) return;

    setSubmitting(true);
    const ok = await onSubmit({
      cotizacionId: selectedCotizacionId,
      fechaProgramada: fechaProgramada || undefined,
      horaProgramada: horaProgramada || undefined,
      prioridad,
      direccion: direccion || undefined,
      observaciones: observaciones || undefined,
    });
    setSubmitting(false);

    if (ok) {
      // Reset
      setSelectedCotizacionId('');
      setFechaProgramada('');
      setHoraProgramada('');
      setPrioridad('MEDIA');
      setDireccion('');
      setObservaciones('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generar Orden de Trabajo desde Cotización Aprobada"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Selector de Cotizaciones Aprobadas */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-zinc-300">
            Seleccionar Cotización Aprobada <span className="text-red-400">*</span>
          </Label>
          {cotizacionesAprobadas.length === 0 ? (
            <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>No hay cotizaciones en estado &apos;APROBADA&apos; disponibles para generar órdenes.</span>
            </div>
          ) : (
            <select
              value={selectedCotizacionId}
              onChange={(e) => handleCotizacionSelect(e.target.value)}
              required
              className="w-full h-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
            >
              <option value="">-- Seleccionar Cotización --</option>
              {cotizacionesAprobadas.map((cot) => (
                <option key={cot.id} value={cot.id}>
                  #{cot.folio} - {cot.cliente?.nombre} (${Number(cot.total).toLocaleString('es-CL')})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Resumen de la cotización seleccionada */}
        {selectedCotizacion && (
          <div className="p-4 rounded-xl bg-zinc-900 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                <FileText className="h-4 w-4" /> Cotización #{selectedCotizacion.folio}
              </span>
              <span className="text-emerald-400 font-bold">
                Total: ${Number(selectedCotizacion.total).toLocaleString('es-CL')}
              </span>
            </div>
            <div className="text-xs text-zinc-300">
              <span className="font-semibold text-white">Cliente:</span> {selectedCotizacion.cliente?.nombre} ({selectedCotizacion.cliente?.identificacion || 'Sin ID'})
            </div>
            <div className="text-xs text-zinc-400">
              <span className="font-semibold text-zinc-300">Ítems a instalar:</span> {selectedCotizacion.detalles?.length || 0} productos/servicios registrados
            </div>
          </div>
        )}

        {/* Programación e información operativa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-300 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" /> Fecha Programada
            </Label>
            <Input
              type="date"
              value={fechaProgramada}
              onChange={(e) => setFechaProgramada(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-300 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-indigo-400" /> Hora Programada
            </Label>
            <Input
              type="text"
              placeholder="ej: 09:30 AM o 14:00"
              value={horaProgramada}
              onChange={(e) => setHoraProgramada(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white text-xs font-mono"
            />
          </div>
        </div>

        {/* Prioridad y Dirección */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-300">Prioridad Operativa</Label>
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value as OrdenTrabajoPrioridad)}
              className="w-full h-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="BAJA">Baja</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta</option>
              <option value="URGENTE">URGENTE</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-300">Dirección de Instalación</Label>
            <Input
              type="text"
              placeholder="Dirección completa del proyecto"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white text-xs"
            />
          </div>
        </div>

        {/* Observaciones Operativas */}
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-300">Observaciones Generales</Label>
          <textarea
            rows={3}
            placeholder="Instrucciones previas, llaves, persona de contacto en sitio..."
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
          <Button type="button" variant="ghost" onClick={onClose} disabled={submitting} className="cursor-pointer">
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!selectedCotizacionId || submitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium gap-2 cursor-pointer"
          >
            <Wrench className="h-4 w-4" />
            {submitting ? 'Creando Orden...' : 'Generar Orden de Trabajo'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
