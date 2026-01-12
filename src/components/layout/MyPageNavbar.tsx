"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLogout } from "@/hooks/query/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export function MyPageNavbar() {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("로그아웃 할까요?")) return;
    logout.mutate();
    queryClient.clear();
    setOpen(false);
  };

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* 햄버거 버튼 */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="rounded p-1 transition hover:bg-neutral-200"
        aria-label="메뉴 열기"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* 메뉴 */}
      {open && (
        <div className="absolute top-[120%] right-0 z-50 w-44 rounded-md border border-neutral-200 bg-white shadow">
          <Link
            href="/mypage/profile"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="block px-4 py-3 text-sm text-gray-800 hover:bg-neutral-100"
          >
            내 정보 수정
          </Link>

          <Link
            href="/mypage/password"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="block px-4 py-3 text-sm text-gray-800 hover:bg-neutral-100"
          >
            비밀번호 변경
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="block w-full px-4 py-3 text-left text-sm text-gray-500 hover:bg-neutral-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
