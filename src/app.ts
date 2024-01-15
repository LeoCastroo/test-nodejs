import express from "express";
import path from "path";
import yaml from "yamljs";
import swaggerUi from "swagger-ui-express";
import errorMiddleware from "./middleware/ErrorMiddleware";
import bodyParser from 'body-parser';

interface IController {
  router: express.Router;
}

class App {
  public app: express.Application;

  constructor(private controller: IController[]) {
    this.app = express();

    this.initMiddleware();
    this.initController();
    //this.initDocument();
    this.errorHandler();
  }

  initMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.resolve(__dirname, "..", "public")));
  }

  initController() {
    this.controller.forEach((controller) => this.app.use("/", controller.router));
  }

  initDocument() {
    const doc = yaml.load(path.resolve(__dirname, "..", "doc", "doc.yaml"));
    this.app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(doc));
  }

  errorHandler() {
    this.app.use(errorMiddleware);
  }
}

export default App;
