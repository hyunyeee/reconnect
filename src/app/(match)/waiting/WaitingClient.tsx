"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMatchInfo, MatchChannel } from "@/hooks/query/useMatch";
import { getMatchLabel } from "@/utils/matchLabel";
import { useRouter } from "next/navigation";

interface Props {
  channel: MatchChannel;
}

export default function WaitingClient({ channel }: Props) {
  const router = useRouter();

  const { data: infoRes, isLoading, isError } = useMatchInfo(channel);

  if (isLoading) {
    return <p className="mt-10 text-center text-gray-500">정보를 불러오는 중입니다...</p>;
  }

  if (isError || !infoRes?.data) {
    return <p className="mt-10 text-center text-red-500">정보를 가져오지 못했습니다.</p>;
  }

  const info = infoRes.data;
  const matchLabel = getMatchLabel(info);

  return (
    <main className="relative flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeartHandshake className="text-main-pink mx-auto size-14 md:size-20" />

        <h1 className="mt-4 text-2xl font-extrabold md:text-4xl">기다리는 중...</h1>

        <p className="mt-2 text-gray-600 md:text-lg">
          두 분의 마음이 닿으면 알림을 보내드리겠습니다.
        </p>

        <div className="mt-12">
          <Button className="bg-main-pink w-full text-white" onClick={() => router.push("/")}>
            메인 페이지로 돌아가기
          </Button>
        </div>
      </motion.div>

      {/* 상대방 정보 */}
      <motion.div
        className="mt-12 w-full rounded-xl border bg-white p-5 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-4 text-lg font-semibold">상대방 정보</h2>

        <div className="space-y-3 text-sm">
          <Row label="이름" value={info.targetName} />
          <Row label="전화번호" value={info.targetPhone} />

          {matchLabel && <Row label={matchLabel.label} value={matchLabel.value} />}

          <Row label="재회 의지" value={`${info.requesterDesire} / 100`} />
        </div>

        <div className="mt-6 text-right">
          <Button variant="ghost" onClick={() => router.push(`/match/${channel}?mode=edit`)}>
            정보 수정하기
          </Button>
        </div>
      </motion.div>
    </main>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
