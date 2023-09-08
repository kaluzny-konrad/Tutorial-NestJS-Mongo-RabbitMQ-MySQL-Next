import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  all() {
    return this.productService.all();
  }

  @Post()
  @ApiBody({
    schema: {
      example: {
        title: 'Product 1',
        image: 'https://i.imgur.com/hlXfJHv.jpeg',
      },
    },
  })
  async create(@Body('title') title: string, @Body('image') image: string) {
    const product = await this.productService.create({ title, image });
    this.client.emit('product_created', product);
    return product;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    schema: {
      example: 1,
    },
  })
  async get(@Param('id') id: number) {
    return this.productService.get(id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    schema: {
      example: 1,
    },
  })
  @ApiBody({
    schema: {
      example: {
        title: '',
        image: '',
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    await this.productService.update(id, { title, image });
    const product = await this.productService.get(id);
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    schema: {
      example: 1,
    },
  })
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
    this.client.emit('product_deleted', id);
    return id;
  }

  @Post(':id/like')
  @ApiParam({
    name: 'id',
    schema: {
      example: 1,
    },
  })
  async like(@Param('id') id: number) {
    const product = await this.productService.get(id);
    await this.productService.update(id, { likes: product.likes + 1 });
    this.client.emit('product_liked', id);
    return product;
  }
}
