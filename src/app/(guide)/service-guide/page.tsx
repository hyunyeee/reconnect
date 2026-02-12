"use client";

import Link from "next/link";
import { Info, User, Heart, MessageSquare, Instagram } from "lucide-react";
import { BackHeader } from "@/components/layout/BackHeader";

export default function ServiceGuidePage() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-10">
      <BackHeader backHref="/" />

      {/* 타이틀 */}
      <div className="mt-5 mb-6 flex items-center gap-2">
        <Info className="text-main-pink size-6" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">서비스 안내</h1>
      </div>

      {/* 핵심 요약 */}
      <section className="border-main-pink/20 bg-main-pink/5 mb-8 rounded-2xl border p-5">
        <p className="text-center text-sm font-semibold text-gray-900">
          서로가 서로를 지목한 경우에만
          <br />
          <span className="text-main-pink">매칭이 이루어집니다</span>
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-gray-600">
          <div className="flex flex-col items-center text-xs">
            <User className="mb-1 size-6" />나
          </div>
          <Heart className="text-main-pink size-5" />
          <div className="flex flex-col items-center text-xs">
            <User className="mb-1 size-6" />
            상대방
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          한쪽만 등록한 경우
          <br />
          아무 알림도 발생하지 않습니다.
        </p>
      </section>

      {/* 단계별 설명 */}
      <div className="space-y-8 text-gray-700">
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-semibold text-gray-900">1️⃣ 상대방 정보 등록</h2>
          <p className="text-sm">
            다시 만나고 싶은 상대방을 특정하기 위해
            <br />
            이름, 전화번호, 인스타그램 또는 틱톡 아이디를 입력합니다.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            입력 정보는 매칭 확인을 위한 기준으로만 사용됩니다.
          </p>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-semibold text-gray-900">📱 플랫폼 기준 매칭 방식</h2>

          <p className="text-sm leading-relaxed">
            인스타그램 아이디는 <strong>인스타그램끼리</strong>만,
            <br />
            틱톡 아이디는 <strong>틱톡끼리</strong>만 매칭이 이루어집니다.
          </p>

          <div className="mt-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
            상대방이 나를 어떤 아이디로 등록할지 알 수 없기 때문에
            <br />
            <span className="font-medium text-gray-800">
              인스타그램과 틱톡 아이디를 모두 입력하는 것을 권장드립니다.
            </span>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-semibold text-gray-900">2️⃣ 상호 지목 확인</h2>
          <p className="text-sm">
            나와 상대방이
            <strong> 서로를 동시에 등록한 경우에만</strong>
            <br />
            매칭이 성사됩니다.
          </p>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-semibold text-gray-900">3️⃣ 매칭 결과 안내</h2>
          <p className="text-sm">
            매칭이 성사되면
            <br />
            <strong>양쪽 모두에게 문자 안내</strong>가 전송됩니다.
          </p>

          <div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
            <MessageSquare className="text-main-pink size-4" />
            서로가 서로를 찾고 있다는 사실만 전달됩니다.
          </div>
        </section>

        {/* 개인정보 안내 링크 */}
        <section className="rounded-xl bg-gray-50 p-4 text-xs text-gray-600">
          개인정보 보호 방식에 대한 자세한 내용은
          <br />
          <Link
            href="/privacy-safe"
            className="text-main-pink font-medium underline underline-offset-4"
          >
            개인정보 보호 안내
          </Link>
          에서 확인하실 수 있습니다.
        </section>
      </div>
    </main>
  );
}
