import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { CreateProveedorUseCase } from '../../application/use-cases/create-proveedor.use-case';
import { GetAllProveedoresUseCase } from '../../application/use-cases/get-all-proveedores.use-case';
import { GetProveedorByIdUseCase } from '../../application/use-cases/get-proveedor-by-id.use-case';
import { UpdateProveedorUseCase } from '../../application/use-cases/update-proveedor.use-case';
import { DeleteProveedorUseCase } from '../../application/use-cases/delete-proveedor.use-case';
import { RestoreProveedorUseCase } from '../../application/use-cases/restore-proveedor.use-case';
import { CreateProveedorDto } from '../../application/dtos/create-proveedor.dto';
import { UpdateProveedorDto } from '../../application/dtos/update-proveedor.dto';
import { GetProveedoresQueryDto } from '../../application/dtos/get-proveedores-query.dto';

@ApiTags('Proveedores')
@Controller('proveedores')
export class ProveedoresController {
  constructor(
    private readonly createProveedorUseCase: CreateProveedorUseCase,
    private readonly getAllProveedoresUseCase: GetAllProveedoresUseCase,
    private readonly getProveedorByIdUseCase: GetProveedorByIdUseCase,
    private readonly updateProveedorUseCase: UpdateProveedorUseCase,
    private readonly deleteProveedorUseCase: DeleteProveedorUseCase,
    private readonly restoreProveedorUseCase: RestoreProveedorUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener listado de proveedores paginado, ordenado y filtrado' })
  @ApiOkResponse({ 
    description: 'Listado de proveedores obtenido exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              nombre: { type: 'string' },
              contacto: { type: 'string', nullable: true },
              telefono: { type: 'string', nullable: true },
              whatsapp: { type: 'string', nullable: true },
              correo: { type: 'string', nullable: true },
              ciudad: { type: 'string', nullable: true },
              direccion: { type: 'string', nullable: true },
              observaciones: { type: 'string', nullable: true },
              activo: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              deletedAt: { type: 'string', format: 'date-time', nullable: true },
            }
          }
        },
        total: { type: 'number', example: 12 }
      }
    }
  })
  async findAll(@Query() query: GetProveedoresQueryDto) {
    return this.getAllProveedoresUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proveedor por su ID' })
  @ApiOkResponse({ description: 'Proveedor encontrado' })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.getProveedorByIdUseCase.execute(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proveedor' })
  @ApiCreatedResponse({ description: 'Proveedor creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o proveedor ya registrado' })
  async create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.createProveedorUseCase.execute(createProveedorDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar la información de un proveedor' })
  @ApiOkResponse({ description: 'Proveedor actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o nombre duplicado' })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  async update(@Param('id') id: string, @Body() updateProveedorDto: UpdateProveedorDto) {
    return this.updateProveedorUseCase.execute(id, updateProveedorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminación lógica de un proveedor (Soft Delete)' })
  @ApiNoContentResponse({ description: 'Proveedor eliminado lógicamente' })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  async remove(@Param('id') id: string) {
    await this.deleteProveedorUseCase.execute(id);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restaurar un proveedor eliminado lógicamente' })
  @ApiOkResponse({ description: 'Proveedor restaurado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  async restore(@Param('id') id: string) {
    return this.restoreProveedorUseCase.execute(id);
  }
}
