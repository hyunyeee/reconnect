"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export default function LandingClient() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 text-white">
      <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-pink-600 opacity-20 blur-3xl duration-5000"></div>
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-fuchsia-600 opacity-20 blur-3xl delay-1000 duration-5000"></div>

      <motion.div
        className="z-10 max-w-3xl p-6 text-center sm:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-md mb-4 flex items-center justify-center font-semibold tracking-widest text-pink-400"
          variants={itemVariants}
        >
          <Heart className="mr-2 h-5 w-5 fill-pink-400" />
          놓치고 싶지 않은 단 하나의 인연
        </motion.p>

        <motion.h1
          className="mb-6 text-center text-5xl font-extrabold tracking-tight text-white md:text-6xl"
          variants={itemVariants}
        >
          다시 만나고 싶은 <span className="text-pink-400">사람</span>이 있나요?
        </motion.h1>

        <motion.p
          className="mb-12 text-center text-lg text-gray-300 md:text-xl"
          variants={itemVariants}
        >
          가장 소중한 순간의 기억을 운명적인 재회로 이어드립니다.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link href="/login" passHref>
            <Button
              className="group transform rounded-xl bg-pink-600 px-8 py-6 text-lg font-bold text-white shadow-xl shadow-pink-500/50 transition-all duration-300 hover:scale-[1.03] hover:bg-pink-700"
              variant="default"
            >
              재회를 위한 마음 등록하기
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/home" passHref>
            <Button
              className="mt-8 group transform rounded-xl bg-pink-600 px-8 py-6 text-md font-bold text-white shadow-xl shadow-pink-500/50 transition-all duration-300 hover:scale-[1.03] hover:bg-pink-700"
              variant="default"
            >
              메뉴 선택 페이지(로그인 후에만 접근 가능한 메뉴들)
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
