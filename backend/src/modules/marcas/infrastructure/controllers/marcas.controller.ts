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
import { CreateMarcaDto } from '../../application/dtos/create-marca.dto';
import { UpdateMarcaDto } from '../../application/dtos/update-marca.dto';
import { GetMarcasQueryDto } from '../../application/dtos/get-marcas-query.dto';
import { CreateMarcaUseCase } from '../../application/use-cases/create-marca.use-case';
import { GetAllMarcasUseCase } from '../../application/use-cases/get-all-marcas.use-case';
import { GetMarcaByIdUseCase } from '../../application/use-cases/get-marca-by-id.use-case';
import { UpdateMarcaUseCase } from '../../application/use-cases/update-marca.use-case';
import { DeleteMarcaUseCase } from '../../application/use-cases/delete-marca.use-case';
import { RestoreMarcaUseCase } from '../../application/use-cases/restore-marca.use-case';

@ApiTags('Marcas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('marcas')
export class MarcasController {
  constructor(
    private readonly createMarcaUseCase: CreateMarcaUseCase,
    private readonly getAllMarcasUseCase: GetAllMarcasUseCase,
    private readonly getMarcaByIdUseCase: GetMarcaByIdUseCase,
    private readonly updateMarcaUseCase: UpdateMarcaUseCase,
    private readonly deleteMarcaUseCase: DeleteMarcaUseCase,
    private readonly restoreMarcaUseCase: RestoreMarcaUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva marca' })
  @ApiResponse({ status: 21, description: 'Marca creada exitosamente' })
  @ApiResponse({ status: 409, description: 'Ya existe una marca con el mismo nombre' })
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.createMarcaUseCase.execute(createMarcaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener marcas con paginación, filtro y orden' })
  @ApiResponse({ status: 200, description: 'Listado de marcas obtenido' })
  findAll(@Query() query: GetMarcasQueryDto) {
    return this.getAllMarcasUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una marca por su ID' })
  @ApiResponse({ status: 200, description: 'Marca encontrada' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada' })
  findOne(@Param('id') id: string) {
    return this.getMarcaByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una marca por su ID' })
  @ApiResponse({ status: 200, description: 'Marca actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada' })
  @ApiResponse({ status: 409, description: 'Nombre de marca ya en uso' })
  update(@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.updateMarcaUseCase.execute(id, updateMarcaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una marca (Soft Delete)' })
  @ApiResponse({ status: 200, description: 'Marca desactivada y eliminada lógicamente' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada' })
  remove(@Param('id') id: string) {
    return this.deleteMarcaUseCase.execute(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaurar una marca eliminada lógicamente' })
  @ApiResponse({ status: 200, description: 'Marca restaurada exitosamente' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada' })
  @ApiResponse({ status: 409, description: 'La marca ya está activa o conflicto de nombre' })
  restore(@Param('id') id: string) {
    return this.restoreMarcaUseCase.execute(id);
  }
}
