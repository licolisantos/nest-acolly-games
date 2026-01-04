import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RawgController } from './controller/rawg.controller';
import { RawgService } from './services/rawg.service';

@Module({
  imports: [HttpModule],
  controllers: [RawgController],
  providers: [RawgService],
})
export class RawgModule {}
