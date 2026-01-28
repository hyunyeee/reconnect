import Link from "next/link";
import { BackHeader } from "@/components/layout/BackHeader";

export default function MatchSelectPage() {
  return (
    <div className="mx-auto max-w-md space-y-8 px-4 py-6">
      <BackHeader backHref="/" />

      <h1 className="text-center text-2xl font-bold tracking-tight">매칭 방식 선택</h1>

      <div className="space-y-4">
        <Link href="/match/insta" className="block">
          <div className="hover:border-main-pink flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md active:scale-[0.98]">
            <img src="/icons/insta.svg" alt="Instagram" className="h-11 w-11" />

            <div className="flex flex-col">
              <span className="text-base font-semibold text-gray-900">인스타그램 매칭</span>
              <span className="text-sm text-gray-500">인스타 아이디로 매칭하기</span>
            </div>
          </div>
        </Link>

        <Link href="/match/tiktok" className="block">
          <div className="hover:border-main-pink flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md active:scale-[0.98]">
            <img src="/icons/tiktok.svg" alt="TikTok" className="h-11 w-11" />

            <div className="flex flex-col">
              <span className="text-base font-semibold text-gray-900">틱톡 매칭</span>
              <span className="text-sm text-gray-500">틱톡 계정으로 매칭하기</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
