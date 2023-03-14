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

  if (!id) {
    return res.json({
      ok: false,
    });
  }

  const isInterest = await client.interest.findFirst({
    where: {
      userId: user?.id,
      questionId: +id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (isInterest) {
    await client.interest.delete({
      where: {
        id: isInterest.id,
      },
    });
  } else {
    await client.interest.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        question: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
