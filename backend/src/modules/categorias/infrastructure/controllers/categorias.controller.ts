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
import { CreateCategoriaDto } from '../../application/dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../../application/dtos/update-categoria.dto';
import { GetCategoriasQueryDto } from '../../application/dtos/get-categorias-query.dto';
import { CreateCategoriaUseCase } from '../../application/use-cases/create-categoria.use-case';
import { GetAllCategoriasUseCase } from '../../application/use-cases/get-all-categorias.use-case';
import { GetCategoriaByIdUseCase } from '../../application/use-cases/get-categoria-by-id.use-case';
import { UpdateCategoriaUseCase } from '../../application/use-cases/update-categoria.use-case';
import { DeleteCategoriaUseCase } from '../../application/use-cases/delete-categoria.use-case';
import { RestoreCategoriaUseCase } from '../../application/use-cases/restore-categoria.use-case';

@ApiTags('Categorías')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categorias')
export class CategoriasController {
  constructor(
    private readonly createCategoriaUseCase: CreateCategoriaUseCase,
    private readonly getAllCategoriasUseCase: GetAllCategoriasUseCase,
    private readonly getCategoriaByIdUseCase: GetCategoriaByIdUseCase,
    private readonly updateCategoriaUseCase: UpdateCategoriaUseCase,
    private readonly deleteCategoriaUseCase: DeleteCategoriaUseCase,
    private readonly restoreCategoriaUseCase: RestoreCategoriaUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  @ApiResponse({ status: 409, description: 'Ya existe una categoría con el mismo nombre' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.createCategoriaUseCase.execute(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener categorías con paginación, filtro y orden' })
  @ApiResponse({ status: 200, description: 'Listado de categorías obtenido' })
  findAll(@Query() query: GetCategoriasQueryDto) {
    return this.getAllCategoriasUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por su ID' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findOne(@Param('id') id: string) {
    return this.getCategoriaByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por su ID' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 409, description: 'Nombre de categoría ya en uso' })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.updateCategoriaUseCase.execute(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría (Soft Delete)' })
  @ApiResponse({ status: 200, description: 'Categoría desactivada y eliminada lógicamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  remove(@Param('id') id: string) {
    return this.deleteCategoriaUseCase.execute(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaurar una categoría eliminada lógicamente' })
  @ApiResponse({ status: 200, description: 'Categoría restaurada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 409, description: 'La categoría ya está activa o conflicto de nombre' })
  restore(@Param('id') id: string) {
    return this.restoreCategoriaUseCase.execute(id);
  }
}
