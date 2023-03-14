import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floating-button";
import useSWR from "swr";
import Link from "next/link";
import { Question, User } from "@prisma/client";
import { getLocalDateString, getTimeAgo } from "@libs/client/utils";

import { AiOutlineHeart } from "react-icons/ai";
import { BsChat, BsHeart } from "react-icons/bs";

interface QuestionsWithUser extends Question {
  user: User;
  _count: {
    interests: number;
    answers: number;
  };
}

interface QuestionsResponse {
  ok: boolean;
  questions: QuestionsWithUser[];
}

const Community: NextPage = () => {
  const { data } = useSWR<QuestionsResponse>(`api/questions`);

  return (
    <Layout hasTabBar title="동네생활">
      <div className="flex justify-center w-full">
        <div className="w-11/12 bg-green-100 rounded-lg h-28"></div>
      </div>
      <div className="">
        {data &&
          data?.questions.map((question) => (
            <Link key={question.id} href={`/community/${question.id}`}>
              <div className="flex flex-col items-start justify-center py-2 border-t cursor-pointer first:mt-2 ">
                <div className="px-2 mt-2 text-lg text-gray-700 ">
                  {question.contents}
                </div>
                <div className="flex items-center justify-between w-full px-2 mt-5 text-xs font-medium text-gray-500">
                  <span>{getTimeAgo(question.updatedAt)}</span>
                </div>
                <div className="flex w-full px-2 mt-3 space-x-2 text-gray-700">
                  {question._count.interests > 0 ? (
                    <span className="relative flex items-center space-x-2 text-sm ">
                      <BsHeart className="w-4 h-4 " />

                      <span className="text-base">
                        {question._count.interests}
                      </span>
                    </span>
                  ) : null}

                  {question._count.answers > 0 ? (
                    <span className="relative flex items-center space-x-2 text-sm ">
                      <BsChat className="w-4 h-4 -mt-[2px] -scale-x-100" />

                      <span className="text-base">
                        {question._count.answers}
                      </span>
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
      </div>
      <FloatingButton href="/community/write">
        <svg
          className="w-6 h-6"
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
};

export default Community;
