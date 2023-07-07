import { useEffect, useState } from "react";
import { Project } from "../type";
import { client } from "../lib/apollo/client";
import { GET_PROJECTS } from "../lib/apollo/query";
import { EventType } from "../__generated__/graphql";

export function useProjectsQuery(props: { eventTypes?: EventType[] }) {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [projectsDataLoading, setProjectsDataLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setProjectsDataLoading(true);
      const { data } = await client.query({
        query: GET_PROJECTS,
        variables: {
          eventTypes: props?.eventTypes ?? undefined,
        },
      });
      setProjectsData((prevState) => {
        return data.projects.map((e) => {
          return {
            _id: e._id ?? "",
            categories: e.categories ?? [],
            description: e.description ?? "",
            imageUrl: e.imageUrl ?? "",
            name: e.name ?? "",
            projectSocial: {
              discordUrl: e.projectSocial?.discordUrl ?? "",
              officialUrl: e.projectSocial?.officialUrl ?? "",
              telegramUrl: e.projectSocial?.telegramUrl ?? "",
              twitterUrl: e.projectSocial?.twitterUrl ?? "",
              mediumUrl: e.projectSocial?.mediumUrl ?? "",
            },
          };
        });
      });
      setProjectsDataLoading(false);
    })();
  }, []);

  return { projectsData, projectsDataLoading };
}
