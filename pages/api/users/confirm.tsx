import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session);
  const { token } = req.body;
  const exists = await client.token.findUnique({ where: { payload: token } });

  if (!exists) res.status(404).end();
  req.session.user = {
    id: exists?.userId,
  };

  await req.session.save();

  return res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password:
    "2344324324551324326543dasdsaasd@##&@*6sdsada5324132315473414325232",
});
