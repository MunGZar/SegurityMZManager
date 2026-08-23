import React, { useState } from 'react';
import { OrdenTrabajo, TipoEvidencia, AddEvidenciaPayload } from '@/services/ordenes-trabajo.service';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Plus, Trash2, Image as ImageIcon, CheckCircle, FileText } from 'lucide-react';

interface EvidenciasGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orden: OrdenTrabajo | null;
  onAddEvidencia: (ordenId: string, payload: AddEvidenciaPayload) => Promise<boolean>;
  onDeleteEvidencia: (evidenciaId: string) => Promise<boolean>;
}

export function EvidenciasGalleryModal({
  isOpen,
  onClose,
  orden,
  onAddEvidencia,
  onDeleteEvidencia,
}: EvidenciasGalleryModalProps) {
  const [tipo, setTipo] = useState<TipoEvidencia>('ANTES');
  const [url, setUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!orden) return null;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setSubmitting(true);
    const ok = await onAddEvidencia(orden.id, {
      tipo,
      url: url.trim(),
      descripcion: descripcion.trim() || undefined,
    });
    setSubmitting(false);

    if (ok) {
      setUrl('');
      setDescripcion('');
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDeleteEvidencia(id);
    setDeletingId(null);
  };

  const getTipoBadge = (t: TipoEvidencia) => {
    switch (t) {
      case 'ANTES':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">Antes del Trabajo</span>;
      case 'DESPUES':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">Después del Trabajo</span>;
      case 'ACTA_ENTREGA':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">Acta de Entrega</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">Otro</span>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Gestión de Evidencias Fotográficas - ${orden.folio}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Subir / Registrar nueva evidencia */}
        <form onSubmit={handleAdd} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Camera className="h-4 w-4" /> Registrar Nueva Fotografía / Documento
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">Tipo de Evidencia</Label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoEvidencia)}
                className="w-full h-9 px-3 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="ANTES">Antes del Trabajo (Estado Inicial)</option>
                <option value="DESPUES">Después del Trabajo (Finalizado)</option>
                <option value="ACTA_ENTREGA">Acta de Entrega / Firma</option>
                <option value="OTRO">Otro Documento / Foto</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs text-zinc-300">URL o Ruta de Imagen <span className="text-red-400">*</span></Label>
              <Input
                type="text"
                placeholder="https://ejemplo.com/fotos/camara-1.jpg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 space-y-1">
              <Label className="text-xs text-zinc-300">Descripción / Nota</Label>
              <Input
                type="text"
                placeholder="ej: Ubicación del DVR en rack principal"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-xs"
              />
            </div>
            <Button
              type="submit"
              disabled={!url.trim() || submitting}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5 h-9 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              {submitting ? 'Guardando...' : 'Agregar'}
            </Button>
          </div>
        </form>

        {/* Galería de Evidencias Existentes */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono flex items-center justify-between">
            <span>Evidencias Registradas ({orden.evidencias?.length || 0})</span>
          </h4>

          {(!orden.evidencias || orden.evidencias.length === 0) ? (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-zinc-800 text-zinc-500 text-xs">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-40 text-zinc-400" />
              <p>No se han registrado fotografías de evidencia para esta orden.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto custom-scrollbar p-1">
              {orden.evidencias.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 flex flex-col justify-between space-y-2 group hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>{getTipoBadge(ev.tipo)}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(ev.id)}
                      disabled={deletingId === ev.id}
                      className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-950/40 cursor-pointer"
                      title="Eliminar evidencia"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="space-y-1">
                    {ev.url.startsWith('http') || ev.url.endsWith('.jpg') || ev.url.endsWith('.png') ? (
                      <div className="h-28 rounded-lg overflow-hidden bg-black/50 border border-zinc-800 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ev.url}
                          alt={ev.descripcion || 'Evidencia de instalación'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="p-3 bg-zinc-950 rounded font-mono text-xs text-zinc-400 truncate">
                        🔗 {ev.url}
                      </div>
                    )}

                    {ev.descripcion && (
                      <p className="text-xs text-zinc-300 font-medium italic">&quot;{ev.descripcion}&quot;</p>
                    )}
                    <span className="text-[10px] text-zinc-500 font-mono block">
                      Registrado: {new Date(ev.createdAt).toLocaleDateString('es-CL')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
