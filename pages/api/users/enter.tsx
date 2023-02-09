import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { emit } from "process";

const sendEmail = require("@sendgrid/mail");

sendEmail.setApiKey(process.env.SENDGRID_API_KEY);

interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const user = { email };
  console.log(user);
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

  await sendEmail
    .send({
      to: user,
      from: "pastelblue0721@gmail.com",
      subject: "캐럿마켓 인증 메일입니다.",
      text: `인증번호는 ${payload} 입니다.`,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.log(error);
    });

  return res.json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
