import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PageService {
  constructor(private prismaService: PrismaService) {}
  async create(data) {
    const domainName = data.domain;
    const categoryName = data.category;
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
    const page = await this.prismaService.client.page.create({
      data: {
        title: data.title,
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
}
