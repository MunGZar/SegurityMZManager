import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layers, Loader2 } from 'lucide-react';
import { Categoria } from '@/services/categorias.service';
import { categoriaSchema, CategoriaFormValues } from '../schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface CategoriaFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CategoriaFormValues) => Promise<boolean>;
  initialData?: Categoria | null;
}

export function CategoriaFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: CategoriaFormModalProps) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoriaFormValues>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      activo: true,
    },
  });

  const activo = watch('activo');

  useEffect(() => {
    if (initialData) {
      reset({
        nombre: initialData.nombre,
        descripcion: initialData.descripcion || '',
        activo: initialData.activo,
      });
    } else {
      reset({
        nombre: '',
        descripcion: '',
        activo: true,
      });
    }
  }, [initialData, reset, open]);

  const onFormSubmit: SubmitHandler<CategoriaFormValues> = async (values) => {
    const success = await onSubmit(values);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-zinc-800 bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500" />
            {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isEditing
              ? 'Modifica los datos de la categoría existente.'
              : 'Ingresa los datos para registrar una nueva categoría de productos o servicios.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-2">
          {/* Nombre */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Nombre de la Categoría <span className="text-red-400">*</span>
            </label>
            <Input
              {...register('nombre')}
              placeholder="Ej. Cámaras, DVR, Discos Duros, Mano de obra"
              className="border-zinc-800 bg-zinc-950/60 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {errors.nombre && (
              <p className="text-xs text-red-400 mt-1">{errors.nombre.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Descripción
            </label>
            <Textarea
              {...register('descripcion')}
              rows={3}
              placeholder="Detalles o alcance del tipo de producto/servicio..."
              className="border-zinc-800 bg-zinc-950/60 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
            />
            {errors.descripcion && (
              <p className="text-xs text-red-400 mt-1">{errors.descripcion.message}</p>
            )}
          </div>

          {/* Estado Activo */}
          <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/40 border border-zinc-800/60 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-zinc-200">Categoría Activa</p>
              <p className="text-xs text-zinc-500">Determina si la categoría está disponible para asignación</p>
            </div>
            <input
              type="checkbox"
              checked={activo}
              onChange={(e) => setValue('activo', e.target.checked)}
              className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-900"
            />
          </label>

          <DialogFooter className="pt-4 border-t border-zinc-800">
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
              className="bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : isEditing ? (
                'Actualizar Categoría'
              ) : (
                'Guardar Categoría'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
