"use client";

import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { KakaoAdFit } from "@/components/KaKaoAdFit";

import { useAtomValue } from "jotai";
import { authAtom } from "@/atoms/auth";
import { useLogout } from "@/hooks/query/useAuth";
import { PopAnimatedText } from "@/styles/PopAnimatedText";
import FloatingContactButton from "@/components/FloatingContactButton";

export default function LandingClient() {
  const [h1Scope, animateH1] = useAnimate();
  const [descScope, animateDesc] = useAnimate();
  const [labelScope, animateLabel] = useAnimate();
  const [buttonsScope, animateButtons] = useAnimate();

  const { isLoggedIn } = useAtomValue(authAtom);
  const logout = useLogout();

  // 애니메이션 재생 순서 제어
  useEffect(() => {
    (async () => {
      // 1) h1 (글자별 stagger)
      // animateH1은 h1Scope 내부에서 "span" 선택자를 찾아 애니메이션 실행
      await animateH1(
        "span",
        { opacity: 1, y: 0, filter: "blur(0px)" },
        { duration: 0.45, ease: "easeOut", delay: stagger(0.04) },
      );

      // 템포 조절
      await new Promise((r) => setTimeout(r, 120));

      // 2) 설명문
      // animateDesc는 descScope 내부의 루트 요소(예: p) 자체를 애니메이션
      await animateDesc(
        descScope.current!,
        { opacity: 1, y: 0 },
        { duration: 0.45, ease: "easeOut" },
      );

      await new Promise((r) => setTimeout(r, 120));

      // 4) 버튼들
      await animateButtons(
        buttonsScope.current!,
        { opacity: 1, y: 0 },
        { duration: 0.45, ease: "easeOut" },
      );
    })();
  }, [animateH1, animateDesc, animateLabel, animateButtons, descScope, labelScope, buttonsScope]);

  return (
    <main className="relative flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-4 py-6">
      <KakaoAdFit unit="DAN-aLlyYJ68qqHuPvdY" width={300} height={250} />
      <KakaoAdFit unit="DAN-ZOGkyfi9vPA93ivl" width={300} height={250} />
      <KakaoAdFit unit="DAN-wAz4OD2dxCo8DFqy" width={320} height={100} />

      <div className="w-full">
        <div className="relative mb-6 size-6">
          <Heart className="fill-main-pink text-main-pink absolute top-0 left-0 size-6" />
          <Heart className="fill-main-pink text-main-pink/60 absolute top-0 left-0 size-6 animate-ping duration-1700" />
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

        <div
          ref={buttonsScope}
          style={{ opacity: 0, transform: "translateY(20px)" }}
          className="mt-14 md:mt-18"
        >
          <Link href={isLoggedIn ? "/match" : "/login"} passHref>
            <Button
              className="group bg-main-pink h-10 w-full border-none text-white shadow-none transition duration-300 hover:bg-[#A41847] hover:text-white md:w-auto"
              variant="default"
            >
              {isLoggedIn ? "💞 매칭 결과 확인하기" : "✨ 재회 가능성 테스트 시작하기"}
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          {isLoggedIn && (
            <button
              onClick={() => {
                const ok = confirm("로그아웃 할까요?");
                if (ok) {
                  logout.mutate();
                }
              }}
              className="mt-4 w-full text-center text-sm text-gray-400 underline underline-offset-4 hover:text-gray-600"
            >
              로그아웃
            </button>
          )}
        </div>
        <FloatingContactButton />
      </div>
    </main>
  );
}
