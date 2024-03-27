import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Injectable()
export class CrawlerService {
  //simple crawler
  //todo crawler should be dynamic
  async crawl(
    url: string,
  ): Promise<{ title: string; description: string; content: string }> {
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
      return { title, description, content };
    } catch (error) {
      console.error('Error crawling page:', error);
      return { title: '', description: '', content: '' };
    }
  }
}
