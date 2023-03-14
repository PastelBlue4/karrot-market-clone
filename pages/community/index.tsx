import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floating-button";
import useSWR from "swr";
import Link from "next/link";
import { Question, User } from "@prisma/client";
import { getLocalDateString, getTimeAgo } from "@libs/client/utils";

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
      <div>
        {data &&
          data?.questions.map((question) => (
            <Link key={question.id} href={`/community/${question.id}`}>
              <a className="flex flex-col items-start pt-4 cursor-pointer">
                <div className="px-4 mt-2 text-gray-700">
                  <span className="font-medium text-orange-500">Q.</span>{" "}
                  {question.contents}
                </div>
                <div className="flex items-center justify-between w-full px-4 mt-5 text-xs font-medium text-gray-500">
                  <span>{question.user.name}</span>
                  <span>{getTimeAgo(question.updatedAt)}</span>
                </div>
                <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t   w-full">
                  <span className="flex items-center space-x-2 text-sm">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>관심 {question._count.interests}</span>
                  </span>
                  <span className="flex items-center space-x-2 text-sm">
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    <span>답변 {question._count.answers}</span>
                  </span>
                </div>
              </a>
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
