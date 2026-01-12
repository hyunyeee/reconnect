"use client";

import { ReactNode, useRef } from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { isAuthExpiredError } from "@/lib/api/isAuthExpiredError";
import { canHandleAuthExpire } from "@/lib/api/authExpireGuard";

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    const queryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          if (!isAuthExpiredError(error)) return;

          // 이미 처리 중이면 무시
          if (!canHandleAuthExpire()) return;

          const ok = window.confirm("로그인이 필요합니다.");

          if (!ok) return;

          // 모든 쿼리 중단 + 제거
          queryClient.cancelQueries();
          queryClient.clear();

          window.location.replace("/login");
        },
      }),
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
          staleTime: 1000 * 30,
        },
        mutations: {
          retry: false,
        },
      },
    });

    queryClientRef.current = queryClient;
  }

  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
}
