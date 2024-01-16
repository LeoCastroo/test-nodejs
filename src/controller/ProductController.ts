import { Request, Response } from "express";
import AppError from "../class/AppError";
import Controller from "../class/Controller";
import { IProductData } from "../data/IProductData";
import asyncHandler from "../middleware/AsyncHadler";
import ProductService from "../service/ProductService";
import { productSchema } from "../validators/productValidators";

class ProductsController extends Controller {

  private productRepository: IProductData;

  constructor(productRepository: IProductData) {
    super()
    this.productRepository = productRepository;
  }


  initRoutes() {
    this.router.post("/products", asyncHandler(this.create.bind(this)));
    this.router.put("/products/:sku", asyncHandler(this.update.bind(this)));
    this.router.delete("/products/:sku", asyncHandler(this.delete.bind(this)));
    this.router.get("/products/:sku", asyncHandler(this.findProductBySku.bind(this)));
  }

  async create(req: Request, res: Response) {
    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }
    const productCreated = await new ProductService(this.productRepository).create(req.body);

    return res.status(201).send({ message: 'Produto criado com sucesso', product: productCreated });

  }

  async update(req: Request, res: Response) {
    const { sku } = req.params;

    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    if (!Number(sku) && sku !== req.body.sku) {
      throw new AppError('Sku inválido', 400);
    }

    const productUpdated = await new ProductService(this.productRepository).update(req.body);

    return res.status(201).send({ message: 'Produto atualizado com sucesso', product: productUpdated });

  }

  async delete(req: Request, res: Response) {
    const { sku } = req.params;

    if (!Number(sku)) {
      throw new AppError('Sku inválido', 400);
    }

    await new ProductService(this.productRepository).delete(Number(sku));

    return res.status(201).send({ message: 'Produto deletado com sucesso' });

  }

  async findProductBySku(req: Request, res: Response) {
    const { sku } = req.params;

    if (!Number(sku)) {
      throw new AppError('Sku inválido', 400);
    }

    const product = await new ProductService(this.productRepository).findProductBySku(Number(sku));

    return res.status(200).send(product);
  }

}

export default ProductsController;
