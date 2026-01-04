export class CategoriaResponseDto {
  id: number;
  nome: string;
  descricao?: string;
  produtosCount?: number;

  constructor(partial: Partial<CategoriaResponseDto>) {
    Object.assign(this, partial);
  }
}
