import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { classNameHandler } from "@libs/client/utils";
import { Answer, Question, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  response: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();

  const { data, mutate } = useSWR<QuestionResponse>(
    router.query.id ? `/api/questions/${router.query.id}` : null
  );

  const [interest, { loading }] = useMutation(
    `/api/questions/${router.query.id}/interest`
  );

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
    if (!loading) {
      interest({});
    }
  };

  const { register, handleSubmit, reset } = useForm<AnswerForm>();

  const [submitAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/questions/${router.query.id}/answers`);

  const onAnswerVaild = (answerFormData: AnswerForm) => {
    if (answerLoading) return;
    submitAnswer(answerFormData);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset({ answer: "" });
      mutate();
    }
  }, [answerData, reset, mutate]);

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
                  className="w-5 h-5 text-gray-500 "
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
        <form className="px-4" onSubmit={handleSubmit(onAnswerVaild)}>
          <TextArea
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm resize-none focus:ring-orange-500 focus:border-orange-500 "
            rows={4}
            placeholder="댓글을 입력해 보세요!"
            register={register("answer", { required: true })}
          />
          <button className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
            {answerLoading ? "답변을 올리고 있어요." : "답변하기"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
