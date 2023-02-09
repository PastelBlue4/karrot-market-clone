import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from "@prisma/client";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  tradingAddress: string;
}

interface UploadProductMutation {
  ok: boolean;
  products: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");
  const onValid = (data: UploadProductForm) => {
    if (loading) return;
    uploadProduct(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.products.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="내 물건 팔기">
      <form className="p-4 space-y-" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="flex items-center justify-center w-full h-48 text-gray-600 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-orange-500 hover:text-orange-500">
            <svg
              className="w-12 h-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register("name")}
          required
          label="글 제목"
          name="name"
          type="text"
        />
        <Input
          register={register("price")}
          required
          label="가격"
          placeholder="0.00"
          name="가격"
          type="number"
          kind="price"
        />

        <TextArea
          register={register("description")}
          name="description"
          label="게시글 내용을 작성해 주세요."
        />

        <TextArea
          register={register("tradingAddress")}
          name="tradingAddress"
          label="거래할 장소를 알려주세요."
        />
        <Button text={loading ? "물건을 등록하는 중이에요." : "완료"} />
      </form>
    </Layout>
  );
};

export default Upload;
