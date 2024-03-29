import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PageService {
  constructor(private prismaService: PrismaService) {}
  async create(data) {
    const domainName = data.domain;
    const categoryName = data.category;
    const titleName = data.title;
    const pathName = data.path;
    const domain = await this.prismaService.client.domain.upsert({
      where: { name: domainName },
      update: {},
      create: { name: domainName },
    });
    const category = await this.prismaService.client.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    const title = await this.prismaService.client.title.upsert({
      where: { name: titleName },
      update: {},
      create: { name: titleName },
    });
    const path = await this.prismaService.client.path.upsert({
      where: { name: pathName },
      update: {},
      create: { name: pathName },
    });
    const where = {};
    where['path'] = { name: { contains: pathName } };
    where['domain'] = { name: { contains: domainName } };
    let page = await this.prismaService.client.page.findFirst({
      where,
    });
    if (page) return page;
    // TODO send other event to event-bus that the page is already exists
    page = await this.prismaService.client.page.create({
      data: {
        titleId: title.id,
        description: data.description,
        content: data.content,
        pathId: path.id,
        activated: true,
        domainId: domain.id,
        categoryId: category.id,
      },
    });
    return page;
  }
  async getDataList(query, pagination): Promise<any> {
    const where = {};
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        where[key] = { name: { contains: query[key] } };
      }
    }
    //Converted to only on sql query
    const result = await this.prismaService.client.$transaction([
      this.prismaService.client.page.findMany({
        where,
        include: {
          domain: true,
          category: true,
          title: true,
          path: true,
        },
        ...pagination,
      }),
      this.prismaService.client.page.count({ where }),
    ]);
    let pages: any = result[0]; //todo set its type
    pages = pages.map(this.formatData);
    const totalCount = result[1];
    const totalPages = Math.ceil(totalCount / pagination.take);
    const currentPage = Math.floor(pagination.skip / pagination.take) + 1;
    return {
      data: pages,
      meta: {
        totalCount,
        totalPages,
        currentPage,
      },
    };
  }
  formatData(page) {
    const formattedData = {
      id: page.id,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      description: page.description,
      content: page.content,
      activated: page.activated,
      domain: page.domain.name,
      category: page.category.name,
      title: page.title.name,
      path: page.path.name,
    };
    return formattedData;
  }
}
