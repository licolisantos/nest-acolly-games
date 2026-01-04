import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { ImportRawgDto } from '../dto/import-rawg.dto';
import { ProdutoResponseDto } from '../dto/response-produto.dto';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleEnum } from '../../usuario/enums/role.enum';

@Controller('produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Get()
  async listar(): Promise<ApiResponseDto<ProdutoResponseDto[]>> {
    const produtos = await this.produtoService.listar();
    return new ApiResponseDto(produtos, 'Produtos listados com sucesso');
  }

  @Get(':id')
  async buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseDto<ProdutoResponseDto | null>> {
    const produto = await this.produtoService.buscarPorId(id);
    return new ApiResponseDto(produto, 'Produto encontrado');
  }

  @Get('nome/:nome')
  async buscarPorNome(
    @Param('nome') nome: string,
  ): Promise<ApiResponseDto<ProdutoResponseDto[]>> {
    const produtos = await this.produtoService.buscarPorNome(nome);
    return new ApiResponseDto(produtos, 'Produtos encontrados por nome');
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async criar(
    @Body() createProdutoDto: CreateProdutoDto,
  ): Promise<ApiResponseDto<ProdutoResponseDto | null>> {
    const produto = await this.produtoService.criar(createProdutoDto);
    return new ApiResponseDto(produto, 'Produto criado com sucesso');
  }

  @Post('import/rawg')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async importarDoRawg(
    @Body() importRawgDto: ImportRawgDto,
  ): Promise<ApiResponseDto<ProdutoResponseDto | null>> {
    const produto = await this.produtoService.importarDoRawg(importRawgDto);
    return new ApiResponseDto(produto, 'Produto importado da RAWG com sucesso');
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<ApiResponseDto<ProdutoResponseDto | null>> {
    const produto = await this.produtoService.atualizar(id, updateProdutoDto);
    return new ApiResponseDto(produto, 'Produto atualizado com sucesso');
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async deletar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseDto<{ message: string }>> {
    const result = await this.produtoService.deletar(id);
    return new ApiResponseDto(result, result.message);
  }
}
