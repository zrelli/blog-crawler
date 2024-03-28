import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Injectable()
export class CrawlerService {
  //simple crawler
  //todo crawler should be dynamic
  async crawl(url: string): Promise<void> {
    try {
      const headers = {
        'User-Agent': 'Botx',
      };

      const response = await axios.get(url, {
        headers,
      });
      const $ = cheerio.load(response.data);
      const title = $('title').text();
      const description = $('meta[name="description"]').attr('content') || '';
      const content = $('body').text();
      const category = 'default'; //todo
      const data = { title, description, content, url, category };
      await axios.post('http://localhost:3002/events', {
        type: 'NewContentScrapped',
        data,
      });
    } catch (error) {
      console.error('Error crawling page:', error);
    }
  }
}
