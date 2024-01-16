import InMemoryProductData from "../data/in-memory/InMemoryProductData";
import ProductsController from "./ProductController";

export default [
  new ProductsController(new InMemoryProductData())
];
