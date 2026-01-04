import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RawgService {
  private readonly apiKey = process.env.RAWG_API_KEY;
  private readonly baseUrl = 'https://api.rawg.io/api';

  constructor(private httpService: HttpService) {}

  async listarGames(pageSize: number = 20): Promise<any> {
    try {
      const url = `${this.baseUrl}/games?key=${this.apiKey}&page_size=${pageSize}`;
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar jogos da RAWG API',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async buscarGamesPorNome(nome: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/games?key=${this.apiKey}&search=${nome}&page_size=10`;
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar jogos por nome na RAWG API',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async buscarGamePorId(id: number): Promise<any> {
    try {
      const url = `${this.baseUrl}/games/${id}?key=${this.apiKey}`;
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar jogo por ID na RAWG API',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
