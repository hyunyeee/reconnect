"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageSquareText } from "lucide-react";

const confettiVariants: Variants = {
  hidden: { opacity: 0, y: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: [0, -100, 0], // 위로 올라갔다가 내려오는 효과
    x: Math.random() * 150 - 75, // 좌우로 퍼지는 효과를 줄이고 중앙에 가깝게
    scale: [0.5, 1.2, 1],
    transition: {
      delay: i * 0.1,
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeOut",
    },
  }),
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function MatchedClient() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 p-8 text-white">
      {/* 배경 블러 효과 */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-pink-600 opacity-15 blur-3xl duration-5000"></div>
      <div className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-fuchsia-600 opacity-15 blur-3xl delay-1000 duration-5000"></div>

      {/* 🎉 축하 폭죽 효과 (하트) - z-index 추가 및 x 범위 조정 */}
      {[...Array(10)].map(
        (
          _,
          i, // 하트 개수
        ) => (
          <motion.div
            key={i}
            className="absolute z-20 text-2xl opacity-0"
            variants={confettiVariants}
            custom={i}
            initial="hidden"
            animate="visible"
          >
            💖
          </motion.div>
        ),
      )}

      <motion.div
        className="z-10 max-w-lg rounded-xl border border-pink-700/50 bg-gray-800/70 p-8 text-center shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="animate"
      >
        {/* 상단 핑크색 원 */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-pink-500">
            <CheckCircle className="h-16 w-16 text-white" /> {/* 아이콘 색상 흰색 */}
          </div>
        </motion.div>

        <motion.h1
          className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl" // 폰트 크기 조정
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="text-pink-400">축하합니다!</span> 매칭이 성사되었습니다!
        </motion.h1>

        <motion.p
          className="mb-6 text-base leading-relaxed text-gray-300 md:text-lg" // 폰트 크기 및 줄 간격 조정
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          운명처럼 다시 만난 두 분의 소중한 인연이 연결되었습니다.
        </motion.p>

        <motion.div
          className="mt-8 rounded-lg border border-pink-600/50 bg-pink-900/30 p-4" // 마진 조정
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <p className="flex items-center justify-center text-sm text-gray-200">
            <MessageSquareText className="mr-2 h-4 w-4 text-pink-300" />
            두분의 마음이 이어졌습니다!
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <Link href="/" passHref>
            <Button
              // 버튼 스타일을 이미지에 맞춰 재조정 (outline variant에 배경색 transparent)
              variant="outline"
              className="border-pink-600 bg-transparent px-6 py-3 text-pink-400 transition duration-300 hover:bg-pink-900/50"
            >
              메인으로
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
