import { Controller, Post, Body } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}
  @Post()
  async crawlPage(
    @Body('url') startUrl: string,
    @Body('maxLinks') maxLinks: number=1,
    @Body('crawlDepth') crawlDepth: number=1,
  ) {
    return this.crawlerService.crawl(startUrl, maxLinks, crawlDepth);
  }
}
