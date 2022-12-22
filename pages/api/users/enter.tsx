import apiFetchHanlder from "@libs/server/apiFetchHandler";
import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: { name: "gest", ...payload },
    update: {},
  });

  const token = await client.token.create({
    data: {
      payload: "2232",
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: { name: "gest", ...payload },
        },
      },
    },
  });
  console.log(user);
  return res.status(200).end();
}

export default apiFetchHanlder("POST", handler);
