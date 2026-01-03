import type { ApiError } from "@/types/api";
import { isApiError } from "./isApiError";

export function isAuthExpiredError(error: unknown): error is ApiError {
  if (!isApiError(error)) return false;

  return error.status === 401;
}
