import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class ImportRawgDto {
  @IsNumber()
  @IsNotEmpty({ message: 'ID do jogo RAWG é obrigatório' })
  rawgId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Preço é obrigatório' })
  @IsPositive({ message: 'Preço deve ser maior que zero' })
  preco: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Estoque é obrigatório' })
  estoque: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Categoria ID é obrigatório' })
  categoria_id: number;
}
