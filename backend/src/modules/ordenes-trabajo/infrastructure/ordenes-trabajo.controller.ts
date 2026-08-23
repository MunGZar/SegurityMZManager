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
import { CreateOrdenTrabajoUseCase } from '../application/use-cases/create-orden-trabajo.use-case';
import { GetAllOrdenesTrabajoUseCase } from '../application/use-cases/get-all-ordenes-trabajo.use-case';
import { GetOrdenTrabajoByIdUseCase } from '../application/use-cases/get-orden-trabajo-by-id.use-case';
import { UpdateOrdenTrabajoUseCase } from '../application/use-cases/update-orden-trabajo.use-case';
import { ChangeEstadoOrdenTrabajoUseCase } from '../application/use-cases/change-estado-orden-trabajo.use-case';
import { AddEvidenciaUseCase } from '../application/use-cases/add-evidencia.use-case';
import { DeleteEvidenciaUseCase } from '../application/use-cases/delete-evidencia.use-case';
import { DeleteOrdenTrabajoUseCase } from '../application/use-cases/delete-orden-trabajo.use-case';
import { RestoreOrdenTrabajoUseCase } from '../application/use-cases/restore-orden-trabajo.use-case';

import { CreateOrdenTrabajoDto } from '../application/dtos/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from '../application/dtos/update-orden-trabajo.dto';
import { ChangeEstadoOrdenTrabajoDto } from '../application/dtos/change-estado-orden-trabajo.dto';
import { AddEvidenciaDto } from '../application/dtos/add-evidencia.dto';
import { GetOrdenesTrabajoQueryDto } from '../application/dtos/get-ordenes-trabajo-query.dto';

@ApiTags('Órdenes de Trabajo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ordenes-trabajo')
export class OrdenesTrabajoController {
  constructor(
    private readonly createOrdenTrabajoUseCase: CreateOrdenTrabajoUseCase,
    private readonly getAllOrdenesTrabajoUseCase: GetAllOrdenesTrabajoUseCase,
    private readonly getOrdenTrabajoByIdUseCase: GetOrdenTrabajoByIdUseCase,
    private readonly updateOrdenTrabajoUseCase: UpdateOrdenTrabajoUseCase,
    private readonly changeEstadoOrdenTrabajoUseCase: ChangeEstadoOrdenTrabajoUseCase,
    private readonly addEvidenciaUseCase: AddEvidenciaUseCase,
    private readonly deleteEvidenciaUseCase: DeleteEvidenciaUseCase,
    private readonly deleteOrdenTrabajoUseCase: DeleteOrdenTrabajoUseCase,
    private readonly restoreOrdenTrabajoUseCase: RestoreOrdenTrabajoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una Orden de Trabajo desde una Cotización Aprobada' })
  @ApiResponse({ status: 201, description: 'Orden de trabajo creada exitosamente' })
  async create(@Body() dto: CreateOrdenTrabajoDto) {
    return this.createOrdenTrabajoUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener listado paginado de órdenes de trabajo' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes de trabajo obtenida' })
  async findAll(@Query() query: GetOrdenesTrabajoQueryDto) {
    return this.getAllOrdenesTrabajoUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle completo de una orden de trabajo' })
  @ApiResponse({ status: 200, description: 'Orden de trabajo obtenida' })
  async findOne(@Param('id') id: string) {
    return this.getOrdenTrabajoByIdUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información operativa y ficha técnica' })
  @ApiResponse({ status: 200, description: 'Orden de trabajo actualizada' })
  async update(@Param('id') id: string, @Body() dto: UpdateOrdenTrabajoDto) {
    return this.updateOrdenTrabajoUseCase.execute(id, dto);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar el estado de una orden (Pendiente, Programada, En proceso, Finalizada, Cancelada)' })
  @ApiResponse({ status: 200, description: 'Estado actualizado' })
  async changeEstado(@Param('id') id: string, @Body() dto: ChangeEstadoOrdenTrabajoDto) {
    return this.changeEstadoOrdenTrabajoUseCase.execute(id, dto.estado);
  }

  @Post(':id/evidencias')
  @ApiOperation({ summary: 'Agregar una fotografía o evidencia técnica a la orden' })
  @ApiResponse({ status: 201, description: 'Evidencia registrada exitosamente' })
  async addEvidencia(@Param('id') id: string, @Body() dto: AddEvidenciaDto) {
    return this.addEvidenciaUseCase.execute(id, dto);
  }

  @Delete('evidencias/:evidenciaId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una fotografía o evidencia técnica' })
  @ApiResponse({ status: 200, description: 'Evidencia eliminada' })
  async deleteEvidencia(@Param('evidenciaId') evidenciaId: string) {
    return this.deleteEvidenciaUseCase.execute(evidenciaId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar de forma lógica (Soft Delete) una orden de trabajo' })
  @ApiResponse({ status: 200, description: 'Orden de trabajo eliminada lógicamente' })
  async delete(@Param('id') id: string) {
    return this.deleteOrdenTrabajoUseCase.execute(id);
  }

  @Patch(':id/restaurar')
  @ApiOperation({ summary: 'Restaurar una orden de trabajo eliminada' })
  @ApiResponse({ status: 200, description: 'Orden de trabajo restaurada' })
  async restore(@Param('id') id: string) {
    return this.restoreOrdenTrabajoUseCase.execute(id);
  }
}
