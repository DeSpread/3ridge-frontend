import { redirect } from "next/navigation";

import { LinksDocument } from "@/__generated__/graphql";
import { getClient } from "@/lib/apollo/client.server";

export async function GET(
  request: Request,
  { params }: { params: { href: string } },
) {
  const { data } = await getClient().query({ query: LinksDocument });
  const link = data.links.find((link) => link.href === params.href);

  if (link) {
    redirect(
      `/event/${link.event._id}?devProvider=shortRouter&${link.attributes
        .map((attr) => `${attr.key}=${attr.value}`)
        .join("&")}`,
    );
  } else {
    redirect("/404");
  }
}
