import { Product } from './product.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    all(): Promise<Product[]>;
    create(data: any): Promise<Product>;
    get(id: number): Promise<Product>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
