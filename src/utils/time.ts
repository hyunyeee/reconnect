// createdAt이 없거나 잘못 내려오는 경우 NaN 방어
export function safeTimeAgo(dateString?: string) {
  if (!dateString) return "방금 전";

  const time = new Date(dateString).getTime();
  if (Number.isNaN(time)) return "";

  const diff = Date.now() - time;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}시간 전`;
  return `${Math.floor(minutes / 1440)}일 전`;
}
