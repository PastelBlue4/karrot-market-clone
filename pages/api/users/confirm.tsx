import apiFetchHanlder from "@libs/server/apiFetchHandler";
import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";

interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  console.log(token);

  return res.status(200).end();
}

export default apiFetchHanlder("POST", handler);
