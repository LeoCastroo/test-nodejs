import AppError from "../class/AppError";
import { IProductData } from "../data/IProductData";
import { Product } from "../models/Product";

class ProductService {

  constructor(private productData: IProductData) {}

  async findAll() {
    return this.productData.findAll();
  }

  async findProductBySku(sku: number) {

    const product = await this.productData.findProductBySku(sku);
    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    const totalQuantity = this.calculateTotalQuantity(product);
    const isMarketable = this.isProductMarketable(product);

    return {
      ...product,
      inventory: {
        ...product.inventory,
        quantity: totalQuantity
      },
      isMarketable
    };
  }

  async create(obj: Product) {

    const productAlreadyExists = await this.productData.findProductBySku(obj.sku);

    if (productAlreadyExists) {
      throw new AppError('Produto já está cadastrado', 400);
    }

    await this.productData.create(obj);
    return obj;
  }

  async update(obj: Product) {
    const productAlreadyExists = await this.productData.findProductBySku(obj.sku);
    if (!productAlreadyExists) {
      throw new AppError('Produto não encontrado.', 400);
    }

    await this.productData.update(obj);
    return await this.productData.findProductBySku(obj.sku);
  }

  async delete(sku: number) {
    const productAlreadyExists = await this.productData.findProductBySku(sku);

    if (!productAlreadyExists) {
      throw new AppError('Produto não encontrado.', 400);
    }

    return await this.productData.delete(sku);

  }

  isProductMarketable(product: Product): boolean {
    const totalQuantity = this.calculateTotalQuantity(product);
    return totalQuantity > 0;
  }

  calculateTotalQuantity(product: Product): number {
    return product.inventory.warehouses.reduce((sum, warehouse) => sum + warehouse.quantity, 0);
  }

}

export default ProductService;
