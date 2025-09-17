import type { ErrorResponse } from "@app-types/services/services.types";

class ResponseError extends Error {
  code?: string;
  status?: number;

  constructor({ code, message, status }: Partial<ErrorResponse>) {
    super(message);

    this.code = code;
    this.status = status;
  }
}

export { ResponseError };
