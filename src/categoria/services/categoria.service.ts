import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async listar(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: ['produtos'],
    });
  }

  async buscarPorId(id: number): Promise<Categoria | null> {
    return await this.categoriaRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });
  }

  async buscarPorNome(nome: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: { nome },
      relations: ['produtos'],
    });
  }

  async criar(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async atualizar(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async deletar(id: number): Promise<{ message: string }> {
    await this.categoriaRepository.delete(id);
    return { message: 'Categoria deletada com sucesso' };
  }
}
