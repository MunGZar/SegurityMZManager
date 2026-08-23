import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-md", "max-w-2xl", "max-w-4xl"
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${maxWidth} border-zinc-800 bg-zinc-900 text-zinc-100 max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className="text-white text-lg flex items-center gap-2 border-b border-zinc-800 pb-3">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-2">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
