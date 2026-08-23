import React, { useState, useEffect } from 'react';
import { OrdenTrabajo, UpdateOrdenTrabajoPayload, OrdenTrabajoEstado, OrdenTrabajoPrioridad } from '@/services/ordenes-trabajo.service';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wrench, Calendar, Clock, Lock, Server, ShieldCheck, FileText } from 'lucide-react';

interface OrdenFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  orden: OrdenTrabajo | null;
  onSubmit: (id: string, payload: UpdateOrdenTrabajoPayload) => Promise<boolean>;
}

export function OrdenFormModal({
  isOpen,
  onClose,
  orden,
  onSubmit,
}: OrdenFormModalProps) {
  const [fechaProgramada, setFechaProgramada] = useState('');
  const [horaProgramada, setHoraProgramada] = useState('');
  const [prioridad, setPrioridad] = useState<OrdenTrabajoPrioridad>('MEDIA');
  const [estado, setEstado] = useState<OrdenTrabajoEstado>('PENDIENTE');
  const [direccion, setDireccion] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Ficha técnica
  const [observacionesTecnicas, setObservacionesTecnicas] = useState('');
  const [serialesEquipos, setSerialesEquipos] = useState('');
  const [usuarioDvr, setUsuarioDvr] = useState('');
  const [passwordDvrEncrypted, setPasswordDvrEncrypted] = useState('');
  const [direccionIp, setDireccionIp] = useState('');
  const [garantiaMeses, setGarantiaMeses] = useState(12);
  const [fechaEntrega, setFechaEntrega] = useState('');

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (orden) {
      setFechaProgramada(orden.fechaProgramada ? new Date(orden.fechaProgramada).toISOString().split('T')[0] : '');
      setHoraProgramada(orden.horaProgramada || '');
      setPrioridad(orden.prioridad || 'MEDIA');
      setEstado(orden.estado || 'PENDIENTE');
      setDireccion(orden.direccion || '');
      setObservaciones(orden.observaciones || '');

      setObservacionesTecnicas(orden.observacionesTecnicas || '');
      setSerialesEquipos(orden.serialesEquipos || '');
      setUsuarioDvr(orden.usuarioDvr || '');
      setPasswordDvrEncrypted(orden.passwordDvrEncrypted || '');
      setDireccionIp(orden.direccionIp || '');
      setGarantiaMeses(orden.garantiaMeses !== undefined ? orden.garantiaMeses : 12);
      setFechaEntrega(orden.fechaEntrega ? new Date(orden.fechaEntrega).toISOString().split('T')[0] : '');
    }
  }, [orden]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orden) return;

    setSubmitting(true);
    const ok = await onSubmit(orden.id, {
      fechaProgramada: fechaProgramada || undefined,
      horaProgramada: horaProgramada || undefined,
      prioridad,
      estado,
      direccion: direccion || undefined,
      observaciones: observaciones || undefined,
      observacionesTecnicas: observacionesTecnicas || undefined,
      serialesEquipos: serialesEquipos || undefined,
      usuarioDvr: usuarioDvr || undefined,
      passwordDvrEncrypted: passwordDvrEncrypted || undefined,
      direccionIp: direccionIp || undefined,
      garantiaMeses,
      fechaEntrega: fechaEntrega || undefined,
    });
    setSubmitting(false);

    if (ok) {
      onClose();
    }
  };

  if (!orden) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Editar Orden de Trabajo ${orden.folio}`}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Encabezado fijo */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
          <span className="font-mono text-indigo-400 font-bold">Folio: {orden.folio}</span>
          <span className="text-zinc-300">Cliente: <strong className="text-white">{orden.cliente?.nombre}</strong></span>
          <span className="font-mono text-zinc-400">Cotización #{orden.cotizacion?.folio}</span>
        </div>

        {/* 1. Programación y Estado */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> Programación Operativa
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Fecha Programada</Label>
              <Input
                type="date"
                value={fechaProgramada}
                onChange={(e) => setFechaProgramada(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Hora Programada</Label>
              <Input
                type="text"
                placeholder="ej: 10:00 AM"
                value={horaProgramada}
                onChange={(e) => setHoraProgramada(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Prioridad</Label>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Estado Actual</Label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value as OrdenTrabajoEstado)}
                className="w-full h-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="PROGRAMADA">Programada</option>
                <option value="EN_PROCESO">En Proceso</option>
                <option value="FINALIZADA">Finalizada</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Dirección de Instalación</Label>
              <Input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* 2. Ficha Técnica de Instalación */}
        <div className="space-y-3 pt-2 border-t border-zinc-800">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Server className="h-4 w-4" /> Configuración Técnica & Credenciales DVR/NVR
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Usuario DVR/NVR</Label>
              <Input
                type="text"
                placeholder="admin"
                value={usuarioDvr}
                onChange={(e) => setUsuarioDvr(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300 flex items-center gap-1">
                <Lock className="h-3 w-3 text-emerald-400" /> Contraseña DVR/NVR
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwordDvrEncrypted}
                onChange={(e) => setPasswordDvrEncrypted(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Dirección IP Asignada</Label>
              <Input
                type="text"
                placeholder="192.168.1.100"
                value={direccionIp}
                onChange={(e) => setDireccionIp(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Garantía del Servicio (Meses)</Label>
              <Input
                type="number"
                min={0}
                value={garantiaMeses}
                onChange={(e) => setGarantiaMeses(parseInt(e.target.value, 10) || 0)}
                className="bg-zinc-800 border-zinc-700 text-white text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Fecha de Entrega Definitiva</Label>
              <Input
                type="date"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-zinc-300">Seriales / Inventario de Equipos Instalados</Label>
            <textarea
              rows={2}
              placeholder="Cámara 1: S/N 98A7B2, DVR 8 Ch: S/N 1234567..."
              value={serialesEquipos}
              onChange={(e) => setSerialesEquipos(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-zinc-300">Observaciones Técnicas de Instalación</Label>
            <textarea
              rows={2}
              placeholder="Detalles sobre el cableado, configuración de puertos, app móvil en teléfonos de cliente..."
              value={observacionesTecnicas}
              onChange={(e) => setObservacionesTecnicas(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Observaciones generales */}
        <div className="space-y-1 pt-2 border-t border-zinc-800">
          <Label className="text-xs text-zinc-300">Observaciones Generales</Label>
          <textarea
            rows={2}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
          <Button type="button" variant="ghost" onClick={onClose} disabled={submitting} className="cursor-pointer">
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium gap-2 cursor-pointer"
          >
            <Wrench className="h-4 w-4" />
            {submitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
