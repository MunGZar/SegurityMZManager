import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { Cliente, CreateClienteInput } from '@/services/clientes.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { clienteFormSchema, ClienteFormData } from '../schemas';

interface ClienteFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente: Cliente | null;
  mode: 'create' | 'edit';
  onSubmit: (data: CreateClienteInput) => Promise<boolean>;
}

export function ClienteFormModal({
  open,
  onOpenChange,
  cliente,
  mode,
  onSubmit,
}: ClienteFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      nombre: '',
      identificacion: '',
      telefono: '',
      email: '',
      direccion: '',
      notas: '',
      status: 'PROSPECTO',
    },
  });

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && cliente) {
        reset({
          nombre: cliente.nombre,
          identificacion: cliente.identificacion || '',
          telefono: cliente.telefono || '',
          email: cliente.email || '',
          direccion: cliente.direccion || '',
          notas: cliente.notas || '',
          status: cliente.status,
        });
      } else {
        reset({
          nombre: '',
          identificacion: '',
          telefono: '',
          email: '',
          direccion: '',
          notas: '',
          status: 'PROSPECTO',
        });
      }
    }
  }, [open, mode, cliente, reset]);

  const onFormSubmit = async (data: ClienteFormData) => {
    const payload: CreateClienteInput = {
      nombre: data.nombre.trim(),
      identificacion: data.identificacion?.trim() || undefined,
      telefono: data.telefono?.trim() || undefined,
      email: data.email?.trim() || undefined,
      direccion: data.direccion?.trim() || undefined,
      notas: data.notas?.trim() || undefined,
      status: data.status,
    };
    
    const success = await onSubmit(payload);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-zinc-800 bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            {mode === 'create' ? 'Agregar Nuevo Cliente' : 'Editar Cliente'}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Completa los datos del cliente a continuación. Los campos con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-2">
          {/* Nombre */}
          <div className="space-y-1">
            <Label htmlFor="nombre" className="text-zinc-300">Nombre Completo *</Label>
            <Input
              id="nombre"
              placeholder="Ej. Juan Pérez"
              className={`bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 ${
                errors.nombre ? 'border-red-500/60 focus-visible:ring-red-500' : ''
              }`}
              {...register('nombre')}
            />
            {errors.nombre && (
              <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Identificacion */}
            <div className="space-y-1">
              <Label htmlFor="identificacion" className="text-zinc-300">Identificación (RFC/DNI)</Label>
              <Input
                id="identificacion"
                placeholder="Ej. PEJ800101"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
                {...register('identificacion')}
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-1">
              <Label htmlFor="telefono" className="text-zinc-300">Teléfono</Label>
              <Input
                id="telefono"
                placeholder="Ej. +52 5512345678"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
                {...register('telefono')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Correo Electrónico */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-zinc-300">Correo Electrónico</Label>
              <Input
                id="email"
                type="text"
                placeholder="ejemplo@correo.com"
                className={`bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 ${
                  errors.email ? 'border-red-500/60 focus-visible:ring-red-500' : ''
                }`}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Estado */}
            <div className="space-y-1">
              <Label htmlFor="status" className="text-zinc-300">Estado *</Label>
              <select
                id="status"
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('status')}
              >
                <option value="PROSPECTO">Prospecto</option>
                <option value="ACTIVO">Cliente Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
              {errors.status && (
                <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-1">
            <Label htmlFor="direccion" className="text-zinc-300">Dirección</Label>
            <Input
              id="direccion"
              placeholder="Calle, Número, Colonia, Ciudad"
              className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
              {...register('direccion')}
            />
          </div>

          {/* Notas */}
          <div className="space-y-1">
            <Label htmlFor="notas" className="text-zinc-300">Notas u Observaciones</Label>
            <Textarea
              id="notas"
              placeholder="Información adicional..."
              rows={3}
              className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 resize-none"
              {...register('notas')}
            />
          </div>

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
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/10 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cliente'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
