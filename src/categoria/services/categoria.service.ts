import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';
import { CategoriaResponseDto } from '../dto/response-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async listar(): Promise<CategoriaResponseDto[]> {
    const categorias = await this.categoriaRepository.find({
      relations: ['produtos'],
    });
    return categorias.map((cat) => new CategoriaResponseDto({
      id: cat.id,
      nome: cat.nome,
      descricao: cat.descricao,
      produtosCount: cat.produtos?.length || 0,
    }));
  }

  async buscarPorId(id: number): Promise<CategoriaResponseDto | null> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });
    if (!categoria) {
      return null;
    }
    return new CategoriaResponseDto({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
      produtosCount: categoria.produtos?.length || 0,
    });
  }

  async buscarPorNome(nome: string): Promise<CategoriaResponseDto[]> {
    const categorias = await this.categoriaRepository.find({
      where: { nome },
      relations: ['produtos'],
    });
    return categorias.map((cat) => new CategoriaResponseDto({
      id: cat.id,
      nome: cat.nome,
      descricao: cat.descricao,
      produtosCount: cat.produtos?.length || 0,
    }));
  }

  async criar(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaResponseDto> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    const saved = await this.categoriaRepository.save(categoria);
    return new CategoriaResponseDto({
      id: saved.id,
      nome: saved.nome,
      descricao: saved.descricao,
      produtosCount: 0,
    });
  }

  async atualizar(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaResponseDto | null> {
    await this.categoriaRepository.update(id, updateCategoriaDto);
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });
    if (!categoria) {
      return null;
    }
    return new CategoriaResponseDto({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
      produtosCount: categoria.produtos?.length || 0,
    });
  }

  async deletar(id: number): Promise<{ message: string }> {
    await this.categoriaRepository.delete(id);
    return { message: 'Categoria deletada com sucesso' };
  }
}
