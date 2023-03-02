import { useEffect, useState } from "react";
import { Project } from "../type";
import { client } from "../apollo/client";
import { GET_PROJECTS } from "../apollo/query";

export function useProjectQueryHook() {
  const [projectData, setProjectData] = useState<Project>();
  const [projectDataLoading, setProjectDataLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: GET_PROJECTS,
      });
    })();
  }, []);
  // const [projectsData, setProjectsData] = useState<Project[]>([]);
  // const [projectsDataLoading, setProjectsDataLoading] = useState(false);
}
