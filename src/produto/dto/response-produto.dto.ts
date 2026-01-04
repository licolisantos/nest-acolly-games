import { CategoriaResponseDto } from '../../categoria/dto/response-categoria.dto';

export class ProdutoResponseDto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  categoria?: CategoriaResponseDto | null;

  constructor(partial: Partial<ProdutoResponseDto>) {
    Object.assign(this, partial);
  }
}
