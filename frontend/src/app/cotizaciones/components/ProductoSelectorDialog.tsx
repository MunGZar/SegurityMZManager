import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package, Plus } from 'lucide-react';
import { Producto } from '@/services/productos.service';

interface ProductoSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productos: Producto[];
  onSelectProducto: (producto: Producto) => void;
}

export function ProductoSelectorDialog({
  open,
  onOpenChange,
  productos,
  onSelectProducto,
}: ProductoSelectorDialogProps) {
  const [search, setSearch] = useState('');

  const filtered = productos.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(query) ||
      p.codigoInterno.toLowerCase().includes(query) ||
      (p.modelo && p.modelo.toLowerCase().includes(query)) ||
      (p.marca && p.marca.nombre.toLowerCase().includes(query))
    );
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-zinc-800 bg-zinc-900 text-zinc-100 max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-white text-base flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Package className="h-5 w-5 text-indigo-400" />
            Catálogo de Productos - Seleccionar Ítem
          </DialogTitle>
        </DialogHeader>

        <div className="relative py-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código (SKU), nombre o modelo..."
            className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-200 placeholder:text-zinc-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 my-2">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-sm">
              No se encontraron productos que coincidan con &quot;{search}&quot;.
            </div>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-indigo-500/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {prod.imagenUrl ? (
                    <img
                      src={prod.imagenUrl}
                      alt={prod.nombre}
                      className="h-10 w-10 rounded-md object-cover border border-zinc-800 bg-zinc-900"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                      <Package className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-500/20 font-semibold">
                        SKU: {prod.codigoInterno}
                      </span>
                      {prod.marca && (
                        <span className="text-[11px] text-zinc-400 font-medium">
                          {prod.marca.nombre}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-white mt-0.5 leading-tight">{prod.nombre}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 block">P. Venta</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {formatCurrency(Number(prod.precioVenta))}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => {
                      onSelectProducto(prod);
                      onOpenChange(false);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white h-8 px-3 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Agregar
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
