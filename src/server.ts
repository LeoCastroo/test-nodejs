import { resolve } from "path";
import dotenv from "dotenv";
import App from "./app";
import controller from "./controller";

dotenv.config({ path: resolve(__dirname, "..", ".env") });

const app = new App(controller).app;

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta:${process.env.PORT} http`));
