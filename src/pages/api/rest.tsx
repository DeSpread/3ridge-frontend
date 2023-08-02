import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Readable } from "stream";

const CLIENT_URI = process.env["NEXT_PUBLIC_APOLLO_CLIENT_URI"];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    includeWalletChainType,
    includeTwitterId,
    includeEmail,
    includeTelegram,
    ticketId,
  } = req.query;

  const params = {
    includeWalletChainType,
    includeTwitterId,
    includeEmail,
    includeTelegram,
  };

  const clientUri = CLIENT_URI?.replace("/graphql", "");
  const URL = `${clientUri}/ticket/${ticketId}/users/file`;

  const { data, headers } = await axios.get<Readable>(URL, {
    responseType: "stream",
    params,
  });

  res.setHeader("content-disposition", headers["content-disposition"]);
  res.setHeader("content-type", "text/csv; charset=utf-8");

  data.pipe(res);
}

export default handler;
