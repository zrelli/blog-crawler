import { Controller, Post, Body } from '@nestjs/common';
import { TransformerService } from './transformer.service';

@Controller('events')
export class TransformerController {
  constructor(private readonly transformerService: TransformerService) {}
  @Post()
  async crawlPage(@Body('type') type: string, @Body('data') data: any) {
    console.log('crawlPage');
    const payload = { type, data };
    return this.transformerService.transformDataBeforeSaving(payload);
  }
}
