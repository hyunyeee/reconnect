"use client";

import { useEffect } from "react";
import { motion, useAnimate, stagger, useAnimation } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEmojiExplosion } from "use-emoji-effects";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMatchInfo } from "@/hooks/query/useMatch";

export default function MatchedClient() {
  const emojiRef = useEmojiExplosion({
    emojis: ["💖", "💗", "💞"],
    emojiCount: 20,
    spread: 256,
  });

  const heartControls = useAnimation();
  const [textScope, animateText] = useAnimate();
  const [buttonScope, animateButton] = useAnimate();

  const { data, isLoading } = useMatchInfo();

  useEffect(() => {
    // DOM이 아직 없으면 애니메이션 금지
    if (!textScope.current || !buttonScope.current) return;

    (async () => {
      // 1) 하트 그리기
      await heartControls.start({
        pathLength: 1,
        transition: { duration: 2, ease: "easeInOut" },
      });

      // 2) 하트 펄스
      await heartControls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.6, ease: "easeOut" },
      });

      // 3) 텍스트 등장
      await animateText(
        textScope.current,
        { opacity: 1, transform: "translateY(0)" },
        { duration: 0.5, ease: "easeOut", delay: stagger(0.1) },
      );

      // 4) 버튼 등장
      await animateButton(
        buttonScope.current,
        { opacity: 1, transform: "translateY(0)" },
        { duration: 0.5, ease: "easeOut", delay: 0.2 },
      );
    })();
  }, [heartControls, animateText, animateButton, textScope, buttonScope]);

  if (isLoading || !data?.data) {
    return (
      <p className="mt-10 text-center text-sm text-gray-500">매칭 결과를 불러오는 중이에요...</p>
    );
  }

  const info = data.data;

  return (
    <main className="relative flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-4 py-6">
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 하트 SVG */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d5356b"
          strokeWidth={2}
          className="mx-auto mb-2 size-14 md:mb-4 md:size-20"
        >
          <motion.path
            d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
            initial={{ pathLength: 0 }}
            animate={heartControls}
          />
        </motion.svg>

        {/* 텍스트 (애니메이션 대상) */}
        <div ref={textScope} style={{ opacity: 0, transform: "translateY(20px)" }}>
          <h1 className="mb-2 text-2xl font-extrabold md:text-4xl">매칭이 성사되었습니다!</h1>
          <p className="text-muted-foreground md:text-lg">{info.matchMessage}</p>
        </div>

        {/* 상대 정보 카드 */}
        <Card className="mt-8 text-left">
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-muted-foreground text-sm font-semibold">상대방 정보</h2>
            <Separator />
            <InfoRow label="이름" value={info.targetName} />
            <InfoRow label="전화번호" value={info.targetPhone} />
            <InfoRow label="인스타그램" value={`@${info.targetInsta}`} />
            <InfoRow label="재회 의지" value={`${info.requesterDesire} / 100`} />
          </CardContent>
        </Card>

        {/* 버튼 */}
        <div
          ref={buttonScope}
          style={{ opacity: 0, transform: "translateY(20px)" }}
          className="mt-12 md:mt-16"
        >
          <Link href="/" passHref>
            <Button
              ref={emojiRef}
              variant="outline"
              className="bg-main-pink h-10 w-full border-none text-white shadow-none transition duration-300 hover:bg-[#A41847] hover:text-white md:w-auto"
            >
              메인 페이지로 돌아가기
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
