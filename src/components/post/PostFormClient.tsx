"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useCreatePost, useUpdatePost, usePostDetail } from "@/hooks/query/usePost";
import { toast } from "sonner";
import { NormalInput } from "@/components/form/NormalInput";
import { NormalTextarea } from "@/components/form/NormalTextarea";
import { BackHeader } from "@/components/layout/BackHeader";

interface PostFormClientProps {
  mode: "create" | "edit";
  postId?: number;
}

interface PostFormValues {
  title: string;
  content: string;
}

export default function PostFormClient({ mode, postId }: PostFormClientProps) {
  const router = useRouter();

  const methods = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const { data } = usePostDetail(postId!, mode === "edit");

  useEffect(() => {
    if (mode === "edit" && data) {
      reset({
        title: data.data.title,
        content: data.data.content,
      });
    }
  }, [mode, data, reset]);

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const onSubmit = (values: PostFormValues) => {
    if (mode === "create") {
      createPost.mutate(values, {
        onSuccess: (res) => {
          toast.success("게시글이 작성되었습니다.");
          // 작성 후 디테일로 이동
          router.replace(`/posts/${res.data.id}`);
        },
      });
      return;
    }

    if (mode === "edit" && postId) {
      updatePost.mutate(
        { postId, ...values },
        {
          onSuccess: () => {
            toast.success("게시글이 수정되었습니다.");
            router.replace(`/posts/${postId}`);
          },
        },
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <BackHeader backHref="/posts" />

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6 bg-white">
        {/* 헤더 */}
        <div className="space-y-1 pb-4">
          <h1 className="text-lg font-semibold">{mode === "create" ? "글쓰기" : "게시글 수정"}</h1>
          <p className="text-muted-foreground text-sm">자유롭게 이야기를 작성해보세요.</p>
        </div>

        {/* 제목 */}
        <NormalInput name="title" label="제목" placeholder="제목을 입력해주세요" />

        {/* 내용 */}
        <NormalTextarea name="content" label="내용" placeholder="내용을 입력해주세요" rows={12} />

        {/* 하단 버튼 */}
        <div className="flex justify-end pt-2">
          <Button type="submit" className="bg-main-pink hover:bg-main-pink px-6">
            {mode === "create" ? "등록하기" : "수정하기"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
