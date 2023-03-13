import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { classNameHandler } from "@libs/client/utils";
import { Answer, Question, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface AnswerWithUser extends Answer {
  user: User;
}

interface QuestionAuthor extends Question {
  user: User;
  _count: {
    answers: number;
    interests: number;
  };
  answers?: AnswerWithUser[];
}

interface QuestionResponse {
  ok: boolean;
  question: QuestionAuthor;
  isInterest: boolean;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<QuestionResponse>(
    router.query.id ? `/api/questions/${router.query.id}` : null
  );

  const [interest] = useMutation(`/api/questions/${router.query.id}/interest`);

  const onInterestHandler = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        question: {
          ...data?.question,
          _count: {
            ...data?.question._count,
            interests: data.isInterest
              ? data?.question._count.interests - 1
              : data?.question._count.interests + 1,
          },
        },
        isInterest: !data.isInterest,
      },
      false
    );
    interest({});
  };

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

  return (
    <Layout canGoBack={true} title="동네질문">
      <div className="">
        <span className="inline-flex items-center w-12 px-3 py-2 my-5 ml-4 text-xs font-normal text-gray-700 bg-gray-100 rounded-lg">
          질문
        </span>
        <div className="flex flex-col pb-3 mx-4 mb-3 cursor-pointer">
          <Link href={``}>
            <div className="flex">
              <div className="flex ">
                <div className="rounded-full w-11 h-11 bg-slate-300" />
                <div className="flex flex-col ml-3">
                  <span className="text-sm font-medium text-gray-700">
                    {data?.question.user.name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {data && getTimeAgo(data?.question.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="mt-2 mtext-gray-700 ">
            <span>{data?.question.contents}</span>
          </div>
          <div className="flex justify-between w-full px-1 py-1 mt-3 text-gray-700 border-y">
            <div className="flex justify-center mx-1 w-28">
              <span className="flex items-center space-x-2 w-22 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>

                <span>답변 {data?.question._count.answers}</span>
              </span>
            </div>

            <div className="flex justify-center mx-1 w-28">
              {" "}
              <button
                onClick={onInterestHandler}
                className={classNameHandler(
                  "flex items-center space-x-2 w-22",
                  data?.isInterest ? "text-orange-500" : ""
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={classNameHandler(
                    "w-5 h-5",
                    data?.isInterest ? "text-orange-500" : "text-gray-400"
                  )}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                <span>관심 {data?.question._count.interests}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.ok &&
            data.question.answers &&
            data.question.answers.map((answer) => (
              <div key={answer.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-200" />
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    {answer.user.name}
                  </span>
                  <span className="block text-xs text-gray-500 ">
                    {getTimeAgo(answer.createdAt)}
                  </span>
                  <p className="mt-2 text-gray-700">{answer.contents} </p>
                </div>
              </div>
            ))}
        </div>
        <div className="px-4">
          <textarea
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm resize-none focus:ring-orange-500 focus:border-orange-500 "
            rows={4}
            placeholder="댓글을 입력해 보세요!"
          />
          <button className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
            답변하기
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
