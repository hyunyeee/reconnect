"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMatchInfo } from "@/hooks/query/useMatch";
import { useRouter } from "next/navigation";

export default function WaitingClient() {
  const { data: infoRes, isLoading, isError } = useMatchInfo();
  const router = useRouter();

  if (isLoading) {
    return <p className="mt-10 text-center text-gray-500">정보를 불러오는 중입니다...</p>;
  }

  if (isError || !infoRes || !infoRes.data) {
    return <p className="mt-10 text-center text-red-500">정보를 가져오지 못했습니다.</p>;
  }

  const info = infoRes.data;

  return (
    <main className="relative flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-4 py-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            y: { duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.2 },
          }}
          className="mb-2 inline-block md:mb-4"
        >
          <HeartHandshake className="text-main-pink size-14 md:size-20" />
        </motion.div>

        <motion.h1
          className="mb-2 text-2xl font-extrabold text-gray-900 md:text-4xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          기다리는 중...
        </motion.h1>

        <motion.p
          className="text-base text-gray-600 md:text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          두 분의 마음이 닿으면 알림을 보내드리겠습니다.
        </motion.p>

        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="bg-main-pink h-10 w-full border-none text-white hover:bg-[#A41847] md:w-auto"
            >
              메인 페이지로 돌아가기
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 상대방 정보 조회 카드 */}
      <motion.div
        className="mt-12 w-full max-w-md rounded-xl border bg-white p-5 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-800">상대방 정보</h2>

        <div className="space-y-3 text-gray-700">
          <Row label="이름" value={info.targetName} />
          <Row label="전화번호" value={info.targetPhone} />
          <Row label="인스타그램" value={`@${info.targetInsta || "-"}`} />
          <Row label="재회 의지" value={`${info.requesterDesire} / 100`} />
        </div>

        <div className="mt-6 text-right">
          <Button
            variant="ghost"
            onClick={() => router.push("/match?mode=edit")}
            className="mt-2 ml-auto rounded-md px-3 py-1 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            정보 수정하기
          </Button>
        </div>
      </motion.div>
    </main>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="font-medium text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);
