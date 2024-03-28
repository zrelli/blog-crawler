import { Module } from '@nestjs/common';
import { TransformerService } from './transformer.service';
import { TransformerController } from './transformer.controller';

@Module({
  providers: [TransformerService],
  controllers: [TransformerController],
})
export class TransformerModule {}
