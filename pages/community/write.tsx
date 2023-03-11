import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";

import { Question } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface WriteForm {
  contents: string;
}

interface WriteResponse {
  ok: boolean;
  question: Question;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [question, { loading, data }] =
    useMutation<WriteResponse>("/api/questions");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    question(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.question.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="게시글 올리기">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea
          register={register("contents", { required: true, minLength: 10 })}
          required
          placeholder="궁금한 내용을 올려보세요!"
        />
        <Button text={loading ? "게시글을 올리고 있어요." : " 게시글 올리기"} />
      </form>
    </Layout>
  );
};

export default Write;
