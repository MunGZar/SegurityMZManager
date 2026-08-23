import React from 'react';
import { OrdenTrabajo } from '@/services/ordenes-trabajo.service';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/ui/button';
import { Printer, Calendar, Clock, MapPin, ShieldCheck, Server, Lock, User, FileText, Camera, CheckSquare } from 'lucide-react';

interface OrdenDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orden: OrdenTrabajo | null;
}

export function OrdenDetailsModal({ isOpen, onClose, orden }: OrdenDetailsModalProps) {
  if (!orden) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Por coordinar';
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Orden de Trabajo ${orden.folio}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Printable Container */}
        <div className="printable-area bg-zinc-950 p-6 rounded-xl border border-zinc-800 space-y-6 text-zinc-300">
          {/* Header & Logo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-indigo-500 inline-block"></span>
                SEGURITY MZ MANAGER
              </h2>
              <p className="text-xs text-zinc-400 font-mono">Sistemas de Seguridad Electrónica & CCTV</p>
            </div>
            <div className="text-right font-mono">
              <span className="inline-block px-3 py-1 bg-indigo-950 text-indigo-300 rounded font-bold text-sm border border-indigo-500/30">
                ORDEN DE TRABAJO: {orden.folio}
              </span>
              <p className="text-[11px] text-zinc-400 mt-1">
                Ref. Cotización: <strong className="text-white">#{orden.cotizacion?.folio}</strong>
              </p>
            </div>
          </div>

          {/* Información del Cliente & Dirección */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs">
            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                <User className="h-4 w-4 text-indigo-400" /> Cliente / Titular
              </h4>
              <p className="font-semibold text-zinc-200">{orden.cliente?.nombre}</p>
              {orden.cliente?.identificacion && <p className="text-zinc-400">ID: {orden.cliente.identificacion}</p>}
              {orden.cliente?.telefono && <p className="text-zinc-400">Tel: {orden.cliente.telefono}</p>}
              {orden.cliente?.email && <p className="text-zinc-400">Email: {orden.cliente.email}</p>}
            </div>

            <div className="space-y-1 border-t md:border-t-0 md:border-l border-zinc-800 pt-2 md:pt-0 md:pl-4">
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-400" /> Programación & Ubicación
              </h4>
              <p className="text-zinc-200">
                <strong>Dirección:</strong> {orden.direccion || orden.cliente?.direccion || 'No especificada'}
              </p>
              <p className="text-zinc-200 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-indigo-400" /> <strong>Fecha:</strong> {formatDate(orden.fechaProgramada)}
              </p>
              {orden.horaProgramada && (
                <p className="text-zinc-300 font-mono">
                  ⏰ <strong>Hora:</strong> {orden.horaProgramada}
                </p>
              )}
              <p className="text-zinc-400">
                <strong>Prioridad:</strong> <span className="font-bold text-indigo-300">{orden.prioridad}</span> |{' '}
                <strong>Estado:</strong> <span className="font-bold text-emerald-300">{orden.estado}</span>
              </p>
            </div>
          </div>

          {/* Tabla de Equipos y Servicios a Instalar */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <CheckSquare className="h-4 w-4 text-indigo-400" /> Ítems Aprobados a Instalar ({orden.cotizacion?.detalles?.length || 0})
            </h4>
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900 text-zinc-400 uppercase font-mono font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Tipo</th>
                    <th className="py-2.5 px-3">Concepto / Producto</th>
                    <th className="py-2.5 px-3">Marca / Modelo</th>
                    <th className="py-2.5 px-3 text-center">Cant.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {orden.cotizacion?.detalles?.map((det) => (
                    <tr key={det.id} className="hover:bg-zinc-900/40">
                      <td className="py-2.5 px-3 font-mono">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            det.tipo === 'PRODUCTO'
                              ? 'bg-blue-950 text-blue-300 border border-blue-500/20'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-500/20'
                          }`}
                        >
                          {det.tipo}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{det.nombre}</div>
                        {det.descripcion && <div className="text-[11px] text-zinc-400">{det.descripcion}</div>}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-zinc-400">
                        {det.producto?.marca?.nombre || '-'} {det.producto?.modelo ? `(${det.producto.modelo})` : ''}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-indigo-300">{det.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ficha Técnica Operativa (DVR, IP, Seriales) */}
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Server className="h-4 w-4" /> Configuración Técnica de Instalación
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block">USUARIO DVR/NVR</span>
                <span className="text-white font-bold">{orden.usuarioDvr || 'No registrado'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block">CONTRASEÑA DVR/NVR</span>
                <span className="text-white font-bold">{orden.passwordDvrEncrypted ? '••••••••' : 'No registrada'}</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block">DIRECCIÓN IP</span>
                <span className="text-indigo-300 font-bold">{orden.direccionIp || 'No asignada'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-zinc-500 font-mono text-[10px] block">SERIALES / INVENTARIO</span>
                <p className="text-zinc-300 font-mono text-[11px] whitespace-pre-wrap">{orden.serialesEquipos || 'Sin seriales registrados'}</p>
              </div>
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-zinc-500 font-mono text-[10px] block">OBSERVACIONES TÉCNICAS</span>
                <p className="text-zinc-300 text-[11px] whitespace-pre-wrap">{orden.observacionesTecnicas || 'Sin observaciones técnicas'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className="text-zinc-400 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Garantía del Servicio: <strong>{orden.garantiaMeses} Meses</strong>
              </span>
              <span className="text-zinc-400">
                Fecha Entrega: <strong>{formatDate(orden.fechaEntrega)}</strong>
              </span>
            </div>
          </div>

          {/* Muestra de Evidencias */}
          {orden.evidencias && orden.evidencias.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Camera className="h-4 w-4 text-indigo-400" /> Evidencias Adjuntas ({orden.evidencias.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {orden.evidencias.map((ev) => (
                  <div key={ev.id} className="p-2 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400">
                    <span className="font-bold text-indigo-300 block">{ev.tipo}</span>
                    <span className="truncate block font-mono">{ev.url}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Firmas y Recepción */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-800 text-center font-mono text-xs">
            <div className="space-y-8">
              <div className="h-12 border-b border-zinc-700 w-3/4 mx-auto"></div>
              <p className="text-zinc-400 font-semibold">Técnico Responsable</p>
            </div>
            <div className="space-y-8">
              <div className="h-12 border-b border-zinc-700 w-3/4 mx-auto"></div>
              <p className="text-zinc-400 font-semibold">Conforme Cliente / Firma</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 cursor-pointer">
            Cerrar
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium gap-2 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Imprimir Orden de Trabajo
          </Button>
        </div>
      </div>
    </Modal>
  );
}
