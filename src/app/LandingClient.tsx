"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

import { useAtomValue } from "jotai";
import { authAtom } from "@/atoms/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "@/hooks/query/useAuth";
import FloatingButtons from "@/components/layout/FloatingButtons/FloatingButtons";
import { MyPageNavbar } from "@/components/layout/MyPageNavbar";

const IS_MAINTENANCE = false;

export default function LandingClient() {
  const { isLoggedIn } = useAtomValue(authAtom);
  const queryClient = useQueryClient();
  const logout = useLogout();

  return (
    <>
      {!IS_MAINTENANCE && isLoggedIn && (
        <div className="pointer-events-auto fixed top-4 right-4 z-[9999]">
          <MyPageNavbar />
        </div>
      )}

      <main className="relative flex min-h-screen max-w-md flex-col px-4 py-6 sm:max-w-lg md:max-w-xl">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full">
            {/* 하트 (이건 LCP 아님, 유지해도 무방) */}
            <div className="relative mb-6 size-6">
              <Heart className="fill-main-pink text-main-pink absolute inset-0" />
              <Heart className="fill-main-pink text-main-pink/60 absolute inset-0 animate-ping duration-1700" />
            </div>

            {/* ================= LCP 영역 (절대 건들지 말 것) ================= */}

            <h1 className="mb-5 text-[2.25rem] leading-tight font-extrabold tracking-tight text-gray-900 sm:text-[2.75rem] md:text-[3.25rem]">
              다시 만나고 싶은 <span className="text-main-pink">사람</span>이 있나요?
            </h1>

            <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
              가장 소중한 순간의 기억을 운명적인 재회로 이어드립니다.
            </p>

            {/* ================= CTA 영역 (여기부터 애니메이션) ================= */}

            {IS_MAINTENANCE ? (
              <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
                <p className="text-base font-semibold text-gray-800">🚧 서비스 점검 중입니다</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="mt-12 space-y-3"
              >
                <Link href={isLoggedIn ? "/match" : "/login"}>
                  <Button className="group bg-main-pink h-11 w-full text-sm font-medium text-white hover:bg-[#A41847] sm:text-base">
                    {isLoggedIn ? "💞 매칭 결과 확인하기" : "✨ 다시 만나고 싶어요"}
                    <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href={isLoggedIn ? "/attachment-test" : "/login?redirect=/attachment-test"}>
                  <Button
                    variant="outline"
                    className="mt-2 h-11 w-full border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:text-base"
                  >
                    💭 내 애착 유형 알아보기
                  </Button>
                </Link>

                <Link href="/posts">
                  <Button
                    variant="outline"
                    className="border-main-pink/20 bg-main-pink/5 hover:bg-main-pink/10 mt-2 h-11 w-full text-sm font-medium text-gray-800 sm:text-base"
                  >
                    👥 커뮤니티 보기
                  </Button>
                </Link>

                {isLoggedIn && (
                  <button
                    onClick={() => {
                      if (confirm("로그아웃 할까요?")) {
                        logout.mutate();
                        queryClient.clear();
                      }
                    }}
                    className="mt-4 w-full text-center text-xs text-gray-400 underline underline-offset-4 hover:text-gray-600"
                  >
                    로그아웃
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {!IS_MAINTENANCE && <FloatingButtons />}
      </main>
    </>
  );
}
