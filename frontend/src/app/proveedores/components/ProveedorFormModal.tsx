import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { Proveedor, CreateProveedorInput } from '@/services/proveedores.service';
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
import { proveedorFormSchema, ProveedorFormData } from '../schemas';

interface ProveedorFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proveedor: Proveedor | null;
  mode: 'create' | 'edit';
  onSubmit: (data: CreateProveedorInput) => Promise<boolean>;
}

export function ProveedorFormModal({
  open,
  onOpenChange,
  proveedor,
  mode,
  onSubmit,
}: ProveedorFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProveedorFormData>({
    resolver: zodResolver(proveedorFormSchema),
    defaultValues: {
      nombre: '',
      contacto: '',
      telefono: '',
      whatsapp: '',
      correo: '',
      ciudad: '',
      direccion: '',
      observaciones: '',
      activo: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && proveedor) {
        reset({
          nombre: proveedor.nombre,
          contacto: proveedor.contacto || '',
          telefono: proveedor.telefono || '',
          whatsapp: proveedor.whatsapp || '',
          correo: proveedor.correo || '',
          ciudad: proveedor.ciudad || '',
          direccion: proveedor.direccion || '',
          observaciones: proveedor.observaciones || '',
          activo: proveedor.activo,
        });
      } else {
        reset({
          nombre: '',
          contacto: '',
          telefono: '',
          whatsapp: '',
          correo: '',
          ciudad: '',
          direccion: '',
          observaciones: '',
          activo: true,
        });
      }
    }
  }, [open, mode, proveedor, reset]);

  const onFormSubmit = async (data: ProveedorFormData) => {
    const payload: CreateProveedorInput = {
      nombre: data.nombre.trim(),
      contacto: data.contacto?.trim() || undefined,
      telefono: data.telefono?.trim() || undefined,
      whatsapp: data.whatsapp?.trim() || undefined,
      correo: data.correo?.trim() || undefined,
      ciudad: data.ciudad?.trim() || undefined,
      direccion: data.direccion?.trim() || undefined,
      observaciones: data.observaciones?.trim() || undefined,
      activo: data.activo,
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
            {mode === 'create' ? 'Agregar Nuevo Proveedor' : 'Editar Proveedor'}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Completa los datos del proveedor. Los campos con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-2">
          {/* Nombre */}
          <div className="space-y-1">
            <Label htmlFor="nombre" className="text-zinc-300">Nombre del Proveedor *</Label>
            <Input
              id="nombre"
              placeholder="Ej. Syscom México"
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
            {/* Contacto */}
            <div className="space-y-1">
              <Label htmlFor="contacto" className="text-zinc-300">Nombre del Contacto</Label>
              <Input
                id="contacto"
                placeholder="Ej. Ing. Alejandro Ruiz"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
                {...register('contacto')}
              />
            </div>

            {/* Correo */}
            <div className="space-y-1">
              <Label htmlFor="correo" className="text-zinc-300">Correo Electrónico</Label>
              <Input
                id="correo"
                type="text"
                placeholder="ventas@syscom.mx"
                className={`bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 ${
                  errors.correo ? 'border-red-500/60 focus-visible:ring-red-500' : ''
                }`}
                {...register('correo')}
              />
              {errors.correo && (
                <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.correo.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Teléfono */}
            <div className="space-y-1">
              <Label htmlFor="telefono" className="text-zinc-300">Teléfono</Label>
              <Input
                id="telefono"
                placeholder="+52 5543210987"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
                {...register('telefono')}
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-1">
              <Label htmlFor="whatsapp" className="text-zinc-300">WhatsApp</Label>
              <Input
                id="whatsapp"
                placeholder="+52 5598765432"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
                {...register('whatsapp')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Ciudad */}
            <div className="space-y-1">
              <Label htmlFor="ciudad" className="text-zinc-300">Ciudad</Label>
              <Input
                id="ciudad"
                placeholder="Ej. Chihuahua"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
                {...register('ciudad')}
              />
            </div>

            {/* Estado Activo */}
            <div className="space-y-1">
              <Label htmlFor="activo" className="text-zinc-300">Estado del Proveedor</Label>
              <select
                id="activo"
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('activo', { setValueAs: (v) => v === 'true' || v === true })}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-1">
            <Label htmlFor="direccion" className="text-zinc-300">Dirección Física</Label>
            <Input
              id="direccion"
              placeholder="Calle, Número, Colonia, C.P."
              className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
              {...register('direccion')}
            />
          </div>

          {/* Observaciones */}
          <div className="space-y-1">
            <Label htmlFor="observaciones" className="text-zinc-300">Observaciones</Label>
            <Textarea
              id="observaciones"
              placeholder="Información adicional sobre marcas o garantías..."
              rows={3}
              className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 resize-none"
              {...register('observaciones')}
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
              {isSubmitting ? 'Guardando...' : 'Guardar Proveedor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
