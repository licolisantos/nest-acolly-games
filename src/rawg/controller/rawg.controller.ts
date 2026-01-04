import { Controller, Get, Param, Query } from '@nestjs/common';
import { RawgService } from '../services/rawg.service';

@Controller('rawg')
export class RawgController {
  constructor(private rawgService: RawgService) {}

  @Get('games')
  async listarGames(@Query('pageSize') pageSize: number = 20): Promise<any> {
    return await this.rawgService.listarGames(pageSize);
  }

  @Get('games/search')
  async buscarGamesPorNome(@Query('nome') nome: string): Promise<any> {
    return await this.rawgService.buscarGamesPorNome(nome);
  }

  @Get('games/:id')
  async buscarGamePorId(@Param('id') id: number): Promise<any> {
    return await this.rawgService.buscarGamePorId(id);
  }
}
