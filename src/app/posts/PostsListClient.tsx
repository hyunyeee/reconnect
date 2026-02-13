"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { usePostPaged } from "@/hooks/query/usePost";
import { PinnedNotice } from "@/components/post/PinnedNotice";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

export default function PostsListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 0);

  const { data, isLoading, isError } = usePostPaged({
    page,
    size: PAGE_SIZE,
  });

  const movePage = (nextPage: number) => {
    router.push(`/posts?page=${nextPage}`, { scroll: false });
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(PAGE_SIZE)].map((_, i) => (
          <Skeleton key={i} className="h-[96px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-muted-foreground py-20 text-center text-sm">
        게시글을 불러오지 못했습니다.
      </div>
    );
  }

  const { content, totalPages, pageNumber } = data.data;

  if (content.length === 0) {
    return (
      <div className="text-muted-foreground py-20 text-center text-sm">
        아직 작성된 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PinnedNotice />

      {/* 게시글 리스트 */}
      <ul className="overflow-hidden rounded-2xl border bg-white">
        {content.map((post) => (
          <li key={post.id} className="group border-b last:border-b-0">
            <Link
              href={`/posts/${post.id}`}
              className="hover:bg-muted/40 block px-5 py-4 transition"
            >
              <div className="flex gap-4">
                <div className="bg-main-pink w-1 rounded-full opacity-0 transition group-hover:opacity-100" />

                <div className="flex-1 space-y-1">
                  <h2 className="group-hover:text-main-pink line-clamp-1 text-[15px] font-semibold">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground line-clamp-2 text-sm">{post.content}</p>

                  <div className="text-muted-foreground pt-1 text-xs">{post.writerNickname}</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 0}
          onClick={() => movePage(page - 1)}
        >
          이전
        </Button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            size="sm"
            variant={i === pageNumber ? "default" : "outline"}
            className={cn(i === pageNumber && "bg-main-pink hover:bg-main-pink text-white")}
            onClick={() => movePage(i)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages - 1}
          onClick={() => movePage(page + 1)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
