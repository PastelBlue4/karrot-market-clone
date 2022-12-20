import type { NextApiRequest, NextApiResponse } from "next";

type Method = "POST" | "GET" | "DELETE";

type receiveFnType = (req: NextApiRequest, res: NextApiResponse) => void;

export default function apiFetchHanlder(
  method: Method,
  responseFn: receiveFnType
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await responseFn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
