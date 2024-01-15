import { NextFunction, Request, Response } from "express";

const asyncHandler = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next))
    .then(promise => { return promise; })
    .catch(async error => {
      return res.status(error.code ? error.code : 400).json({ msg: error.message ? error.message : "Erro interno, favor entrar em contato com o T.I" });
    });

};

export default asyncHandler;
