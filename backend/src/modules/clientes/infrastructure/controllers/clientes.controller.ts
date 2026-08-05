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
import { CreateClienteUseCase } from '../../application/use-cases/create-cliente.use-case';
import { GetAllClientesUseCase } from '../../application/use-cases/get-all-clientes.use-case';
import { GetClienteByIdUseCase } from '../../application/use-cases/get-cliente-by-id.use-case';
import { UpdateClienteUseCase } from '../../application/use-cases/update-cliente.use-case';
import { DeleteClienteUseCase } from '../../application/use-cases/delete-cliente.use-case';
import { RestoreClienteUseCase } from '../../application/use-cases/restore-cliente.use-case';
import { CreateClienteDto } from '../../application/dtos/create-cliente.dto';
import { UpdateClienteDto } from '../../application/dtos/update-cliente.dto';
import { GetClientesQueryDto } from '../../application/dtos/get-clientes-query.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly getAllClientesUseCase: GetAllClientesUseCase,
    private readonly getClienteByIdUseCase: GetClienteByIdUseCase,
    private readonly updateClienteUseCase: UpdateClienteUseCase,
    private readonly deleteClienteUseCase: DeleteClienteUseCase,
    private readonly restoreClienteUseCase: RestoreClienteUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener listado de clientes paginado, ordenado y filtrado' })
  @ApiOkResponse({ 
    description: 'Listado de clientes obtenido exitosamente',
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
              identificacion: { type: 'string', nullable: true },
              telefono: { type: 'string', nullable: true },
              email: { type: 'string', nullable: true },
              direccion: { type: 'string', nullable: true },
              notas: { type: 'string', nullable: true },
              status: { type: 'string', enum: ['PROSPECTO', 'ACTIVO', 'INACTIVO'] },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              deletedAt: { type: 'string', format: 'date-time', nullable: true },
            }
          }
        },
        total: { type: 'number', example: 45 }
      }
    }
  })
  async findAll(@Query() query: GetClientesQueryDto) {
    return this.getAllClientesUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  @ApiOkResponse({ description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.getClienteByIdUseCase.execute(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiCreatedResponse({ description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o identificación ya registrada' })
  async create(@Body() createClienteDto: CreateClienteDto) {
    return this.createClienteUseCase.execute(createClienteDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar la información de un cliente' })
  @ApiOkResponse({ description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o identificación duplicada' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.updateClienteUseCase.execute(id, updateClienteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminación lógica de un cliente (Soft Delete)' })
  @ApiNoContentResponse({ description: 'Cliente eliminado lógicamente exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async remove(@Param('id') id: string) {
    await this.deleteClienteUseCase.execute(id);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restaurar un cliente eliminado lógicamente' })
  @ApiOkResponse({ description: 'Cliente restaurado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async restore(@Param('id') id: string) {
    return this.restoreClienteUseCase.execute(id);
  }
}
