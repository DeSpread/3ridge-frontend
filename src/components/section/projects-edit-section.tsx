import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardContent,
  CardProps,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { MouseEventHandler, useState } from "react";

import { Project } from "../../__generated__/graphql";
import WithEditorContainer from "../../hoc/with-editor-container";
import { useProjectsQuery } from "../../hooks/projects-query-hook";
import { useSignedUserQuery } from "../../hooks/signed-user-query-hook";
import { useLoading } from "../../provider/loading/loading-provider";
import ProjectOverlayStyleCard from "../atomic/molecules/project-overlay-style-card";
import SkeletonOverlayCard from "../atomic/molecules/skelton-overlay-card";
import ProjectUpsertEditDialog from "../dialogs/project-edit/project-upsert-edit-dialog";

const _ProjectOverlayStyleCard = WithEditorContainer(ProjectOverlayStyleCard);

const ProjectAddCard = (
  props: CardProps & { onAddButtonClicked?: MouseEventHandler },
) => {
  const theme = useTheme();

  const { onAddButtonClicked } = props;

  return (
    <div style={{ position: "relative" }}>
      <ProjectOverlayStyleCard
        project={{
          _id: "-1",
          categories: [],
          description: "",
          imageUrl: "",
          name: "",
          projectSocial: {
            discordUrl: "",
            officialUrl: "",
            telegramUrl: "",
            twitterUrl: "",
            mediumUrl: "",
            naverBlogUrl: "",
            kakaoUrl: "",
          },
        }}
      ></ProjectOverlayStyleCard>
      <Box
        sx={{
          position: "absolute",
          top: "2px",
          left: "2px",
          width: `calc(100% - 4px)`,
          height: `calc(100% - 4px)`,
          background: theme.palette.neutral[800],
          borderRadius: 4,
        }}
      >
        <IconButton
          sx={{ width: "100%", height: "100%", borderRadius: 4 }}
          onClick={onAddButtonClicked}
        >
          <AddIcon fontSize={"large"}></AddIcon>
        </IconButton>
      </Box>
    </div>
  );
};

const ProjectsEditSection = () => {
  const {
    projectsData,
    projectsDataLoading,
    asyncDeleteProjectById,
    asyncRefreshProjectsData,
    asyncCreateProject,
    asyncUpdateProject,
  } = useProjectsQuery({});
  const { userData } = useSignedUserQuery();
  const { showLoading, closeLoading } = useLoading();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedProject, setEditedProject] = useState<Project>();

  const showOpenEditDialog = (_editedProject?: Project) => {
    setOpenEditDialog(true);
    setEditedProject(_editedProject);
  };

  const closeOpenEditDialog = () => {
    setOpenEditDialog(false);
    setEditedProject(undefined);
  };

  // useEffect(() => {
  //   asyncRefreshProjectsData();
  // }, []);

  return (
    <>
      <Card sx={{ width: "100%", marginTop: 1 }}>
        <CardContent>
          <Stack direction={"column"}>
            <Stack spacing={1}>
              <Typography variant={"h6"}>프로젝트 관리</Typography>
              <Divider></Divider>
            </Stack>
            <Box>
              {!userData?._id && (
                <Box
                  sx={{
                    marginTop: 2,
                  }}
                >
                  <Typography>로그인 해주시기 바랍니다</Typography>
                </Box>
              )}
              {userData?._id && (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    marginTop: 3,
                  }}
                >
                  <Grid
                    container
                    sx={{ background: "", width: "100%" }}
                    spacing={3}
                    direction={"row"}
                  >
                    {
                      <Grid item xs={6} sm={4} md={3} lg={2}>
                        <ProjectAddCard
                          onAddButtonClicked={async (e) => {
                            showOpenEditDialog(undefined);
                          }}
                        ></ProjectAddCard>
                      </Grid>
                    }
                    {!projectsDataLoading &&
                      projectsData?.map((e, index) => {
                        return (
                          <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                            <>
                              <_ProjectOverlayStyleCard
                                project={e}
                                onClickForEdit={(_e) => {
                                  showOpenEditDialog(e);
                                }}
                                onClickForDelete={async (_e) => {
                                  showLoading();
                                  await asyncDeleteProjectById(e._id);
                                  await asyncRefreshProjectsData();
                                  closeLoading();
                                }}
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
                </Stack>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <ProjectUpsertEditDialog
        open={openEditDialog}
        onCloseBtnClicked={async (e) => {
          closeOpenEditDialog();
        }}
        onConfirmBtnClicked={async (p) => {
          showLoading();
          console.log("aaa", p);
          if (!editedProject) {
            await asyncCreateProject(p);
          } else {
            await asyncUpdateProject(p);
          }
          await asyncRefreshProjectsData();
          closeOpenEditDialog();
          closeLoading();
        }}
        editedProject={editedProject}
      ></ProjectUpsertEditDialog>
    </>
  );
};

export default ProjectsEditSection;
