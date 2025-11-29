"use client";

import { motion } from "framer-motion";
import { Clock, HeartHandshake, Loader2 } from "lucide-react"; // 아이콘 추가
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WaitingClient() {
  return (
    // 배경: 랜딩 페이지와 동일한 깊은 다크 모드
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 p-8 text-white">
      {/* 배경 블러 효과: 움직이는 사랑 테마 블러 유지 */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-pink-600 opacity-15 blur-3xl duration-5000"></div>
      <div className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-fuchsia-600 opacity-15 blur-3xl delay-1000 duration-5000"></div>

      <motion.div
        className="z-10 max-w-lg p-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 로딩 아이콘과 애니메이션 */}
        <motion.div
          animate={{ rotate: 360 }} // 아이콘 회전 애니메이션
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="mb-8 inline-block"
        >
          {/* HeartHandshake 아이콘 사용 */}
          <HeartHandshake className="h-20 w-20 text-pink-500" />
        </motion.div>

        <motion.h1
          className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          기다리는중...
        </motion.h1>

        {/*<motion.p*/}
        {/*  className="mb-6 text-lg text-gray-400 md:text-xl"*/}
        {/*  initial={{ y: 20, opacity: 0 }}*/}
        {/*  animate={{ y: 0, opacity: 1 }}*/}
        {/*  transition={{ delay: 0.6, duration: 0.5 }}*/}
        {/*>*/}
        {/*  두 분의 마음이 닿으면 알림을 보내드리겠습니다*/}
        {/*</motion.p>*/}

        {/* 진행 상태 표시 */}
        <motion.div
          className="mt-8 flex items-center justify-center space-x-2 text-pink-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {/*<Loader2 className="h-5 w-5 animate-spin" />*/}
          {/*<span className="font-medium">그 사람을 기다리는중...</span>*/}
        </motion.div>

        {/* 안내 사항 */}
        <motion.div
          className="mt-12 rounded-xl border border-pink-700/50 bg-gray-800 p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="flex items-center text-sm text-gray-300">
            <Clock className="mr-2 h-4 w-4 text-pink-400" />
            두 분의 마음이 닿으면 알림을 보내드리겠습니다
          </p>
        </motion.div>

        {/* 돌아가기 버튼 */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="w-full border-pink-600 text-pink-400 transition duration-300 hover:bg-pink-900/50 sm:w-auto"
            >
              메인 페이지로 돌아가기
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
