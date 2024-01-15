import { Request, Response } from "express";
import Controller from "../class/Controller";
import asyncHandler from "../middleware/AsyncHadler";
import { productSchema } from "../validators/productValidators";
import ProductService from "../service/ProductService";

class ProductsController extends Controller {

  initRoutes() {
    this.router.post("/products", asyncHandler(this.create));
    this.router.put("/products/:sku", asyncHandler(this.update));
    this.router.delete("/products/:sku", asyncHandler(this.delete));
    this.router.get("/products/:sku", asyncHandler(this.findProductBySku));
  }

  async create(req: Request, res: Response) {
    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    const productCreated = await new ProductService().create(req.body);

    return res.status(201).send({ message: 'Produto criado com sucesso', product: productCreated });

  }

  async update(req: Request, res: Response) {
    const { sku } = req.params;

    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    if (!Number(sku) && sku !== req.body.sku) {
      return res.status(400).json('Sku inválido');
    }

    const productUpdated = await new ProductService().update(req.body);

    return res.status(201).send({ message: 'Produto atualizado com sucesso', product: productUpdated });

  }

  async delete(req: Request, res: Response) {
    const { sku } = req.params;

    if (!Number(sku)) {
      return res.status(400).json('Sku inválido');
    }

    await new ProductService().delete(Number(sku));

    return res.status(201).send({ message: 'Produto deletado com sucesso' });

  }

  async findProductBySku(req: Request, res: Response) {
    const { sku } = req.params;

    if (!Number(sku)) {
      return res.status(400).json('Sku inválido');
    }

    const product = await new ProductService().findProductBySku(Number(sku));

    return res.status(200).send(product);
  }

}

export default ProductsController;
