import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { ApiParam } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @EventPattern('product_created')
  async productCreated(data: any) {
    return this.productService.create(data);
  }

  @EventPattern('product_updated')
  async productUpdated(data: any) {
    return this.productService.update(data.id, data);
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    return this.productService.delete(id);
  }

  @Post(':id/like')
  @ApiParam({
    name: 'id',
    schema: {
      example: 1,
    },
  })
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    product.likes += 1;

    this.httpService
      .post(`http://localhost:8000/api/products/${id}/like`, {
        id,
      })
      .subscribe();

    await this.productService.update(id, { likes: product.likes });

    return product;
  }
}
