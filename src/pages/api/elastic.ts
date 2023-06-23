import { Client } from "@elastic/elasticsearch";
import { NextApiRequest, NextApiResponse } from "next";
import { ElasticErrorDocument } from "../../type";
import { getErrorMessage } from "../../error/my-error";
import { getUniqId } from "../../util/string-util";
const client = new Client({
  node: "https://leo-e32fa2.es.us-central1.gcp.cloud.es.io:9243", //process.env["NEXT_PUBLIC_ELASTICSEARCH_ENDPOINT"] ?? "",
  auth: {
    username: "3ridge", //process.env["NEXT_PUBLIC_ELASTICSEARCH_AUTH_USERNAME"] ?? "",
    password: "13ridge!", //process.env["NEXT_PUBLIC_ELASTICSEARCH_AUTH_PASSWORD"] ?? "",
  },
});

const LOG_INDEX = "3ridge-dev-frontend"; //process.env["NEXT_PUBLIC_ELASTICSEARCH_INDEX"] ?? "";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const document = req.body as ElasticErrorDocument;
      const { userAgent, message, logLevel } = document;
      const id = getUniqId();
      await client.index({
        index: LOG_INDEX,
        id,
        document: {
          createdAt: new Date(),
          createdDayOfWeek: new Date().toLocaleString("en-us", {
            weekday: "long",
          }),
          userAgent,
          message,
          logLevel,
        },
      });
      res.status(200).json({ message: "Success" });
    } catch (e) {
      res.status(400).json({ message: getErrorMessage(e) });
    }
    return;
  } else if (req.method === "GET") {
    const result = await client.search({
      index: "3ridge-dev-frontend",
      query: {
        match_all: {},
      },
    });
    console.log(result);
    res.status(200).json({ message: "Success" });
    return;
  }
  res.status(400).json({ message: "not supported method" });
}
