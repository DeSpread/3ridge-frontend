import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProjectOverlayStyleCard from "../atomic/molecules/project-overlay-style-card";
import SkeletonOverlayCard from "../atomic/molecules/skelton-overlay-card";
import React from "react";
import { useTheme } from "@mui/material/styles";
import WithEditorContainer from "../../hoc/with-editor-container";
import { useProjectsQuery } from "../../hooks/projects-query-hook";

const _ProjectOverlayStyleCard = WithEditorContainer(ProjectOverlayStyleCard);

const ProjectsEditSection = (props: {}) => {
  const { projectsData, projectsDataLoading } = useProjectsQuery({});

  return (
    <Card sx={{ width: "100%", marginTop: 1 }}>
      <CardContent>
        <Stack direction={"column"} spacing={2}>
          <Stack spacing={1}>
            <Typography variant={"h6"}>프로젝트 관리</Typography>
            <Divider></Divider>
          </Stack>
          <Grid
            container
            direction={"row"}
            justifyContent={"center"}
            sx={{
              marginTop: 1,
              marginBottom: 12,
              background: "",
            }}
          >
            <Grid
              container={true}
              sx={{ background: "", width: "100%" }}
              spacing={2}
            >
              {!projectsDataLoading &&
                projectsData?.map((e, index) => {
                  return (
                    <Grid
                      item
                      key={index}
                      xs={6}
                      sm={4}
                      md={3}
                      lg={2}
                      sx={
                        {
                          // paddingLeft: getLeftPadding(index),
                          // paddingRight: getRightPadding(index),
                          // paddingTop: "5px",
                          // paddingBottom: "5px",
                        }
                      }
                    >
                      <>
                        <_ProjectOverlayStyleCard
                          project={e}
                          onClickForEdit={(e) => {}}
                          onClickForDelete={(e) => {}}
                        ></_ProjectOverlayStyleCard>
                      </>
                    </Grid>
                  );
                })}
              {projectsDataLoading &&
                [1, 2, 3, 4].map((e, index) => {
                  return (
                    <Grid
                      item
                      key={index}
                      xs={6}
                      sm={4}
                      md={3}
                      lg={2}
                      sx={{ padding: "10px" }}
                    >
                      <SkeletonOverlayCard></SkeletonOverlayCard>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectsEditSection;
