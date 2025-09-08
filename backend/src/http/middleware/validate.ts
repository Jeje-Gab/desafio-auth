import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const first = err.issues[0]?.message ?? "Erro de validação";
        return res.status(400).json({ message: first, errors: err.issues });
      }
      next(err);
    }
  };
}
