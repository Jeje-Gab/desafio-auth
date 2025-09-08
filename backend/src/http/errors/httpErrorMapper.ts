import { DomainError, EmailTakenError, InvalidCredentialsError, NotFoundError } from "../../core/errors";

export function mapDomainError(err: unknown): { status: number; body: { message: string; code: string } } | null {
  if (!(err instanceof DomainError)) return null;

  if (err instanceof EmailTakenError)           return { status: 409, body: { message: err.message, code: err.code } };
  if (err instanceof InvalidCredentialsError)   return { status: 401, body: { message: err.message, code: err.code } };
  if (err instanceof NotFoundError)             return { status: 404, body: { message: err.message, code: err.code } };

  return { status: 400, body: { message: err.message, code: err.code } };
}
