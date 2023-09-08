import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async all() {
    return this.productModel.find().exec();
  }

  async create(data: any): Promise<Product> {
    return this.productModel.create(data);
  }

  async get(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: number, data: any): Promise<any> {
    return this.productModel.findOneAndUpdate({ id }, data).exec();
  }

  async delete(id: number): Promise<any> {
    return this.productModel.deleteOne({ id }).exec();
  }
}
