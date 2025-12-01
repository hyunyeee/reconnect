import Link from "next/link";

export default function Home() {
  return (
    <main className="flex max-w-md flex-col gap-4 px-4 py-6 text-lg font-semibold">
      <Link href="/match" className="hover:text-main-pink">
        상대방 정보 등록하기
      </Link>
      <Link href="/wating" className="hover:text-main-pink">
        대기중 페이지
      </Link>
      <Link href="/success" className="hover:text-main-pink">
        성공 페이지
      </Link>
    </main>
  );
}
