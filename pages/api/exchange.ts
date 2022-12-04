// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { authorization_code } = req.body;
      const { status, data } = await axios.post(
        "https://app.kraikub.com/api/oauth/v1/token",
        {
          code: authorization_code,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret:
            process.env.CLIENT_SECRET,
          grant_type: "authorization_code",
        }
      );
      return res.status(200).send(data)
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status as number).send({});
    } else {
      res.status(500).send({
        msg: (error as any).toString(),
      });
    }
    console.error(error);
  }
}
