import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateCotizacionUseCase } from '../application/use-cases/create-cotizacion.use-case';
import { GetAllCotizacionesUseCase } from '../application/use-cases/get-all-cotizaciones.use-case';
import { GetCotizacionByIdUseCase } from '../application/use-cases/get-cotizacion-by-id.use-case';
import { UpdateCotizacionUseCase } from '../application/use-cases/update-cotizacion.use-case';
import { ChangeEstadoCotizacionUseCase } from '../application/use-cases/change-estado-cotizacion.use-case';
import { DuplicateCotizacionUseCase } from '../application/use-cases/duplicate-cotizacion.use-case';
import { DeleteCotizacionUseCase } from '../application/use-cases/delete-cotizacion.use-case';
import { RestoreCotizacionUseCase } from '../application/use-cases/restore-cotizacion.use-case';

import { CreateCotizacionDto } from '../application/dtos/create-cotizacion.dto';
import { UpdateCotizacionDto } from '../application/dtos/update-cotizacion.dto';
import { ChangeEstadoCotizacionDto } from '../application/dtos/change-estado-cotizacion.dto';
import { GetCotizacionesQueryDto } from '../application/dtos/get-cotizaciones-query.dto';

@ApiTags('Cotizaciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cotizaciones')
export class CotizacionesController {
  constructor(
    private readonly createCotizacionUseCase: CreateCotizacionUseCase,
    private readonly getAllCotizacionesUseCase: GetAllCotizacionesUseCase,
    private readonly getCotizacionByIdUseCase: GetCotizacionByIdUseCase,
    private readonly updateCotizacionUseCase: UpdateCotizacionUseCase,
    private readonly changeEstadoCotizacionUseCase: ChangeEstadoCotizacionUseCase,
    private readonly duplicateCotizacionUseCase: DuplicateCotizacionUseCase,
    private readonly deleteCotizacionUseCase: DeleteCotizacionUseCase,
    private readonly restoreCotizacionUseCase: RestoreCotizacionUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cotización' })
  @ApiResponse({ status: 201, description: 'Cotización creada exitosamente' })
  async create(@Body() dto: CreateCotizacionDto) {
    return this.createCotizacionUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener listado paginado de cotizaciones' })
  @ApiResponse({ status: 200, description: 'Lista de cotizaciones obtenida' })
  async findAll(@Query() query: GetCotizacionesQueryDto) {
    return this.getAllCotizacionesUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una cotización por ID' })
  @ApiResponse({ status: 200, description: 'Cotización obtenida' })
  async findOne(@Param('id') id: string) {
    return this.getCotizacionByIdUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una cotización existente' })
  @ApiResponse({ status: 200, description: 'Cotización actualizada exitosamente' })
  async update(@Param('id') id: string, @Body() dto: UpdateCotizacionDto) {
    return this.updateCotizacionUseCase.execute(id, dto);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar el estado de una cotización (Borrador, Enviada, Aprobada, Rechazada, Vencida)' })
  @ApiResponse({ status: 200, description: 'Estado actualizado exitosamente' })
  async changeEstado(@Param('id') id: string, @Body() dto: ChangeEstadoCotizacionDto) {
    return this.changeEstadoCotizacionUseCase.execute(id, dto.estado);
  }

  @Post(':id/duplicar')
  @ApiOperation({ summary: 'Duplicar una cotización existente (Copia en estado Borrador)' })
  @ApiResponse({ status: 201, description: 'Cotización duplicada exitosamente' })
  async duplicate(@Param('id') id: string) {
    return this.duplicateCotizacionUseCase.execute(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar de forma lógica (Soft Delete) una cotización' })
  @ApiResponse({ status: 200, description: 'Cotización eliminada de forma lógica' })
  async delete(@Param('id') id: string) {
    return this.deleteCotizacionUseCase.execute(id);
  }

  @Patch(':id/restaurar')
  @ApiOperation({ summary: 'Restaurar una cotización eliminada' })
  @ApiResponse({ status: 200, description: 'Cotización restaurada exitosamente' })
  async restore(@Param('id') id: string) {
    return this.restoreCotizacionUseCase.execute(id);
  }
}
