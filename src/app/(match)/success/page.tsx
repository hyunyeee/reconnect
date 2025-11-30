"use client";

import { useEffect } from "react";
import { motion, useAnimate, stagger, useAnimation } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEmojiExplosion } from "use-emoji-effects";

export default function MatchedClient() {
  const emojiRef = useEmojiExplosion({
    emojis: ["💖", "💗", "💞"],
    emojiCount: 20,
    spread: 256,
  });

  // svg controller
  const heartControls = useAnimation();

  // Animate scopes
  const [textScope, animateText] = useAnimate();
  const [buttonScope, animateButton] = useAnimate();

  useEffect(() => {
    (async () => {
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
  }, [heartControls, animateText, animateButton]);

  return (
    <main className="relative flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-4 py-6">
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, transform: "scale(0.9)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        transition={{ duration: 0.8 }}
      >
        {/* 하트 SVG */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d5356b"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-2 size-14 md:mb-4 md:size-20"
        >
          <motion.path
            d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
            stroke="#d5356b"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, fill: "transparent" }}
            animate={heartControls}
          />
        </motion.svg>

        {/* 텍스트 */}
        <div ref={textScope} style={{ opacity: 0, transform: "translateY(20px)" }}>
          <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            매칭이 성사되었습니다!
          </h1>
          <p className="text-base text-gray-600 md:text-lg">
            축하합니다. 두분의 마음이 이어졌습니다!
          </p>
        </div>

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
