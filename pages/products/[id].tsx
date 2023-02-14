import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  productRelation: Product[];
  isFavorite: boolean;
}

const ItemDetail: NextPage = () => {
  const [skeletonLoading, setSekeletonLoading] = useState(false);
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR<any>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  const [toggleFav] = useMutation(`/api/products/${router.query.id}/favorite`);

  const onFavoriteClick = () => {
    mutate(
      {
        ...data,
        product: {
          ...data.product,
          user: {
            ...data.product.user,
            name: "Yasuo, The scientist of the world ",
          },
        },
      },
      false
    );
  };

  // toggleFav({});

  useEffect(() => {
    setTimeout(() => {
      setSekeletonLoading(true);
    }, 500);
  }, [isLoading]);

  console.log(data?.productRelation);
  return (
    <>
      <Layout canGoBack>
        <SkeletonTheme duration={2} baseColor="#cbd5e1">
          <div className="px-4 py-4">
            <div className="mb-8">
              <div className="h-96 bg-slate-300" />
              <div className="flex items-center py-3 space-x-3 border-t border-b cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-slate-300" />
                <div>
                  <p className="text-lg font-bold text-gray-700 ">
                    {skeletonLoading ? data?.product?.user?.name : <Skeleton />}
                  </p>
                  <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                    판매 내역보러가기
                  </Link>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-3xl font-bold text-gray-900">
                  {skeletonLoading ? data?.product?.name : <Skeleton />}
                </h1>
                <span className="block mt-3 text-2xl text-gray-900">
                  {skeletonLoading ? data?.product?.price : <Skeleton />}
                </span>
                <p className="my-6 text-gray-700 ">
                  {skeletonLoading ? data?.product?.description : <Skeleton />}
                </p>

                <p className="my-6 text-gray-700 ">
                  {skeletonLoading ? (
                    data?.product?.tradingAddress
                  ) : (
                    <Skeleton />
                  )}
                </p>
                <div className="flex items-center justify-between space-x-2">
                  <Button large text="판매자와 대화하기" />
                  <button
                    onClick={onFavoriteClick}
                    className={cls(
                      "flex items-center justify-center p-3 rounded-md  hover:bg-gray-100 ",
                      data?.isFavorite
                        ? "text-red-500 hover:text-gray-500 hover:bg-gray-200"
                        : "text-gray-400  hover:text-red-500 hover:bg-red-100"
                    )}
                  >
                    <svg
                      className="w-6 h-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                같이 본 물건들
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-6 ">
                {data?.productRelation?.map((item, id) => {
                  return (
                    <Link key={id} href={`/products/${item.id}`}>
                      <div className="cursor-pointer">
                        <div className="w-full h-56 mb-4 bg-slate-300" />
                        <h3 className="-mb-1 text-gray-700">{item.name}</h3>
                        <span className="text-sm font-medium text-gray-900">
                          {item.price}원
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </SkeletonTheme>
      </Layout>
    </>
  );
};
export default ItemDetail;
