import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface DeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  itemName?: string;
  itemLabel?: string;
  onConfirm: () => Promise<boolean>;
}

export function DeleteConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  itemName,
  itemLabel = 'Registro',
  onConfirm,
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const success = await onConfirm();
    setLoading(false);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] border-zinc-800 bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-white text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        {itemName && (
          <div className="py-2.5 px-3 rounded bg-zinc-950/40 border border-zinc-800/80 my-2">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{itemLabel}</p>
            <p className="text-sm font-bold text-white mt-0.5">{itemName}</p>
          </div>
        )}

        <DialogFooter className="pt-4 border-t border-zinc-800 gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/10 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Eliminando...' : 'Confirmar Eliminación'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
