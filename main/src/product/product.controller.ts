import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

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
}
