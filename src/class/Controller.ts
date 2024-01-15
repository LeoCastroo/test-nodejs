import express from "express";

abstract class Controller {
  public router = express.Router();
  constructor() {
    this.initRoutes();
  }

  abstract initRoutes(): void;
}

export default Controller;
