"use client";

import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export default function LandingClient() {
  const [h1Scope, animateH1] = useAnimate();
  const [descScope, animateDesc] = useAnimate();
  const [labelScope, animateLabel] = useAnimate();
  const [buttonsScope, animateButtons] = useAnimate();

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
      <div className="w-full">
        <div className="relative mb-6 size-5">
          <Heart className="fill-main-pink text-main-pink absolute top-0 left-0 size-5" />
          <Heart className="fill-main-pink text-main-pink/60 absolute top-0 left-0 size-5 animate-ping duration-1700" />
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

        {/* <div
          // 라벨 DOM 위치는 상단에 있지만 시퀀스상 3번째로 재생됨
          ref={labelScope}
          style={{ opacity: 0, transform: "translateY(20px)" }}
          className="mb-2 flex items-center justify-center gap-1 text-sm font-semibold tracking-tight text-main-pink md:text-base"
        >
          놓치고 싶지 않은 단 하나의 인연
        </div> */}

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
          <Link href="/login" passHref>
            <Button
              className="group bg-main-pink h-10 w-full border-none text-white shadow-none transition duration-300 hover:bg-[#A41847] hover:text-white md:w-auto"
              variant="default"
            >
              재회를 위한 마음 등록하기
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="/home" passHref>
            <Button
              className="group bg-main-pink mt-3 h-10 w-full border-none text-white shadow-none transition duration-300 hover:bg-[#A41847] hover:text-white md:w-auto"
              variant="default"
            >
              메뉴 선택 페이지(로그인 후에만 접근 가능한 메뉴들)
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* ----------------------------- PopAnimatedText ------------------------------- */
/* -------------------------------------------------------------------------- */

interface StyledRange {
  target: string; // 강조할 글자 또는 단어(현재는 글자 단위 매칭)
  className: string;
}

interface PopAnimatedTextProps {
  texts: string[]; // 줄마다 배열로 전달 (줄바꿈 처리 용이)
  className?: string;
  charDelay?: number; // (참고) stagger 값은 부모에서 제어하므로 여기선 사용 X
  styledRanges?: StyledRange[];
  scope: React.RefObject<HTMLHeadingElement>; // useAnimate()에서 받은 scope를 전달
}

/**
 * PopAnimatedText
 * - 각 글자를 <span>으로 만들고 초기 스타일(숨김, 아래로 이동, blur) 적용
 * - 실제 애니메이션은 외부(부모)에서 useAnimate로 제어
 */
function PopAnimatedText({
  texts,
  className = "",
  styledRanges = [],
  scope,
}: PopAnimatedTextProps) {
  const getCharClass = (char: string) => {
    const match = styledRanges.find((s) => s.target === char);
    return match ? match.className : "";
  };

  return (
    // scope를 ref로 전달 (useAnimate에서 반환된 ref)
    <h1 ref={scope} className={className}>
      {texts.map((line, lineIndex) => (
        <p key={lineIndex}>
          {line.split("").map((char, i) => (
            <span
              key={i}
              // 애니메이션은 부모가 담당하므로 여기선 초기 스타일만 지정
              style={{
                display: "inline-block",
                opacity: 0,
                transform: "translateY(30px)",
                filter: "blur(4px)",
              }}
              className={getCharClass(char)}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      ))}
    </h1>
  );
}
