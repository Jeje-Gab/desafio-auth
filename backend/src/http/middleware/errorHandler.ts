import { NextFunction, Request, Response } from "express";
import { mapDomainError } from "../errors/httpErrorMapper";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const mapped = mapDomainError(err);
  if (mapped) return res.status(mapped.status).json(mapped.body);

  // fallback genérico
  console.error(err);
  return res.status(500).json({ message: "Erro interno" });
}
