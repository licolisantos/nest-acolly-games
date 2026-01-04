import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './controller/produto.controller';
import { ProdutoService } from './services/produto.service';
import { Produto } from './entities/produto.entity';
import { RawgModule } from '../rawg/rawg.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), RawgModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
