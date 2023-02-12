import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;

  const product = await client.product.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const productRelationTerm = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

  const productRelation = await client.product.findMany({
    where: {
      OR: productRelationTerm,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
    take: 4,
  });

  console.log(productRelationTerm);

  res.json({
    ok: true,
    product,
    productRelation,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
