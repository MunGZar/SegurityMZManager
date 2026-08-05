import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateClienteUseCase } from '../../application/use-cases/create-cliente.use-case';
import { GetAllClientesUseCase } from '../../application/use-cases/get-all-clientes.use-case';
import { GetClienteByIdUseCase } from '../../application/use-cases/get-cliente-by-id.use-case';
import { UpdateClienteUseCase } from '../../application/use-cases/update-cliente.use-case';
import { DeleteClienteUseCase } from '../../application/use-cases/delete-cliente.use-case';
import { CreateClienteDto } from '../../application/dtos/create-cliente.dto';
import { UpdateClienteDto } from '../../application/dtos/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly getAllClientesUseCase: GetAllClientesUseCase,
    private readonly getClienteByIdUseCase: GetClienteByIdUseCase,
    private readonly updateClienteUseCase: UpdateClienteUseCase,
    private readonly deleteClienteUseCase: DeleteClienteUseCase,
  ) {}

  @Get()
  async findAll(@Query('q') search?: string) {
    return this.getAllClientesUseCase.execute(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getClienteByIdUseCase.execute(id);
  }

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return this.createClienteUseCase.execute(createClienteDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.updateClienteUseCase.execute(id, updateClienteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.deleteClienteUseCase.execute(id);
  }
}
