import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { ProdutoResponseDto } from '../dto/response-produto.dto';
import { ImportRawgDto } from '../dto/import-rawg.dto';
import { CategoriaResponseDto } from '../../categoria/dto/response-categoria.dto';
import { RawgService } from '../../rawg/services/rawg.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private rawgService: RawgService,
  ) {}

  async listar(): Promise<ProdutoResponseDto[]> {
    const produtos = await this.produtoRepository.find({
      relations: ['categoria'],
    });
    return produtos.map((prod) => new ProdutoResponseDto({
      id: prod.id,
      nome: prod.nome,
      descricao: prod.descricao,
      preco: prod.preco,
      estoque: prod.estoque,
      categoria: prod.categoria ? new CategoriaResponseDto({
        id: prod.categoria.id,
        nome: prod.categoria.nome,
        descricao: prod.categoria.descricao,
      }) : null,
    }));
  }

  async buscarPorId(id: number): Promise<ProdutoResponseDto | null> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!produto) {
      return null;
    }
    return new ProdutoResponseDto({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      estoque: produto.estoque,
      categoria: produto.categoria ? new CategoriaResponseDto({
        id: produto.categoria.id,
        nome: produto.categoria.nome,
        descricao: produto.categoria.descricao,
      }) : null,
    });
  }

  async buscarPorNome(nome: string): Promise<ProdutoResponseDto[]> {
    const produtos = await this.produtoRepository.find({
      where: { nome },
      relations: ['categoria'],
    });
    return produtos.map((prod) => new ProdutoResponseDto({
      id: prod.id,
      nome: prod.nome,
      descricao: prod.descricao,
      preco: prod.preco,
      estoque: prod.estoque,
      categoria: prod.categoria ? new CategoriaResponseDto({
        id: prod.categoria.id,
        nome: prod.categoria.nome,
        descricao: prod.categoria.descricao,
      }) : null,
    }));
  }

  async criar(createProdutoDto: CreateProdutoDto): Promise<ProdutoResponseDto | null> {
    const produto = this.produtoRepository.create(createProdutoDto);
    const saved = await this.produtoRepository.save(produto);
    const produtoCarregado = await this.produtoRepository.findOne({
      where: { id: saved.id },
      relations: ['categoria'],
    });
    if (!produtoCarregado) {
      return null;
    }
    return new ProdutoResponseDto({
      id: produtoCarregado.id,
      nome: produtoCarregado.nome,
      descricao: produtoCarregado.descricao,
      preco: produtoCarregado.preco,
      estoque: produtoCarregado.estoque,
      categoria: produtoCarregado.categoria ? new CategoriaResponseDto({
        id: produtoCarregado.categoria.id,
        nome: produtoCarregado.categoria.nome,
        descricao: produtoCarregado.categoria.descricao,
      }) : null,
    });
  }

  async atualizar(
    id: number,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<ProdutoResponseDto | null> {
    await this.produtoRepository.update(id, updateProdutoDto);
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!produto) {
      return null;
    }
    return new ProdutoResponseDto({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      estoque: produto.estoque,
      categoria: produto.categoria ? new CategoriaResponseDto({
        id: produto.categoria.id,
        nome: produto.categoria.nome,
        descricao: produto.categoria.descricao,
      }) : null,
    });
  }

  async deletar(id: number): Promise<{ message: string }> {
    await this.produtoRepository.delete(id);
    return { message: 'Produto deletado com sucesso' };
  }

  async importarDoRawg(importRawgDto: ImportRawgDto): Promise<ProdutoResponseDto | null> {
    const jogo = await this.rawgService.buscarGamePorId(importRawgDto.rawgId);
    
    const novoProduto = this.produtoRepository.create({
      nome: jogo.name,
      descricao: jogo.description || jogo.name,
      preco: importRawgDto.preco,
      estoque: importRawgDto.estoque,
      categoria_id: importRawgDto.categoria_id,
    });
    
    const saved = await this.produtoRepository.save(novoProduto);
    const produtoCarregado = await this.produtoRepository.findOne({
      where: { id: saved.id },
      relations: ['categoria'],
    });
    
    if (!produtoCarregado) {
      return null;
    }
    
    return new ProdutoResponseDto({
      id: produtoCarregado.id,
      nome: produtoCarregado.nome,
      descricao: produtoCarregado.descricao,
      preco: produtoCarregado.preco,
      estoque: produtoCarregado.estoque,
      categoria: produtoCarregado.categoria ? new CategoriaResponseDto({
        id: produtoCarregado.categoria.id,
        nome: produtoCarregado.categoria.nome,
        descricao: produtoCarregado.categoria.descricao,
      }) : null,
    });
  }
}
