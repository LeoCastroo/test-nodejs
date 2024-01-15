import { NextFunction, Request, Response } from "express";
import AppError from "../class/AppError";

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {

  if (error.name === "RequestError") {
    return res.status(500).json({ msg: error.message.split("-")[error.message.split("-").length - 1] });
  }

  if (error instanceof AppError) {
    return res.status(error.code).json({ msg: error.message });
  } else {
    return res.status(500).json({ msg: "Erro interno no servidor" });
  }
};

export default errorMiddleware;
