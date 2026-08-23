import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { productosService, Producto, CreateProductoInput, UpdateProductoInput } from '@/services/productos.service';
import { marcasService, Marca } from '@/services/marcas.service';
import { categoriasService, Categoria } from '@/services/categorias.service';
import { proveedoresService, Proveedor } from '@/services/proveedores.service';
import { useTableState } from '@/hooks/useTableState';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedMarcaId, setSelectedMarcaId] = useState<string>('');
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<string>('');
  const [selectedProveedorId, setSelectedProveedorId] = useState<string>('');

  // Catalog dropdown options
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
  } = useTableState({ initialSortBy: 'nombre' });

  // Load dropdown options for form and filter selectors
  useEffect(() => {
    async function loadCatalogOptions() {
      try {
        const [marcasRes, categoriasRes, proveedoresRes] = await Promise.all([
          marcasService.getAll({ limit: 100, includeDeleted: false }),
          categoriasService.getAll({ limit: 100, includeDeleted: false }),
          proveedoresService.getAll({ limit: 100, includeDeleted: false }),
        ]);
        setMarcas(marcasRes.data);
        setCategorias(categoriasRes.data);
        setProveedores(proveedoresRes.data);
      } catch (err) {
        console.error('Error al cargar catálogos auxiliares', err);
      }
    }
    loadCatalogOptions();
  }, []);

  const loadProductos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productosService.getAll({
        search: search.trim() || undefined,
        marcaId: selectedMarcaId || undefined,
        categoriaId: selectedCategoriaId || undefined,
        proveedorId: selectedProveedorId || undefined,
        page,
        limit,
        sortBy,
        sortOrder,
        includeDeleted,
      });
      setProductos(response.data);
      setTotal(response.total);
    } catch (err: any) {
      toast.error(err.message || 'Error al cargar el catálogo de productos');
    } finally {
      setLoading(false);
    }
  }, [search, selectedMarcaId, selectedCategoriaId, selectedProveedorId, page, limit, sortBy, sortOrder, includeDeleted]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1);
      loadProductos();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, selectedMarcaId, selectedCategoriaId, selectedProveedorId, includeDeleted, sortBy, sortOrder, limit]);

  useEffect(() => {
    loadProductos();
  }, [page]);

  const handleCreate = async (data: CreateProductoInput) => {
    try {
      await productosService.create(data);
      toast.success('Producto registrado correctamente');
      loadProductos();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al registrar el producto');
      return false;
    }
  };

  const handleUpdate = async (id: string, data: UpdateProductoInput) => {
    try {
      await productosService.update(id, data);
      toast.success('Producto actualizado correctamente');
      loadProductos();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al actualizar el producto');
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productosService.delete(id);
      toast.success('Producto desactivado (soft delete) correctamente');
      loadProductos();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al eliminar el producto');
      return false;
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await productosService.restore(id);
      toast.success('Producto restaurado correctamente');
      loadProductos();
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error al restaurar el producto');
      return false;
    }
  };

  return {
    productos,
    total,
    loading,
    search,
    setSearch,
    selectedMarcaId,
    setSelectedMarcaId,
    selectedCategoriaId,
    setSelectedCategoriaId,
    selectedProveedorId,
    setSelectedProveedorId,
    marcas,
    categorias,
    proveedores,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    includeDeleted,
    setIncludeDeleted,
    toggleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
    refresh: loadProductos,
  };
}
