import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import answers from "./[id]/answers";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { contents },
    session: { user },
  } = req;

  if (req.method === "GET") {
    const getQuestions = await client.question.findMany({
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            id: true,
          },
        },
        _count: {
          select: {
            interests: true,
            answers: true,
          },
        },
      },
    });

    res.json({
      ok: true,
      questions: getQuestions,
    });
  }

  if (req.method === "POST") {
    const question = await client.question.create({
      data: {
        contents,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      question,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
