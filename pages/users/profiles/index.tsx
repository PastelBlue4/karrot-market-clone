import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import KarrotPay from "@components/karrotPay";
import { useState } from "react";

const Profile: NextPage = () => {
  const user = useUser();
  return (
    <Layout hasTabBar title="나의 캐럿">
      <div className="px-4 ">
        <div className="flex items-center my-6 space-x-3 ">
          <div>
            <div className="w-10 h-10 rounded-full bg-slate-500" />
          </div>
          <div className="flex items-center justify-between w-full ">
            <span className="text-2xl font-medium text-gray-900">
              {user?.user?.name}
            </span>
            <button className="px-3.5 py-2.5 text-xs font-normal bg-gray-100 rounded-md">
              프로필 보기
            </button>
          </div>
        </div>

        <KarrotPay />

        <div className="flex justify-around mt-10">
          <Link href="/profile/sold">
            <a className="flex flex-col items-center">
              <div className="flex items-center justify-center text-white bg-orange-400 rounded-full w-14 h-14">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                판매내역
              </span>
            </a>
          </Link>
          <Link href="/profile/bought">
            <a className="flex flex-col items-center">
              <div className="flex items-center justify-center text-white bg-orange-400 rounded-full w-14 h-14">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                구매내역
              </span>
            </a>
          </Link>
          <Link href="/profile/loved">
            <a className="flex flex-col items-center">
              <div className="flex items-center justify-center text-white bg-orange-400 rounded-full w-14 h-14">
                <svg
                  className="w-6 h-6"
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
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                관심목록
              </span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
