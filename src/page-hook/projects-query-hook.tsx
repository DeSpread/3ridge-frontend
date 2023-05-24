import { useEffect, useState } from "react";
import { Project } from "../type";
import { client } from "../lib/apollo/client";
import { GET_PROJECTS } from "../lib/apollo/query";

export function useProjectsQuery() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [projectsDataLoading, setProjectsDataLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setProjectsDataLoading(true);
      const { data } = await client.query({
        query: GET_PROJECTS,
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
            },
          };
        });
      });
      setProjectsDataLoading(false);
    })();
  }, []);

  return { projectsData, projectsDataLoading };
}
