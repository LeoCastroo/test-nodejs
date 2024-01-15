import { Warehouse } from "./Warehouse";

export interface Product {
  sku: number;
  name: string;
  inventory: {
      warehouses: Warehouse[];
  };
}
