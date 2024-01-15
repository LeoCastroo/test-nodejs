import AppError from "../class/AppError";
import ProductData from "../data/ProductData";
import { Product } from "../models/Product";

class ProductService {

  async findAll() {
    return ProductData.findAll();
  }

  async findProductBySku(sku: number) {

    const product = await ProductData.findProductBySku(sku);
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

    const productAlreadyExists = await ProductData.findProductBySku(obj.sku);

    if (productAlreadyExists) {
      throw new AppError('Produto já está cadastrado', 400);
    }

    await ProductData.create(obj);
    return obj;
  }

  async update(obj: Product) {
    const productAlreadyExists = await ProductData.findProductBySku(obj.sku);
    if (!productAlreadyExists) {
      throw new AppError('Produto não encontrado.', 400);
    }

    await ProductData.update(obj);
    return await ProductData.findProductBySku(obj.sku);
  }

  async delete(sku: number) {
    const productAlreadyExists = await ProductData.findProductBySku(sku);

    if (!productAlreadyExists) {
      throw new AppError('Produto não encontrado.', 400);
    }

    return await ProductData.delete(sku);

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
