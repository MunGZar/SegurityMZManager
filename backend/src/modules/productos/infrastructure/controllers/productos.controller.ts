import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateProductoDto } from '../../application/dtos/create-producto.dto';
import { UpdateProductoDto } from '../../application/dtos/update-producto.dto';
import { GetProductosQueryDto } from '../../application/dtos/get-productos-query.dto';
import { CreateProductoUseCase } from '../../application/use-cases/create-producto.use-case';
import { GetAllProductosUseCase } from '../../application/use-cases/get-all-productos.use-case';
import { GetProductoByIdUseCase } from '../../application/use-cases/get-producto-by-id.use-case';
import { UpdateProductoUseCase } from '../../application/use-cases/update-producto.use-case';
import { DeleteProductoUseCase } from '../../application/use-cases/delete-producto.use-case';
import { RestoreProductoUseCase } from '../../application/use-cases/restore-producto.use-case';

@ApiTags('Productos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('productos')
export class ProductosController {
  constructor(
    private readonly createProductoUseCase: CreateProductoUseCase,
    private readonly getAllProductosUseCase: GetAllProductosUseCase,
    private readonly getProductoByIdUseCase: GetProductoByIdUseCase,
    private readonly updateProductoUseCase: UpdateProductoUseCase,
    private readonly deleteProductoUseCase: DeleteProductoUseCase,
    private readonly restoreProductoUseCase: RestoreProductoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos o importes inválidos' })
  @ApiResponse({ status: 409, description: 'Código interno o combinación (nombre, marca, modelo) duplicado' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.createProductoUseCase.execute(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener productos con paginación, filtros y orden' })
  @ApiResponse({ status: 200, description: 'Listado de productos obtenido' })
  findAll(@Query() query: GetProductosQueryDto) {
    return this.getAllProductosUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID con sus relaciones' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.getProductoByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 409, description: 'Código o combinación duplicado' })
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.updateProductoUseCase.execute(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto (Soft Delete)' })
  @ApiResponse({ status: 200, description: 'Producto desactivado y eliminado lógicamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id') id: string) {
    return this.deleteProductoUseCase.execute(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaurar un producto eliminado lógicamente' })
  @ApiResponse({ status: 200, description: 'Producto restaurado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 409, description: 'El producto ya está activo o conflicto de código' })
  restore(@Param('id') id: string) {
    return this.restoreProductoUseCase.execute(id);
  }
}
