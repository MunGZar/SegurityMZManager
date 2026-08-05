'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Truck,
  Bookmark,
  Folder,
  Package,
  FileText,
  ShoppingBag,
  Wrench,
  DollarSign,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clientes', href: '/clientes', icon: Users },
  { name: 'Proveedores', href: '/proveedores', icon: Truck },
  { name: 'Marcas', href: '/marcas', icon: Bookmark },
  { name: 'Categorías', href: '/categorias', icon: Folder },
  { name: 'Productos', href: '/productos', icon: Package },
  { name: 'Cotizaciones', href: '/cotizaciones', icon: FileText },
  { name: 'Compras', href: '/compras', icon: ShoppingBag },
  { name: 'Instalaciones', href: '/instalaciones', icon: Wrench },
  { name: 'Finanzas', href: '/finanzas', icon: DollarSign },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-zinc-800 bg-zinc-950 text-zinc-100">
      <div className="flex h-16 items-center px-6 gap-2 border-b border-zinc-900">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/30">
          <Wrench className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-sm leading-tight text-white tracking-wide">SegurityMZ</h1>
          <p className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">Manager</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.2)]" 
                  : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
              )} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-900 bg-zinc-950/50 space-y-3">
        <div className="flex items-center gap-3 rounded-lg p-2 bg-zinc-900/30 border border-zinc-900/60">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 text-xs">
            {user?.nombre?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-semibold text-zinc-200 truncate">{user?.nombre || 'Administrador'}</p>
            <p className="text-[10px] text-zinc-500 truncate">{user?.email || 'admin@seguritymz.com'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 active:bg-red-500/20 transition-all duration-200"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
