export function classNameHandler(...classnames: string[]) {
  return classnames.join(" ");
}

export const getTimeAgo = (time: Date) => {
  const now = new Date();
  const updatedAt = new Date(time);
  const elapsed = now.getTime() - updatedAt.getTime();

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  if (seconds > 0) return `${seconds}초 전`;

  return "방금 전";
};

export const getLocalDateString = (time: Date) => {
  return new Date(time).toLocaleDateString("ko-KR");
};
