import apiFetchHanlder from "@libs/server/apiFetchHandler";
import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const loginTryType = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    where: {
      ...loginTryType,
    },
    create: { name: "gest", ...loginTryType },
    update: {},
  });
  console.log(user);
  return res.status(200).end();
}

export default apiFetchHanlder("POST", handler);
