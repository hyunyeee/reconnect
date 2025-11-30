"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WaitingClient() {
  return (
    <main className="relative flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-4 py-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 로딩 아이콘과 애니메이션 */}
        <motion.div
          // 위로 8px 점프했다가 다시 내려오기
          animate={{ y: [0, -8, 0] }}
          transition={{
            y: {
              duration: 2, // 점프 속도
              repeat: Infinity, // 계속 반복
              repeatType: "loop",
              delay: 0.2,
            },
          }}
          className="mb-2 inline-block md:mb-4"
        >
          <HeartHandshake className="size-14 text-pink-500 md:size-20" />
        </motion.div>

        {/* 헤딩 텍스트 */}
        <motion.h1
          className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 md:text-4xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          기다리는 중...
        </motion.h1>

        {/* 안내 사항 */}
        <motion.p
          className="text-base text-gray-600 md:text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          두 분의 마음이 닿으면 알림을 보내드리겠습니다.
        </motion.p>

        {/* 돌아가기 버튼 */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Link href="/" passHref>
            <Button
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
