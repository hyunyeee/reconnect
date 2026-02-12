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
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">📱 플랫폼 기준 매칭 방식</h2>

        <div className="space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            인스타그램 아이디는 <span className="font-semibold text-gray-900">인스타그램끼리</span>
            만 매칭되고,
            <br />
            틱톡 아이디는 <span className="font-semibold text-gray-900">틱톡끼리</span>만 매칭이
            이루어집니다.
          </p>

          <p className="text-xs text-gray-500">
            상대방이 나를 어떤 아이디로 등록할지 알 수 없기 때문에
            <br />
            인스타그램과 틱톡 아이디를 모두 입력하는 것을 권장드립니다.
          </p>
        </div>
      </section>
    </div>
  );
}
