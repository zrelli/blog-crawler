import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Injectable()
export class CrawlerService {
  //simple crawler
  //todo crawler should be dynamic
  // async crawl(url: string): Promise<void> {

  //   try {
  //     const headers = {
  //       'User-Agent': 'Botx',
  //     };

  //     const response = await axios.get(url, {
  //       headers,
  //     });
  //     const $ = cheerio.load(response.data);
  //     const title = $('title').text();
  //     const description = $('meta[name="description"]').attr('content') || '';
  //     const content = $('body').text();
  //     const category = 'default'; //todo
  //     const data = { title, description, content, url, category };
  //     await axios.post('http://localhost:3002/events', {
  //       type: 'NewContentScrapped',
  //       data,
  //     });
  //   } catch (error) {
  //     console.error('Error crawling page:', error);
  //   }
  // }

  async crawl(
    startUrl: string,
    maxLinks: number,
    crawlDepth: number,
  ): Promise<string[]> {
    const visitedLinks = new Set<string>();
    const queue: [string, number][] = [[startUrl, 0]];
    const result: string[] = [];

    // Maximum number of concurrent requests
    const maxConcurrency = 10;

    while (queue.length > 0) {
      const requests: Promise<void>[] = [];

      // Process multiple requests concurrently
      for (let i = 0; i < maxConcurrency && queue.length > 0; i++) {
        const [currentUrl, depth] = queue.shift();

        if (visitedLinks.has(currentUrl) || depth > crawlDepth) {
          continue;
        }

        const requestPromise = this.processCrawlRequest(
          currentUrl,
          depth,
          visitedLinks,
          result,
          queue,
          maxLinks,
        );
        requests.push(requestPromise);
      }

      // Wait for all concurrent requests to complete
      await Promise.all(requests);
    }

    return result;
  }

  private extractLinks(html: string): string[] {
    const $ = cheerio.load(html);
    const links: string[] = [];

    $('a').each((_index, element) => {
      const href = $(element).attr('href');
      if (href) {
        links.push(href);
      }
    });

    return links;
  }

  private async processCrawlRequest(
    currentUrl: string,
    depth: number,
    visitedLinks: Set<string>,
    result: string[],
    queue: [string, number][],
    maxLinks: number,
  ): Promise<void> {
    try {
      const headers = {
        'User-Agent': 'Botx',
      };
      const response = await axios.get(currentUrl, { headers });
      //
      await this.handleResponse(response, currentUrl);
      //
      const links = this.extractLinks(response.data);

      visitedLinks.add(currentUrl);
      result.push(currentUrl);

      for (const link of links) {
        if (visitedLinks.size >= maxLinks) {
          break;
        }

        queue.push([link, depth + 1]);
      }

      // Store crawled URL in the database
      // await this.saveCrawledData(currentUrl);
    } catch (error) {
      console.error(`Failed to crawl URL: ${currentUrl}`);
      console.error(error);
    }
  }

  // private async saveCrawledData(url: string): Promise<CrawledDataDocument> {
  //   const crawledData = new CrawledDataModel({ url });
  //   return crawledData.save();
  // }

  async handleResponse(response, url): Promise<void> {
    try {
      // const headers = {
      //   'User-Agent': 'Botx',
      // };

      // const response = await axios.get(url, {
      //   headers,
      // });
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
