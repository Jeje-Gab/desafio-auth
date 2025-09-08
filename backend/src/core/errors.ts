export class DomainError extends Error {
  constructor(public code: string, message?: string) { super(message ?? code); }
}
export class EmailTakenError extends DomainError {
  constructor() { super("EMAIL_TAKEN", "E-mail já cadastrado"); }
}
export class InvalidCredentialsError extends DomainError {
  constructor() { super("INVALID_CREDENTIALS", "Credenciais inválidas"); }
}
export class NotFoundError extends DomainError {
  constructor(resource = "Recurso") { super("NOT_FOUND", `${resource} não encontrado`); }
}
