"use client";

import { useAnimate } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { KakaoAdFit } from "@/components/KaKaoAdFit";

import { useAtomValue } from "jotai";
import { authAtom } from "@/atoms/auth";
import { useLogout } from "@/hooks/query/useAuth";
import { PopAnimatedText } from "@/styles/PopAnimatedText";
import FloatingContactButton from "@/components/FloatingContactButton";
import { useLandingAnimation } from "@/hooks/useLandingAnimation";

export default function LandingClient() {
  const [h1Scope, animateH1] = useAnimate();
  const [descScope, animateDesc] = useAnimate();
  const [buttonsScope, animateButtons] = useAnimate();

  const { isLoggedIn } = useAtomValue(authAtom);
  const logout = useLogout();

  useLandingAnimation({
    animateH1,
    animateDesc,
    animateButtons,
    descScope,
    buttonsScope,
  });

  return (
    <main className="relative flex min-h-screen max-w-md flex-col px-4 py-6">
      {/* ================= 메인 콘텐츠 ================= */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full">
          {/* 하트 아이콘 */}
          <div className="relative mb-6 size-6">
            <Heart className="fill-main-pink text-main-pink absolute inset-0" />
            <Heart className="fill-main-pink text-main-pink/60 absolute inset-0 animate-ping duration-1700" />
          </div>

          {/* --- PopAnimatedText: scope를 넘겨주기 */}
          <PopAnimatedText
            scope={h1Scope}
            texts={["다시 만나고 싶은", "사람이 있나요?"]}
            className="mb-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            styledRanges={[
              { target: "사", className: "text-main-pink" },
              { target: "람", className: "text-main-pink" },
            ]}
          />

          <p
            ref={descScope}
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="text-base text-gray-600 md:text-lg"
          >
            가장 소중한 순간의 기억을 운명적인 재회로 이어드립니다.
          </p>

          {/* CTA 영역 */}
          <div
            ref={buttonsScope}
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="mt-14"
          >
            <Link href={isLoggedIn ? "/match" : "/login"} passHref>
              <Button className="group bg-main-pink h-10 w-full text-white hover:bg-[#A41847]">
                {isLoggedIn ? "💞 매칭 결과 확인하기" : "✨ 재회 가능성 테스트 시작하기"}
                <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            {isLoggedIn && (
              <button
                onClick={() => {
                  if (confirm("로그아웃 할까요?")) logout.mutate();
                }}
                className="mt-4 w-full text-center text-sm text-gray-400 underline underline-offset-4 hover:text-gray-600"
              >
                로그아웃
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= 광고 영역 (하단 서브 섹션) ================= */}
      <div className="mt-16 w-full border-t border-gray-100 pt-6">
        {/*<p className="mb-4 text-center text-xs text-gray-400">추천 상품</p>*/}

        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <KakaoAdFit unit="DAN-aLlyYJ68qqHuPvdY" width={300} height={250} />
          <KakaoAdFit unit="DAN-ZOGkyfi9vPA93ivl" width={300} height={250} />
          <KakaoAdFit unit="DAN-wAz4OD2dxCo8DFqy" width={320} height={100} />
        </div>
      </div>

      {/* ================= 고정 문의 버튼 ================= */}
      <FloatingContactButton />
    </main>
  );
}
