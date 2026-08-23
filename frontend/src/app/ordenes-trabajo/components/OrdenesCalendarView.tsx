import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Wrench, Eye, RefreshCw } from 'lucide-react';
import { OrdenTrabajo } from '@/services/ordenes-trabajo.service';
import { Button } from '@/components/ui/button';

interface OrdenesCalendarViewProps {
  ordenes: OrdenTrabajo[];
  onView: (orden: OrdenTrabajo) => void;
  onChangeEstado: (orden: OrdenTrabajo) => void;
}

export function OrdenesCalendarView({ ordenes, onView, onChangeEstado }: OrdenesCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    // 0 = Dom, 1 = Lun, ... 6 = Sab. Convert to Mon = 0, Sun = 6
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Group ordenes by formatted date string (YYYY-MM-DD)
  const ordenesByDate = ordenes.reduce((acc, orden) => {
    if (orden.fechaProgramada) {
      const d = new Date(orden.fechaProgramada);
      const dateKey = d.toISOString().split('T')[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(orden);
    } else {
      if (!acc['sin-fecha']) acc['sin-fecha'] = [];
      acc['sin-fecha'].push(orden);
    }
    return acc;
  }, {} as Record<string, OrdenTrabajo[]>);

  const renderCells = () => {
    const cells = [];
    // Padding days for previous month
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`pad-${i}`} className="min-h-[110px] bg-zinc-950/30 border border-zinc-800/40 p-1.5 opacity-30"></div>);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayOrdenes = ordenesByDate[dateString] || [];
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === month &&
        new Date().getFullYear() === year;

      cells.push(
        <div
          key={day}
          className={`min-h-[110px] border border-zinc-800 p-2 flex flex-col justify-between transition-colors ${
            isToday ? 'bg-indigo-950/20 border-indigo-500/50' : 'bg-zinc-900/40 hover:bg-zinc-900/80'
          }`}
        >
          <div className="flex items-center justify-between font-mono text-xs mb-1">
            <span
              className={`h-6 w-6 rounded-full flex items-center justify-center font-bold ${
                isToday ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400'
              }`}
            >
              {day}
            </span>
            {dayOrdenes.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                {dayOrdenes.length} OT
              </span>
            )}
          </div>

          <div className="space-y-1.5 overflow-y-auto max-h-[80px] custom-scrollbar">
            {dayOrdenes.map((ot) => (
              <div
                key={ot.id}
                onClick={() => onView(ot)}
                className="p-1.5 rounded bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700/60 text-xs cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between font-mono font-semibold text-indigo-300 group-hover:text-white">
                  <span>{ot.folio}</span>
                  {ot.horaProgramada && (
                    <span className="text-[10px] text-amber-400 font-medium">{ot.horaProgramada}</span>
                  )}
                </div>
                <div className="text-[11px] text-zinc-300 truncate font-medium">{ot.cliente?.nombre}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return cells;
  };

  const sinFecha = ordenesByDate['sin-fecha'] || [];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-xl backdrop-blur-sm">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight font-mono">
              {monthNames[month]} {year}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevMonth} className="h-8 border-zinc-700 bg-zinc-800 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="h-8 border-zinc-700 bg-zinc-800 text-xs font-mono cursor-pointer"
            >
              Hoy
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth} className="h-8 border-zinc-700 bg-zinc-800 cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center font-mono text-xs font-semibold text-zinc-400 mb-2">
          <div>Lun</div>
          <div>Mar</div>
          <div>Mié</div>
          <div>Jue</div>
          <div>Vie</div>
          <div className="text-indigo-400">Sáb</div>
          <div className="text-indigo-400">Dom</div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">{renderCells()}</div>
      </div>

      {/* Pending / Unscheduled Orders Banner */}
      {sinFecha.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-3 font-mono">
            <Clock className="h-4 w-4" /> Órdenes Pendientes de Programar ({sinFecha.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sinFecha.map((ot) => (
              <div
                key={ot.id}
                className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-mono font-bold text-amber-300 text-sm">{ot.folio}</div>
                  <div className="text-xs text-white font-medium">{ot.cliente?.nombre}</div>
                  <div className="text-[11px] text-zinc-400 truncate max-w-[200px]">{ot.direccion || 'Sin dirección'}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => onView(ot)} className="h-8 w-8 text-zinc-300 hover:text-white">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onChangeEstado(ot)} className="h-8 w-8 text-amber-400 hover:text-amber-300">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
