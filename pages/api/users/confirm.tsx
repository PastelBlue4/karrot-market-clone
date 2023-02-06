import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: { payload: token },
  });

  if (!foundToken) return res.status(404).end();
  req.session.user = {
    id: foundToken.userId,
  };

  await req.session.save();
  await client.token.deleteMany({ where: { userId: foundToken.userId } });
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
