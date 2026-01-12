import PostsListClient from "./PostsListClient";
import { BackHeader } from "@/components/layout/BackHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function PostsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <BackHeader backHref="/" />

      {/* 헤더 */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">커뮤니티</h1>
          <p className="text-muted-foreground text-sm">자유롭게 이야기하고 정보를 나눠보세요</p>
        </div>

        <Button asChild size="sm" className="bg-main-pink gap-1">
          <Link href="/posts/write">
            <Pencil className="h-4 w-4" />
            글쓰기
          </Link>
        </Button>
      </div>

      <PostsListClient />
    </main>
  );
}
