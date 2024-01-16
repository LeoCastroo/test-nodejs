import { Product } from "../models/Product";

export interface IProductData {
  create(product: Product) : Promise<void>;
  findProductBySku(sku: number): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  update(updatedData: Product): Promise<void>;
  delete(sku: number): Promise<void>;
}
