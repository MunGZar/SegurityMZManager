import Link from 'next/link';
import { Users, Truck, Package, Wrench, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          SegurityMZ Manager
        </h1>
        <p className="text-zinc-400 max-w-xl">
          Panel de administración centralizado para tu negocio de venta e instalación de cámaras de seguridad.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Clientes Registrados', value: '14', desc: 'Gestionados en el sistema', icon: Users, color: 'text-indigo-400' },
          { label: 'Productos en Catálogo', value: '45', desc: 'Cámaras, DVRs y accesorios', icon: Package, color: 'text-emerald-400' },
          { label: 'Instalaciones Pendientes', value: '3', desc: 'Programadas para esta semana', icon: Wrench, color: 'text-amber-400' },
          { label: 'Proveedores Activos', value: '6', desc: 'Socios comerciales', icon: Truck, color: 'text-sky-400' },
        ].map((stat, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md hover:border-zinc-700/80 transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-zinc-400 mt-4">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Call to Action Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-gradient-to-r from-indigo-950/20 to-zinc-900/40 p-8 backdrop-blur-md flex flex-col justify-between gap-6 hover:border-zinc-700/80 transition-all duration-200">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 inline-block">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Administración de Clientes</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Registra nuevos clientes, visualiza su información de contacto, direcciones físicas y realiza un seguimiento detallado de cotizaciones e instalaciones activas.
            </p>
          </div>
          <Link
            href="/clientes"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/30 transition-all duration-200 self-start"
          >
            Acceder a Clientes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-gradient-to-r from-emerald-950/20 to-zinc-900/40 p-8 backdrop-blur-md flex flex-col justify-between gap-6 hover:border-zinc-700/80 transition-all duration-200">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 inline-block">
              <Package className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Catálogo de Productos</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Controla tu inventario. Administra marcas, categorías y mantén actualizados los precios de costo, venta y niveles de stock mínimos para alertas de reabastecimiento.
            </p>
          </div>
          <button
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-500 cursor-not-allowed border border-zinc-700/50 self-start"
          >
            Próximamente
          </button>
        </div>
      </div>

      {/* Security alert message banner */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-4 flex gap-3 items-center">
        <div className="p-2 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-400">
          <Shield className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-300">Entorno Privado y Seguro</p>
          <p className="text-[10px] text-zinc-500">Esta aplicación se ejecuta localmente y no expone datos al exterior.</p>
        </div>
      </div>
    </div>
  );
}
