"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEmojiExplosion } from "use-emoji-effects";
import { useEffect } from "react";

export default function MatchedClient() {
  const emojiRef = useEmojiExplosion({
    emojis: ["💖", "💗", "💞"],
    emojiCount: 20,
    spread: 256,
  });

  const heartControls = useAnimation();
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // 하트 Draw
      await heartControls.start({
        pathLength: 1,
        transition: { duration: 2, ease: "easeInOut" },
      });

      // 하트 펄스
      heartControls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.6, ease: "easeOut" },
      });

      // 텍스트 등장 (h1 + p)
      textControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      });

      // 버튼 등장
      buttonControls.start({
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
      });
    }

    sequence();
  }, [heartControls, textControls, buttonControls]);

  return (
    <main className="relative flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-4 py-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 하트 아이콘 */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f6339a"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-2 size-14 md:mb-4 md:size-20"
        >
          <motion.path
            d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
            initial={{ pathLength: 0, fill: "transparent" }}
            animate={heartControls}
          />
        </motion.svg>
        {/* 헤딩 텍스트 */}
        <motion.h1
          className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={textControls}
        >
          매칭이 성사되었습니다!
        </motion.h1>

        {/* 추가 설명 */}
        <motion.p
          className="text-base text-gray-600 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={textControls}
        >
          축하합니다. 두분의 마음이 이어졌습니다!
        </motion.p>

        {/* 돌아가기 버튼 */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={buttonControls}
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
        </motion.div>
      </motion.div>
    </main>
  );
}
