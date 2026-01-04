import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Get()
  async listar(): Promise<Categoria[]> {
    return await this.categoriaService.listar();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Categoria | null> {
    return await this.categoriaService.buscarPorId(id);
  }

  @Get('nome/:nome')
  async buscarPorNome(@Param('nome') nome: string): Promise<Categoria[]> {
    return await this.categoriaService.buscarPorNome(nome);
  }

  @Post()
  async criar(@Body() categoria: Categoria): Promise<Categoria> {
    return await this.categoriaService.criar(categoria);
  }

  @Put()
  async atualizar(@Body() categoria: Categoria): Promise<Categoria> {
    return await this.categoriaService.atualizar(categoria);
  }

  @Delete(':id')
  async deletar(@Param('id') id: number): Promise<{ message: string }> {
    return await this.categoriaService.deletar(id);
  }
}
