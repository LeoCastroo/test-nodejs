import AppError from "../class/AppError";
import { Product } from "../models/Product";
import ProductService from "../service/ProductService";

describe("Criar produto", () => {

  let productService: ProductService;

  beforeAll(() => {
    productService = new ProductService();
  })

  it("Deve ser possível criar um produto", async () => {

    const productData: Product = {
      "sku": 43264,
      "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      "inventory": {
        "warehouses": [
          {
            "locality": "SP",
            "quantity": 12,
            "type": "ECOMMERCE"
          },
          {
            "locality": "MOEMA",
            "quantity": 3,
            "type": "PHYSICAL_STORE"
          }
        ]
      }
    }

    const product = await productService.create(productData);
    expect(product).toEqual(productData);

  })

  it("Não deve ser possível criar um produto existente", async () => {
    const productData: Product = {
      "sku": 43264,
      "name": "Existing product",
      "inventory": {
        "warehouses": [
          {
            "locality": "MOEMA",
            "quantity": 3,
            "type": "PHYSICAL_STORE"
          }
        ]
      }
    }

    await expect(productService.create(productData)).rejects.toEqual(
      new AppError('Produto já está cadastrado', 400)
    );

  })

})
