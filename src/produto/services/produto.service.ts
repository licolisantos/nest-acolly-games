import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async listar(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: ['categoria'],
    });
  }

  async buscarPorId(id: number): Promise<Produto | null> {
    return await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  async buscarPorNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { nome },
      relations: ['categoria'],
    });
  }

  async criar(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async atualizar(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async deletar(id: number): Promise<{ message: string }> {
    await this.produtoRepository.delete(id);
    return { message: 'Produto deletado com sucesso' };
  }
}
