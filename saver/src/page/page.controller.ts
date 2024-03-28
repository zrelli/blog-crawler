import { Controller, Post, Body } from '@nestjs/common';
import { PageService } from './page.service';
@Controller('events')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async crawlPage(@Body('type') type: string, @Body('data') data: any) {
    if (type === 'DataReadyToSave') {
      return this.pageService.create(data);
    }
  }
}
