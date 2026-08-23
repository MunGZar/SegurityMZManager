import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Printer,
  FileText,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Cotizacion } from '@/services/cotizaciones.service';

interface CotizacionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cotizacion: Cotizacion | null;
}

// Dimensiones de referencia (en mm) de los tamaños de hoja convencionales.
// Carta y Oficio comparten el mismo ancho (215.9mm); Oficio es solo más alto.
// Por eso, si el contenido cabe en una hoja Carta, también cabrá en Oficio.
const PAGE_MARGIN_MM = 10;
const LETTER_HEIGHT_MM = 279.4; // 11in
const LETTER_WIDTH_MM = 215.9; // 8.5in
const MM_TO_PX = 3.7795275591; // a 96 DPI
const PRINTABLE_HEIGHT_MM = LETTER_HEIGHT_MM - PAGE_MARGIN_MM * 2; // 259.4mm
// A partir de este número de ítems, ya no se fuerza una sola hoja: se deja
// que el documento fluya naturalmente en 2 (o más) hojas, para no reducir
// el texto a un tamaño ilegible.
const MAX_ITEMS_SINGLE_PAGE = 15;

// Ajusta de forma IMPERATIVA (sin pasar por el estado de React, para evitar
// condiciones de carrera con el snapshot que toma el navegador al imprimir)
// la escala del documento.
//
// POR QUÉ UN WRAPPER (y no solo transform en el contenido):
// `transform: scale()` es puramente visual — el motor de paginación de
// impresión decide los saltos de página usando el tamaño de LAYOUT original
// del elemento, que `transform` no modifica. Por eso, aunque el contenido se
// viera "achicado" en el PDF, el navegador igual podía mandarlo a una
// segunda hoja. La solución es envolver el contenido escalado en un
// `wrapper` cuyo alto de layout se fija explícitamente al alto YA escalado
// (`naturalHeight * scale`), con `overflow: hidden`. Así el motor de
// paginación ve el tamaño reducido real y no dispara un salto de página.
//
// LÍMITE DE ÍTEMS:
// Si `itemCount` supera `MAX_ITEMS_SINGLE_PAGE`, no se fuerza una sola hoja:
// se deja que el documento fluya de forma natural en 2 o más hojas (usando
// los saltos de página normales, respetando `print:break-inside-avoid` en
// cada fila), para no reducir el texto a un tamaño ilegible.
//
// PRIORIDAD 1: nunca romper la estructura ni cortar/perder contenido (como
// las observaciones o las firmas) — se deja un 8% de colchón sobre la altura
// disponible como resguardo generoso ante diferencias de redondeo entre el
// navegador y el motor de impresión real.
// PRIORIDAD 2: si el contenido es más grande que la hoja y el número de
// ítems está dentro del límite, se reduce todo lo necesario (piso 0.3x)
// para que SIEMPRE quepa completo en una sola hoja.
function fitDocumentToOnePage(
  wrapperEl: HTMLElement | null,
  contentEl: HTMLElement | null,
  itemCount: number
) {
  if (!wrapperEl || !contentEl) return;

  // Reset de cualquier ajuste previo.
  contentEl.style.transform = 'none';
  contentEl.style.width = '100%';
  contentEl.style.minHeight = '0';
  wrapperEl.style.height = 'auto';
  wrapperEl.style.overflow = 'visible';

  // Más de 15 ítems: se permite fluir en varias hojas, sin forzar escala.
  if (itemCount > MAX_ITEMS_SINGLE_PAGE) {
    contentEl.style.minHeight = '';
    return;
  }

  const availableHeightPx = PRINTABLE_HEIGHT_MM * MM_TO_PX;
  const safeHeightPx = availableHeightPx * 0.92; // colchón de seguridad del 8%
  const naturalHeight = contentEl.scrollHeight; // alto REAL del contenido, sin relleno

  if (naturalHeight <= 0) {
    contentEl.style.minHeight = '';
    return;
  }

  const rawScale = safeHeightPx / naturalHeight;
  const scale = Math.min(Math.max(rawScale, 0.3), 1);

  const applyScale = (s: number) => {
    if (s < 1) {
      contentEl.style.transform = `scale(${s})`;
      contentEl.style.transformOrigin = 'top left';
      contentEl.style.width = `${100 / s}%`;
      // Clave: el wrapper reclama solo el alto YA escalado, en px reales de
      // layout, para que la paginación del motor de impresión coincida con
      // el tamaño visual reducido.
      wrapperEl.style.height = `${naturalHeight * s}px`;
      wrapperEl.style.overflow = 'hidden';
      contentEl.style.minHeight = '0';
    } else {
      contentEl.style.transform = 'none';
      contentEl.style.width = '100%';
      wrapperEl.style.height = 'auto';
      wrapperEl.style.overflow = 'visible';
      // Cabe sin achicar: restauramos el min-height de página completa para
      // que los spacers (`print:flex-1`) llenen el resto de la hoja.
      contentEl.style.minHeight = '';
    }
  };

  applyScale(scale);

  if (scale < 1) {
    // Segunda pasada de verificación: medimos el alto YA renderizado (con la
    // escala aplicada) y, si por cualquier motivo todavía se pasa del alto
    // disponible, corregimos con un ajuste adicional. Esto evita que
    // observaciones o firmas queden cortadas por un cálculo imperfecto.
    const renderedHeight = contentEl.getBoundingClientRect().height;
    if (renderedHeight > safeHeightPx) {
      const correction = safeHeightPx / renderedHeight;
      const finalScale = Math.max(Math.min(scale * correction, 1), 0.25);
      applyScale(finalScale);
    }
  }
}

interface InvoiceDocumentProps {
  cotizacion: Cotizacion;
  formatCurrency: (amount: number | string) => string;
  formatDate: (dateString: string) => string;
  getExpirationDate: (dateString: string) => string;
}

// Contenido real de la cotización. Se usa DOS veces: una para la vista previa
// dentro del modal, y otra dentro del portal de impresión. Así evitamos
// mantener dos copias del markup por separado.
const InvoiceDocument = forwardRef<HTMLDivElement, InvoiceDocumentProps>(
  function InvoiceDocument({ cotizacion, formatCurrency, formatDate, getExpirationDate }, ref) {
    return (
      <div
        ref={ref}
        className="p-5 sm:p-6 print:p-0 bg-zinc-950 text-zinc-100 print:bg-white print:text-slate-900 space-y-3.5 print:space-y-5 leading-snug print:flex print:flex-col print:min-h-[259.4mm]"
      >
        {/* BANNER ENCABEZADO DE LA EMPRESA */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-4 print:p-6 shadow-md print:bg-slate-900 print:text-white print:border-slate-700">
          <div className="flex flex-row justify-between items-center gap-4 relative z-10">
            {/* Marca & Identidad */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md print:bg-indigo-600 shrink-0">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black tracking-tight text-white leading-none whitespace-nowrap">
                    SegurityMZ <span className="text-indigo-400 print:text-indigo-300">Manager</span>
                  </h1>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 print:bg-indigo-900 print:text-indigo-200 leading-none whitespace-nowrap">
                    OFICIAL
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium mt-1 leading-tight">
                  Seguridad Electrónica, CCTV e Instalaciones Profesionales
                </p>
                <div className="flex flex-wrap gap-x-3 text-[10px] text-slate-400 mt-1 font-mono leading-none">
                  <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3 text-indigo-400 shrink-0" /> RUT:proximamente...</span>
                  <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3 text-indigo-400 shrink-0" /> +57 3232310187</span>
                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3 text-indigo-400 shrink-0" />  giraldojose814@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Folio & Estado Box */}
            <div className="text-right bg-slate-950/70 print:bg-slate-800/90 p-2.5 rounded-lg border border-slate-800 print:border-slate-700 space-y-0.5 min-w-[170px] shrink-0">
              <div className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1 leading-none">
                <Sparkles className="h-2.5 w-2.5 shrink-0" /> COTIZACIÓN COMERCIAL
              </div>
              <div className="text-lg font-mono font-black text-white tracking-wide leading-none">
                #{cotizacion.folio}
              </div>
              <div className="text-[10px] text-slate-300 flex items-center justify-end gap-1 leading-none">
                <Calendar className="h-2.5 w-2.5 text-indigo-400 shrink-0" /> Emisión: <strong className="text-white">{formatDate(cotizacion.fecha)}</strong>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1 leading-none">
                <Clock className="h-2.5 w-2.5 text-amber-400 shrink-0" /> Vence: <strong className="text-slate-200">{getExpirationDate(cotizacion.fecha)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* GRID DE DATOS DEL CLIENTE Y PROYECTO (COMPACTO DE 2 COLUMNAS) */}
        <div className="grid grid-cols-2 gap-3 print:gap-4">
          {/* Tarjeta Cliente */}
          <div className="p-3 print:p-4 rounded-lg bg-zinc-900/80 print:bg-slate-50 border border-zinc-800 print:border-slate-200 shadow-sm relative overflow-hidden min-w-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-700 flex items-center gap-1 mb-1 leading-none">
              <UserCheck className="h-3 w-3 shrink-0" /> EMITIDO PARA (CLIENTE)
            </span>
            <h3 className="text-sm font-bold text-white print:text-slate-900 truncate leading-tight">
              {cotizacion.cliente?.nombre || 'Cliente General'}
            </h3>

            <div className="mt-1 space-y-0.5 text-[11px] text-zinc-300 print:text-slate-700 font-mono">
              {cotizacion.cliente?.identificacion && (
                <p className="flex items-center gap-1 leading-tight min-w-0">
                  <span className="text-zinc-500 print:text-slate-500 font-sans font-medium text-[10px] shrink-0">RUT/ID:</span>
                  <strong className="truncate">{cotizacion.cliente.identificacion}</strong>
                </p>
              )}
              {cotizacion.cliente?.email && (
                <p className="flex items-center gap-1 leading-tight min-w-0">
                  <Mail className="h-2.5 w-2.5 text-zinc-500 print:text-slate-500 shrink-0" />
                  <span className="truncate">{cotizacion.cliente.email}</span>
                </p>
              )}
              {cotizacion.cliente?.telefono && (
                <p className="flex items-center gap-1 leading-tight min-w-0">
                  <Phone className="h-2.5 w-2.5 text-zinc-500 print:text-slate-500 shrink-0" />
                  <span className="truncate">{cotizacion.cliente.telefono}</span>
                </p>
              )}
            </div>
          </div>

          {/* Tarjeta Dirección / Sitio de Instalación */}
          <div className="p-3 print:p-4 rounded-lg bg-zinc-900/80 print:bg-slate-50 border border-zinc-800 print:border-slate-200 shadow-sm relative overflow-hidden min-w-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700 flex items-center gap-1 mb-1 leading-none">
              <MapPin className="h-3 w-3 shrink-0" /> LUGAR DE EJECUCIÓN / PROYECTO
            </span>
            <p className="text-xs font-semibold text-white print:text-slate-900 truncate leading-tight">
              {cotizacion.cliente?.direccion || 'Dirección de cliente no especificada'}
            </p>
            <div className="mt-1 text-[11px] text-zinc-400 print:text-slate-600 space-y-0.5">
              <p className="flex items-center gap-1 leading-tight min-w-0">
                <span className="text-zinc-500 print:text-slate-500 font-medium text-[10px] shrink-0">Proyecto:</span>
                <strong className="text-zinc-200 print:text-slate-800 truncate">Seguridad Electrónica & CCTV</strong>
              </p>
              <p className="flex items-center gap-1 leading-tight min-w-0">
                <span className="text-zinc-500 print:text-slate-500 font-medium text-[10px] shrink-0">Estado:</span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800 leading-none whitespace-nowrap">
                  Aprobado para Instalación
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Spacer flexible #1: reparte parte del vacío aquí, antes de la tabla,
            en vez de concentrar todo el espacio sobrante en un único punto. */}
        <div className="print:flex-1" />

        {/* TABLA DE PRODUCTOS Y SERVICIOS ESTRUCTURADA Y COMPACTA */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-0.5">
            <h4 className="text-[10px] font-bold text-zinc-400 print:text-slate-700 uppercase tracking-wider flex items-center gap-1.5 leading-none">
              <FileText className="h-3 w-3 text-indigo-400 shrink-0" /> Detalle de Productos y Servicios Solicitados
            </h4>
            <span className="text-[10px] text-zinc-500 print:text-slate-500 font-mono leading-none">
              {cotizacion.detalles.length} Ítem(s)
            </span>
          </div>

          <div className="rounded-lg border border-zinc-800 print:border-slate-300 overflow-hidden">
            <table className="w-full table-fixed text-left text-[11px]">
              <colgroup>
                <col className="w-[6%]" />
                <col className="w-[10%]" />
                <col className="w-[42%]" />
                <col className="w-[10%]" />
                <col className="w-[16%]" />
                <col className="w-[16%]" />
              </colgroup>
              <thead className="bg-slate-900 text-slate-200 print:bg-slate-900 print:text-white font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 print:py-3 px-2.5 text-center leading-none">#</th>
                  <th className="py-2.5 print:py-3 px-2.5 leading-none">Tipo</th>
                  <th className="py-2.5 print:py-3 px-2.5 leading-none">Concepto / Descripción Técnica</th>
                  <th className="py-2.5 print:py-3 px-2.5 text-center leading-none">Cant.</th>
                  <th className="py-2.5 print:py-3 px-2.5 text-right leading-none">P. Unitario</th>
                  <th className="py-2.5 print:py-3 px-2.5 text-right leading-none">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 print:divide-slate-200 bg-zinc-950 print:bg-white">
                {cotizacion.detalles.map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <tr
                      key={index}
                      className={`${isEven ? 'bg-zinc-900/30 print:bg-slate-50/70' : 'bg-transparent'} print:break-inside-avoid`}
                    >
                      <td className="py-1.5 print:py-2.5 px-2.5 text-center font-mono text-zinc-500 print:text-slate-500 text-[10px] align-top leading-tight">
                        {index + 1}
                      </td>
                      <td className="py-1.5 print:py-2.5 px-2.5 align-top">
                        {item.tipo === 'PRODUCTO' ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 text-[8px] font-bold rounded bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 print:bg-indigo-100 print:text-indigo-900 leading-none whitespace-nowrap">
                            PROD
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 text-[8px] font-bold rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-900 leading-none whitespace-nowrap">
                            SERV
                          </span>
                        )}
                      </td>
                      <td className="py-1.5 print:py-2.5 px-2.5 align-top">
                        <div className="font-bold text-white print:text-slate-900 text-[11px] leading-tight break-words">
                          {item.nombre}
                        </div>
                        {item.descripcion && (
                          <p className="text-[10px] text-zinc-400 print:text-slate-600 line-clamp-1 leading-tight">
                            {item.descripcion}
                          </p>
                        )}
                      </td>
                      <td className="py-1.5 print:py-2.5 px-2.5 text-center font-mono font-bold text-white print:text-slate-900 text-[11px] align-top leading-tight">
                        {item.cantidad}
                      </td>
                      <td className="py-1.5 print:py-2.5 px-2.5 text-right font-mono text-zinc-300 print:text-slate-800 text-[11px] align-top leading-tight">
                        {formatCurrency(item.precioUnit)}
                      </td>
                      <td className="py-1.5 print:py-2.5 px-2.5 text-right font-mono font-black text-emerald-400 print:text-indigo-950 text-[11px] align-top leading-tight">
                        {formatCurrency(item.subtotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* OBSERVACIONES & CONDICIONES + CAJA RESUMEN DE TOTALES */}
        <div className="grid grid-cols-12 gap-3 items-start">
          {/* Columna Izquierda: Términos y Garantías */}
          <div className="col-span-7 space-y-2 min-w-0">
            <div className="p-2.5 rounded-lg bg-zinc-900/60 print:bg-slate-50 border border-zinc-800 print:border-slate-200 text-[10px] space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-700 block leading-none">
                CONDICIONES Y GARANTÍA TÉCNICA
              </span>

              <ul className="space-y-1 text-zinc-300 print:text-slate-700">
                <li className="flex items-start gap-1 leading-tight">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 print:text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Garantía de Equipos:</strong> 12 meses de garantía directa de fábrica.</span>
                </li>
                <li className="flex items-start gap-1 leading-tight">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 print:text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Validez de Oferta:</strong> 15 días continuos a contar de su emisión.</span>
                </li>
                <li className="flex items-start gap-1 leading-tight">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 print:text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Forma de Pago:</strong> 50% al aprobar la cotización / 50% al entregar.</span>
                </li>
              </ul>

              {cotizacion.observaciones && (
                <div className="pt-1 border-t border-zinc-800 print:border-slate-200">
                  <span className="text-[9px] font-bold text-zinc-400 print:text-slate-600 uppercase block leading-none">
                    Observaciones:
                  </span>
                  <p className="text-[10px] text-zinc-300 print:text-slate-800 italic bg-zinc-950/60 print:bg-white p-1.5 rounded border border-zinc-800/80 print:border-slate-300 line-clamp-2 leading-tight">
                    &quot;{cotizacion.observaciones}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Resumen de Totales */}
          <div className="col-span-5 p-3 rounded-xl bg-zinc-900 print:bg-slate-100 border border-zinc-800 print:border-slate-300 shadow-sm space-y-2 min-w-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 print:text-slate-600 block pb-1 border-b border-zinc-800 print:border-slate-200 leading-none">
              RESUMEN DE COTIZACIÓN
            </span>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between items-center text-zinc-400 print:text-slate-600 font-medium leading-tight gap-2">
                <span>Subtotal Neto:</span>
                <span className="font-mono text-zinc-200 print:text-slate-900 font-semibold whitespace-nowrap">
                  {formatCurrency(cotizacion.subtotal)}
                </span>
              </div>

              {Number(cotizacion.descuento) > 0 && (
                <div className="flex justify-between items-center text-amber-400 print:text-amber-700 font-medium leading-tight gap-2">
                  <span>Descuento Comercial:</span>
                  <span className="font-mono font-semibold whitespace-nowrap">
                    - {formatCurrency(cotizacion.descuento)}
                  </span>
                </div>
              )}
            </div>

            {/* TOTAL DESTACADO */}
            <div className="pt-1 border-t border-zinc-800 print:border-slate-300">
              <div className="p-2.5 rounded-lg bg-gradient-to-r from-indigo-900 to-slate-900 print:bg-slate-900 text-white shadow-sm flex justify-between items-center gap-2">
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-indigo-300 print:text-slate-300 uppercase tracking-wider block leading-none whitespace-nowrap">
                    TOTAL COTIZACIÓN
                  </span>
                  <span className="text-[9px] text-slate-300 leading-none block mt-0.5">Impuestos Incluidos</span>
                </div>
                <div className="text-lg font-mono font-black text-emerald-400 print:text-white leading-none whitespace-nowrap">
                  {formatCurrency(cotizacion.total)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer flexible #2: reparte la otra mitad del vacío aquí, antes de
            la firma. Junto al spacer #1, el espacio sobrante queda distribuido
            en dos puntos en vez de un único hueco gigante. Solo actúa en
            impresión; en pantalla no afecta la vista previa del modal. */}
        <div className="print:flex-1" />

        {/* ÁREA DE FIRMAS Y CONFORMIDAD (LEGAL & PROFESIONAL) */}
        <div className="text-center pt-6 border-t border-zinc-800 print:border-slate-300 grid grid-cols-2 gap-8 print:break-inside-avoid">
          <div className="text-center pt-1 border-t border-dashed border-zinc-700 print:border-slate-400">
            <p className="text-[9px] font-bold text-white print:text-slate-900 uppercase leading-tight">ING. JHARDIHER JOSE GIRALDO MUÑOZ</p>
            <p className="text-[9px] text-zinc-400 print:text-slate-600 leading-tight">Asesor Comercial / Timbre Autorizado</p>
          </div>
        </div>

        {/* PIE DE PÁGINA DEL DOCUMENTO */}
        <div className="text-center pt-1">
          <p className="text-[9px] text-zinc-500 print:text-slate-500 font-mono leading-tight">
            SegurityMZ Manager • Documento Oficial de Cotización • Tamaño Carta
          </p>
        </div>
      </div>
    );
  }
);

export function CotizacionDetailsModal({
  open,
  onOpenChange,
  cotizacion,
}: CotizacionDetailsModalProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const printWrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const itemCount = cotizacion?.detalles?.length ?? 0;
    const handleBeforePrint = () =>
      fitDocumentToOnePage(printWrapperRef.current, printRef.current, itemCount);
    const handleAfterPrint = () => {
      if (printRef.current) {
        printRef.current.style.transform = 'none';
        printRef.current.style.width = '100%';
        printRef.current.style.minHeight = '';
      }
      if (printWrapperRef.current) {
        printWrapperRef.current.style.height = 'auto';
        printWrapperRef.current.style.overflow = 'visible';
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // Firefox no siempre dispara beforeprint de forma confiable; matchMedia es el respaldo.
    const mediaQueryList = window.matchMedia ? window.matchMedia('print') : null;
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) fitDocumentToOnePage(printWrapperRef.current, printRef.current, itemCount);
    };
    mediaQueryList?.addEventListener?.('change', handleMediaChange);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      mediaQueryList?.removeEventListener?.('change', handleMediaChange);
    };
  }, [cotizacion, open]);

  if (!cotizacion) return null;

  const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(Number(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Calcular fecha de vencimiento (15 días desde la fecha de emisión)
  const getExpirationDate = (dateString: string) => {
    const d = new Date(dateString);
    d.setDate(d.getDate() + 15);
    return d.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handlePrintPDF = () => {
    fitDocumentToOnePage(printWrapperRef.current, printRef.current, cotizacion.detalles.length);
    window.print();
  };

  const invoiceProps = { cotizacion, formatCurrency, formatDate, getExpirationDate };

  return (
    <>
      {/* Reglas de impresión GLOBALES:
          1) @page controla el tamaño de hoja (respeta lo que el usuario elija:
             Carta u Oficio) y los márgenes.
          2) La técnica de visibilidad oculta TODO en <body> (incluyendo el overlay
             y el posicionamiento fijo/centrado del modal) excepto nuestro portal
             de impresión, que se coloca en la esquina superior izquierda ocupando
             el 100% del ancho de la hoja. Esto evita que el diseño del modal
             (fixed, transform de centrado, backdrop oscuro) se filtre al PDF. */}
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: ${PAGE_MARGIN_MM}mm;
          }
          html, body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
            height: auto !important;
            overflow: visible !important;
          }
          body * {
            visibility: hidden;
          }
          #quotation-print-area,
          #quotation-print-area * {
            visibility: visible;
          }
          #quotation-print-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            page-break-after: avoid;
          }
        }
      `}</style>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[850px] border-zinc-800 bg-zinc-950 text-zinc-100 max-h-[90vh] overflow-y-auto p-0 print:hidden">
          {/* Header Modal */}
          <DialogHeader className="p-3.5 bg-zinc-900 border-b border-zinc-800 flex flex-row items-center justify-between">
            <DialogTitle className="text-white text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-400" />
              <span>Cotización Comercial #{cotizacion.folio}</span>
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handlePrintPDF}
                className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-md text-xs h-8 px-3 gap-1.5 font-semibold cursor-pointer transition-all"
              >
                <Printer className="h-3.5 w-3.5" />
                Imprimir / Guardar PDF
              </Button>
            </div>
          </DialogHeader>

          {/* Vista previa en pantalla (dentro del modal) */}
          <InvoiceDocument {...invoiceProps} />
        </DialogContent>
      </Dialog>

      {/* Portal de impresión: vive directamente en <body>, fuera del modal.
          Está oculto en pantalla (hidden) y solo se muestra al imprimir.
          El wrapper interno (printWrapperRef) es el que fija el alto REAL de
          layout cuando se achica el contenido, para que el motor de
          paginación respete el tamaño reducido y no genere una segunda hoja
          innecesaria (ver comentario en fitDocumentToOnePage). */}
      {mounted &&
        open &&
        createPortal(
          <div id="quotation-print-area" className="hidden print:block bg-white">
            <div ref={printWrapperRef}>
              <InvoiceDocument ref={printRef} {...invoiceProps} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}