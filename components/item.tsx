import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ItemProps {
  title: string;
  id: number;
  price: number;
  tradingAddress: string;
  updatedAt: Date;
  comments: number;
  hearts: number;
  isLoading: boolean;
}

export default function Item({
  title,
  price,
  comments,
  tradingAddress,
  updatedAt,
  hearts,
  id,
  isLoading,
}: ItemProps) {
  const [skeletonLoading, setSekeletonLoading] = useState(true);

  const getTimeAgo = (time: Date) => {
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

  useEffect(() => {
    setTimeout(() => {
      setSekeletonLoading(false);
    }, 600);
  }, [isLoading]);
  return (
    <Link href={`/products/${id}`}>
      <div className="box-border w-screen max-w-[560px]">
        <div className="flex  justify-between px-1 py-2  cursor-pointer border-b-[1px] ">
          <div className="flex transition-all">
            <div className="relative w-40 h-40 ">
              {skeletonLoading ? (
                <Skeleton width={160} height={160} className="-top-1" />
              ) : (
                <Image
                  src={"/mokoko.png"}
                  layout="fill"
                  objectFit="contain"
                  alt={`${id}`}
                  className="rounded-lg bg-green-50"
                />
              )}
            </div>
            <div className="flex flex-col justify-around ml-6">
              <h3 className="text-gray-900 ">
                <div className="text-xl font-nomal ">
                  {skeletonLoading ? <Skeleton width={130} /> : title}
                </div>
              </h3>{" "}
              <div className="text-sm text-gray-500">
                {skeletonLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    <span>{tradingAddress}</span>
                    <span className="mx-2">•</span>
                    <span className="">{`${getTimeAgo(updatedAt)}`}</span>
                  </>
                )}
              </div>
              <span className="font-medium text-gray-900 ">
                {skeletonLoading ? (
                  <Skeleton width={100} height={20} borderRadius="100" />
                ) : (
                  `${price} 원`
                )}
              </span>
            </div>
          </div>
          <div className="flex items-end gap-2 mr-5">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              {skeletonLoading ? (
                <Skeleton width={30} />
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  <span>{hearts}</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              {skeletonLoading ? (
                <Skeleton width={30} />
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  <span>{comments}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
