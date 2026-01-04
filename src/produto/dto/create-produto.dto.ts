import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsInt,
} from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Preço é obrigatório' })
  @IsPositive({ message: 'Preço deve ser maior que zero' })
  preco: number;

  @IsInt()
  @IsNotEmpty({ message: 'Estoque é obrigatório' })
  estoque: number;

  @IsInt()
  @IsNotEmpty({ message: 'Categoria ID é obrigatório' })
  categoria_id: number;
}
