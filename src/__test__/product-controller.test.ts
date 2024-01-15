import App from "../app";
import controller from "../controller";

import request from "supertest"

const app = new App(controller).app;

describe("Criação de produto Controller", () => {
  it("Deve ser possível criar um novo produto", async () => {
    const response = await request(app)
      .post("/products")
      .send(
        {
          "sku": 5448,
          "name": "New product",
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
      )
      expect(response.status).toBe(201)
  })

  it("Não deve ser possível criar um produto existente", async () => {
    const response = await request(app)
      .post("/products")
      .send(
        {
          "sku": 5448,
          "name": "New product",
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
      )
      expect(response.status).toBe(400)
  })
})

describe("Edição do produto Controller", () => {
  it("Deve ser possível criar um novo produto", async () => {
    const response = await request(app)
      .put("/products/5448")
      .send(
        {
          "sku": 5448,
          "name": "Edit product",
          "inventory": {
            "warehouses": [
              {
                "locality": "MOEMAS",
                "quantity": 3,
                "type": "PHYSICAL_STORE"
              }
            ]
          }
        }
      )
      expect(response.status).toBe(201)
  })

  it("Não deve ser possível criar um produto existente", async () => {
    const response = await request(app)
      .put("/products/5448")
      .send(
        {
          "sku": 87,
          "name": "Edit product",
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
      )
      expect(response.status).toBe(400)
  })
})
