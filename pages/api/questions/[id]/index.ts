import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const question = await client.question.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          answers: true,
          interests: true,
        },
      },
      answers: {
        select: {
          contents: true,
          createdAt: true,
          id: true,
          user: {
            select: {
              name: true,
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  const isInterest = Boolean(
    await client.interest.findFirst({
      where: {
        questionId: +id.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    ok: true,
    question,
    isInterest,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
