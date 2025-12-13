"use client";

import { Provider, createStore } from "jotai";
import { useRef } from "react";
import { authAtom } from "@/atoms/auth";

export function Providers({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  const storeRef = useRef<ReturnType<typeof createStore> | null>(null);

  if (!storeRef.current) {
    const store = createStore();
    store.set(authAtom, { isLoggedIn });
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
