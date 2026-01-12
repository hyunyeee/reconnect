import PostFormClient from "@/components/post/PostFormClient";

interface Props {
  params: Promise<{ postId: string }>;
}

export default async function PostEditPage({ params }: Props) {
  const { postId } = await params;

  return (
    <section className="mx-auto max-w-3xl px-2 py-8">
      <PostFormClient mode="edit" postId={Number(postId)} />
    </section>
  );
}
