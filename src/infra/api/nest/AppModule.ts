import { Module } from '@nestjs/common';
import { OficinaController } from './OficinaController';

@Module({
  imports: [],
  exports: [AppModule],
  controllers: [OficinaController],
})
export class AppModule {}
