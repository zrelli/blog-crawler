import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PageService {
  constructor(private prismaService: PrismaService) {}
  async create(data) {
    const domainName = data.domain;
    const categoryName = data.category;
    const titleName = data.title;
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
    const page = await this.prismaService.client.page.create({
      data: {
        titleId: title.id,
        description: data.description,
        content: data.content,
        path: data.path,
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
        },
        ...pagination,
      }),
      this.prismaService.client.page.count({ where }),
    ]);
    let pages = result[0];
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
      path: page.path,
      description: page.description,
      content: page.content,
      activated: page.activated,
      domainId: page.domainId,
      categoryId: page.categoryId,
      titleId: page.titleId,
      domain: page.domain.name,
      category: page.category.name,
      title: page.title.name,
    };
    return formattedData;
  }
}
