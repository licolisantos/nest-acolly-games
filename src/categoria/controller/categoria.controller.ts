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
import { CategoriaService } from '../services/categoria.service';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';
import { CategoriaResponseDto } from '../dto/response-categoria.dto';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleEnum } from '../../usuario/enums/role.enum';

@Controller('categorias')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Get()
  async listar(): Promise<ApiResponseDto<CategoriaResponseDto[]>> {
    const categorias = await this.categoriaService.listar();
    return new ApiResponseDto(categorias, 'Categorias listadas com sucesso');
  }

  @Get(':id')
  async buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseDto<CategoriaResponseDto | null>> {
    const categoria = await this.categoriaService.buscarPorId(id);
    return new ApiResponseDto(categoria, 'Categoria encontrada');
  }

  @Get('nome/:nome')
  async buscarPorNome(
    @Param('nome') nome: string,
  ): Promise<ApiResponseDto<CategoriaResponseDto[]>> {
    const categorias = await this.categoriaService.buscarPorNome(nome);
    return new ApiResponseDto(
      categorias,
      'Categorias encontradas por nome',
    );
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async criar(
    @Body() createCategoriaDto: CreateCategoriaDto,
  ): Promise<ApiResponseDto<CategoriaResponseDto>> {
    const categoria = await this.categoriaService.criar(createCategoriaDto);
    return new ApiResponseDto(categoria, 'Categoria criada com sucesso');
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<ApiResponseDto<CategoriaResponseDto | null>> {
    const categoria = await this.categoriaService.atualizar(
      id,
      updateCategoriaDto,
    );
    return new ApiResponseDto(categoria, 'Categoria atualizada com sucesso');
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async deletar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseDto<{ message: string }>> {
    const result = await this.categoriaService.deletar(id);
    return new ApiResponseDto(result, result.message);
  }
}
