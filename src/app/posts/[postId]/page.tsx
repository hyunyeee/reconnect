import PostDetailClient from "./PostDetailClient";

interface PageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { postId } = await params;
  const numericPostId = Number(postId);

  if (!Number.isFinite(numericPostId)) {
    throw new Error("Invalid postId");
  }

  return <PostDetailClient postId={numericPostId} />;
}
