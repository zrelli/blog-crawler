import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { PageService } from './page.service';
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Post()
  async crawlPage(@Body('type') type: string, @Body('data') data: any) {
    if (type === 'DataReadyToSave') {
      return this.pageService.create(data);
    }
  }
  @Get()
  async getPages(
    @Query('title') title: string,
    @Query('category') category: string,
    @Query('domain') domain: string,
    @Query('skip') skip: string = '0',
    @Query('take') take: string = '10',
  ) {
    const query = { title, category, domain };
    const pagination = { skip: parseInt(skip), take: parseInt(take) };
    const pages = await this.pageService.getDataList(query, pagination);
    return pages;
  }
}
