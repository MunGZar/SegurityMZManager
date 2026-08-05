export type ClienteStatus = 'PROSPECTO' | 'ACTIVO' | 'INACTIVO';

export class Cliente {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly identificacion: string | null,
    public readonly telefono: string | null,
    public readonly email: string | null,
    public readonly direccion: string | null,
    public readonly notas: string | null,
    public readonly status: ClienteStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date | null = null,
  ) {}
}
