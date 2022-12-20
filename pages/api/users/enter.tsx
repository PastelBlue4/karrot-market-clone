import apiFetchHanlder from "@libs/server/apiFetchHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200).end();
}

export default apiFetchHanlder("POST", handler);
