import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env["NEXT_PUBLIC_ELASTICSEARCH_ENDPOINT"],
  auth: {
    username: process.env["NEXT_PUBLIC_ELASTICSEARCH_AUTH_USERNAME"] ?? "",
    password: process.env["NEXT_PUBLIC_ELASTICSEARCH_AUTH_PASSWORD"] ?? "",
  },
});

export { client };
