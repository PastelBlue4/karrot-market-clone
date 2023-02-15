import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Product } from "@prisma/client";

interface ProductResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const user = useUser();

  console.log(user);

  const { data, isLoading } = useSWR<ProductResponse>("/api/products");
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col overflow-y-scroll ">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            updatedAt={product.updatedAt}
            tradingAddress={
              product.tradingAddress ? product.tradingAddress : ""
            }
            comments={1}
            hearts={1}
            isLoading={isLoading}
          />
        ))}
        <FloatingButton href="/products/upload">
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
      </div>
    </Layout>
  );
};
export default Home;
