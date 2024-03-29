import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description, tradingAddress },
    session: { user },
  } = req;

  if (req.method === "GET") {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      products,
    });
  }

  if (req.method === "POST") {
    const products = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "xx",
        tradingAddress,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      products,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
