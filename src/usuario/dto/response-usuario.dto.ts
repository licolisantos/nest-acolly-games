import { RoleEnum } from '../enums/role.enum';

export class UsuarioResponseDto {
  id: number;
  nome: string;
  email: string;
  role: RoleEnum;
  criadoEm: Date;

  constructor(partial: Partial<UsuarioResponseDto>) {
    Object.assign(this, partial);
  }
}
