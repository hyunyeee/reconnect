const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiClient<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw {
      code: data.code || "UNKNOWN_ERROR",
      message: data.message || "서버 오류가 발생했습니다.",
      status: res.status,
    };
  }

  return data;
}
