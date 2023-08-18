import { useEffect, useState } from "react";
import { Project } from "../types";
import { client } from "../lib/apollo/client";
import {
  CREATE_PROJECT,
  DELETE_PROJECT_BY_ID,
  GET_PROJECTS,
  UPDATE_PROJECT,
} from "../lib/apollo/query";
import { CategoryType, EventType } from "../__generated__/graphql";
import { useMutation } from "@apollo/client";
import { FetchPolicy } from "@apollo/client/core/watchQueryOptions";
import { Project as _Project } from "../../src/__generated__/graphql"; //"../../../../__generated__/graphql";

export function useProjectsQuery(props: { eventTypes?: EventType[] }) {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [projectsDataLoading, setProjectsDataLoading] = useState(false);
  const [deleteProjectById] = useMutation(DELETE_PROJECT_BY_ID);
  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);

  useEffect(() => {
    (async () => {
      await asyncRefreshProjectsData("cache-first");
    })();
  }, []);

  const asyncRefreshProjectsData = async (
    fetchPolicy: FetchPolicy = "no-cache"
  ) => {
    setProjectsDataLoading(true);
    const { data } = await client.query({
      query: GET_PROJECTS,
      variables: {
        eventTypes: props?.eventTypes ?? undefined,
      },
      fetchPolicy,
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
            naverBlogUrl: e.projectSocial?.naverBlogUrl ?? "",
          },
        };
      });
    });
    setProjectsDataLoading(false);
  };

  const asyncDeleteProjectById = async (projectId: string) => {
    await deleteProjectById({
      variables: {
        projectId,
      },
    });
  };

  const asyncCreateProject = async (_project: _Project) => {
    await createProject({
      variables: {
        name: _project.name ?? "",
        categories: [],
        priority: 1,
        description: _project.description ?? "",
        imageUrl: _project.imageUrl ?? "",
        projectSocial: {
          discordUrl: _project.projectSocial?.discordUrl ?? "",
          mediumUrl: _project.projectSocial?.mediumUrl ?? "",
          naverBlogUrl: _project.projectSocial?.naverBlogUrl ?? "",
          officialUrl: _project.projectSocial?.officialUrl ?? "",
          telegramUrl: _project.projectSocial?.telegramUrl ?? "",
          twitterUrl: _project.projectSocial?.twitterUrl ?? "",
        },
      },
    });
  };

  const asyncUpdateProject = async (_project: _Project) => {
    if (!_project._id) return;
    await updateProject({
      variables: {
        projectId: _project._id,
        name: _project.name ?? "",
        description: _project.description ?? "",
        imageUrl: _project.imageUrl ?? "",
        projectSocial: {
          discordUrl: _project.projectSocial?.discordUrl ?? "",
          mediumUrl: _project.projectSocial?.mediumUrl ?? "",
          naverBlogUrl: _project.projectSocial?.naverBlogUrl ?? "",
          officialUrl: _project.projectSocial?.officialUrl ?? "",
          telegramUrl: _project.projectSocial?.telegramUrl ?? "",
          twitterUrl: _project.projectSocial?.twitterUrl ?? "",
        },
      },
    });
  };

  return {
    projectsData,
    projectsDataLoading,
    asyncDeleteProjectById,
    asyncRefreshProjectsData,
    asyncCreateProject,
    asyncUpdateProject,
  };
}
