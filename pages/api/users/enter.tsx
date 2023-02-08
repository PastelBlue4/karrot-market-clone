import mail from "@sendgrid/mail";

import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { emit } from "process";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;

  console.log(req.body);
  const user = email;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: { name: "gest", ...user },
        },
      },
    },
  });

  // const sendEmail = await mail.send({
  //   from: "pastelblue0721@gmail.com",
  //   to: "pastel0721@naver.com",
  //   subject: "캐럿마켓 인증 메일입니다.",
  //   text: `인증키는 ${payload}입니다.`,
  // });
  // console.log(sendEmail);
  // console.log(payload);

  // console.log(user);

  return res.json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
