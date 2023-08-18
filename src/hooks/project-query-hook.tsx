import { useEffect, useState } from "react";
import { Project } from "../types";
import { client } from "../lib/apollo/client";
import { DELETE_PROJECT_BY_ID, GET_PROJECT_BY_ID } from "../lib/apollo/query";
import { useMutation } from "@apollo/client";

export function useProjectQuery(props: { projectId?: string }) {
  const [projectData, setProjectData] = useState<Project>();
  const [projectDataLoading, setProjectDataLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!props.projectId) return;
      setProjectDataLoading(true);
      const { data } = await client.query({
        query: GET_PROJECT_BY_ID,
        variables: {
          projectId: props.projectId,
        },
      });

      setProjectData((prevState) => {
        return {
          _id: data.projectById._id ?? "",
          categories: data.projectById.categories ?? [],
          description: data.projectById.description ?? "",
          imageUrl: data.projectById.imageUrl ?? "",
          name: data.projectById.name ?? "",
          projectSocial: {
            discordUrl: data.projectById.projectSocial?.discordUrl ?? "",
            officialUrl: data.projectById.projectSocial?.officialUrl ?? "",
            telegramUrl: data.projectById.projectSocial?.telegramUrl ?? "",
            twitterUrl: data.projectById.projectSocial?.twitterUrl ?? "",
            mediumUrl: data.projectById.projectSocial?.mediumUrl ?? "",
            naverBlogUrl: data.projectById.projectSocial?.naverBlogUrl ?? "",
          },
        };
      });
      setProjectDataLoading(false);
    })();
  }, [props.projectId]);

  return { projectData, projectDataLoading };
}
