import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { contents },
    session: { user },
  } = req;

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

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
