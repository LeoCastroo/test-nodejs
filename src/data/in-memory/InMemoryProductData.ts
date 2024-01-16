import { Product } from "../../models/Product";
import { IProductData } from "../IProductData";

class InMemoryProductData implements IProductData {

  private products: Product[] = [];

  async create(product: Product) {
    this.products.push(product);
  }

  async findProductBySku(sku: number): Promise<Product | undefined> {
    return this.products.find(product => product.sku === sku);
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async update(updatedData: Product) {
    const productIndex = this.products.findIndex(product => product.sku === updatedData.sku);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedData };
    }
  }

  async delete(sku: number): Promise<void> {
    const productIndex = this.products.findIndex(product => product.sku === sku);
    this.products.splice(productIndex, 1);
  }

}

export default InMemoryProductData;
