import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
  create(@Body('title') title: string, @Body('image') image: string) {
    return this.productService.create({ title, image });
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
    return this.productService.get(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    schema: {
      example: 1,
    },
  })
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
