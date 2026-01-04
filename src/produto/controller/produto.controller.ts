import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Get()
  async listar(): Promise<Produto[]> {
    return await this.produtoService.listar();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Produto | null> {
    return await this.produtoService.buscarPorId(id);
  }

  @Get('nome/:nome')
  async buscarPorNome(@Param('nome') nome: string): Promise<Produto[]> {
    return await this.produtoService.buscarPorNome(nome);
  }

  @Post()
  async criar(@Body() produto: Produto): Promise<Produto> {
    return await this.produtoService.criar(produto);
  }

  @Put()
  async atualizar(@Body() produto: Produto): Promise<Produto> {
    return await this.produtoService.atualizar(produto);
  }

  @Delete(':id')
  async deletar(@Param('id') id: number): Promise<{ message: string }> {
    return await this.produtoService.deletar(id);
  }
}
