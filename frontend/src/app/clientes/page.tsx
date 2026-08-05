'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Edit, 
  Trash2, 
  Eye, 
  Info, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { clientesService, Cliente } from '@/services/clientes.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Modales
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Estados de cliente seleccionado
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    direccion: '',
    notas: '',
  });

  const loadClientes = async (term = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientesService.getAll(term);
      setClientes(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadClientes(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleOpenCreate = () => {
    setFormMode('create');
    setFormData({
      nombre: '',
      identificacion: '',
      telefono: '',
      email: '',
      direccion: '',
      notas: '',
    });
    setError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cliente: Cliente) => {
    setFormMode('edit');
    setSelectedCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      identificacion: cliente.identificacion || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      direccion: cliente.direccion || '',
      notas: cliente.notas || '',
    });
    setError(null);
    setIsFormOpen(true);
  };

  const handleOpenDetails = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsDetailsOpen(true);
  };

  const handleOpenDelete = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setError(null);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Valida nombre
    if (!formData.nombre.trim()) {
      setError('El nombre del cliente es obligatorio');
      return;
    }

    try {
      const payload = {
        nombre: formData.nombre.trim(),
        identificacion: formData.identificacion.trim() || undefined,
        telefono: formData.telefono.trim() || undefined,
        email: formData.email.trim() || undefined,
        direccion: formData.direccion.trim() || undefined,
        notas: formData.notas.trim() || undefined,
      };

      if (formMode === 'create') {
        await clientesService.create(payload);
      } else if (formMode === 'edit' && selectedCliente) {
        await clientesService.update(selectedCliente.id, payload);
      }

      setIsFormOpen(false);
      loadClientes(search);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al guardar el cliente');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCliente) return;
    setError(null);
    try {
      await clientesService.delete(selectedCliente.id);
      setIsDeleteOpen(false);
      loadClientes(search);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el cliente');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Users className="h-8 w-8 text-indigo-500" />
            Clientes
          </h1>
          <p className="text-sm text-zinc-400">
            Administra la cartera de clientes de venta e instalación.
          </p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 gap-2 h-10 px-4 rounded-lg cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Main Card container */}
      <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg text-white">Listado de Clientes</CardTitle>
              <CardDescription className="text-zinc-500">Búsqueda rápida en tiempo real.</CardDescription>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full max-w-sm">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Buscar por nombre, identificación, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-200 placeholder-zinc-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-lg h-9 w-full"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-0 sm:px-6">
          {error && !isFormOpen && !isDeleteOpen && (
            <div className="mx-6 mb-4 p-4 rounded-lg bg-red-950/20 border border-red-500/20 text-red-400 text-sm flex gap-2 items-center">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-zinc-500">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
              <p className="text-sm font-medium">Cargando clientes...</p>
            </div>
          ) : clientes.length === 0 ? (
            <div className="py-20 text-center text-zinc-500">
              <Users className="h-12 w-12 mx-auto stroke-1 mb-3 text-zinc-600" />
              <p className="text-base font-semibold text-zinc-400">No se encontraron clientes</p>
              <p className="text-xs text-zinc-500 mt-1">Prueba con otra búsqueda o agrega un nuevo cliente.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-zinc-950/50 border-b border-zinc-800">
                  <TableRow className="border-b border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 font-semibold h-11 px-4">Nombre</TableHead>
                    <TableHead className="text-zinc-400 font-semibold h-11 px-4">Identificación</TableHead>
                    <TableHead className="text-zinc-400 font-semibold h-11 px-4">Teléfono</TableHead>
                    <TableHead className="text-zinc-400 font-semibold h-11 px-4">Email</TableHead>
                    <TableHead className="text-zinc-400 font-semibold h-11 px-4 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientes.map((cliente) => (
                    <TableRow key={cliente.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/10 transition-colors">
                      <TableCell className="font-medium text-white px-4 py-3.5">{cliente.nombre}</TableCell>
                      <TableCell className="text-zinc-300 px-4 py-3.5">{cliente.identificacion || '—'}</TableCell>
                      <TableCell className="text-zinc-300 px-4 py-3.5">{cliente.telefono || '—'}</TableCell>
                      <TableCell className="text-zinc-300 px-4 py-3.5">{cliente.email || '—'}</TableCell>
                      <TableCell className="px-4 py-3.5 text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleOpenDetails(cliente)}
                            className="h-8 w-8 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
                            title="Ver detalles"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleOpenEdit(cliente)}
                            className="h-8 w-8 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleOpenDelete(cliente)}
                            className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* modal Form (Crear / Editar) */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] border-zinc-800 bg-zinc-900 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {formMode === 'create' ? 'Agregar Nuevo Cliente' : 'Editar Cliente'}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Completa los datos del cliente a continuación.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 text-red-400 text-xs flex gap-2 items-center">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="nombre" className="text-zinc-300">Nombre Completo *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. Juan Pérez"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="identificacion" className="text-zinc-300">Identificación (RFC/RFC/DNI)</Label>
                <Input
                  id="identificacion"
                  value={formData.identificacion}
                  onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
                  placeholder="Ej. PEJ800101"
                  className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="telefono" className="text-zinc-300">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="Ej. +52 5512345678"
                  className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-zinc-300">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ejemplo@correo.com"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="direccion" className="text-zinc-300">Dirección</Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                placeholder="Calle, Número, Colonia, Ciudad"
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="notas" className="text-zinc-300">Notas u Observaciones</Label>
              <Textarea
                id="notas"
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                placeholder="Información adicional (horarios de atención, requerimientos especiales...)"
                rows={3}
                className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 resize-none"
              />
            </div>

            <DialogFooter className="pt-4 border-t border-zinc-800 gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsFormOpen(false)}
                className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/10 cursor-pointer"
              >
                Guardar Cliente
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* modal Detalles */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[550px] border-zinc-800 bg-zinc-900 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center gap-2">
              <Info className="h-5 w-5 text-indigo-500" />
              Detalles del Cliente
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Ficha de información completa del cliente.
            </DialogDescription>
          </DialogHeader>

          {selectedCliente && (
            <div className="space-y-6 py-4">
              <div className="flex gap-4 items-start p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-lg uppercase shrink-0">
                  {selectedCliente.nombre.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-lg font-bold text-white leading-tight truncate">{selectedCliente.nombre}</h3>
                  <p className="text-xs text-zinc-500 mt-1">ID: {selectedCliente.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Identificación</span>
                  <p className="text-sm text-zinc-200 font-medium">{selectedCliente.identificacion || 'No registrado'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Teléfono</span>
                  <p className="text-sm text-zinc-200 font-medium flex items-center gap-1">
                    <Phone className="h-3 w-3 text-zinc-500" />
                    {selectedCliente.telefono || 'No registrado'}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Correo Electrónico</span>
                  <p className="text-sm text-zinc-200 font-medium flex items-center gap-1 truncate">
                    <Mail className="h-3 w-3 text-zinc-500" />
                    {selectedCliente.email || 'No registrado'}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Registrado El</span>
                  <p className="text-sm text-zinc-200 font-medium">
                    {new Date(selectedCliente.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-1 border-t border-zinc-800/60 pt-4">
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Dirección Física
                </span>
                <p className="text-sm text-zinc-200 font-medium leading-relaxed">
                  {selectedCliente.direccion || 'Sin dirección registrada'}
                </p>
              </div>

              <div className="space-y-1 border-t border-zinc-800/60 pt-4">
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1 flex-wrap">
                  <FileText className="h-3 w-3" />
                  Notas Internas
                </span>
                <p className="text-sm text-zinc-300 font-medium bg-zinc-950/40 border border-zinc-800/40 p-3 rounded-lg whitespace-pre-wrap leading-relaxed">
                  {selectedCliente.notas || 'Sin anotaciones adicionales.'}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2 border-t border-zinc-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsDetailsOpen(false)}
              className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 w-full sm:w-auto cursor-pointer"
            >
              Cerrar Ficha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* modal Eliminar */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px] border-zinc-800 bg-zinc-900 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              ¿Confirmas la eliminación?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 mt-2">
              Esta acción no se puede deshacer. El cliente se eliminará de forma permanente.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 text-red-400 text-xs flex gap-2 items-center">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="py-2">
            <p className="text-sm text-zinc-300">
              Cliente: <span className="font-bold text-white">{selectedCliente?.nombre}</span>
            </p>
          </div>

          <DialogFooter className="pt-4 border-t border-zinc-800 gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsDeleteOpen(false)}
              className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/10 cursor-pointer"
            >
              Eliminar Permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
