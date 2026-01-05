import type { ApiError } from "@/types/api";

export function isApiError(error: unknown): error is ApiError {
  if (typeof error !== "object" || error === null) return false;

  const e = error as Record<string, unknown>;

  return (
    typeof e.code === "string" && typeof e.message === "string" && typeof e.status === "number"
  );
}
