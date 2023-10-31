import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { v1 } from "uuid";

import { Project } from "../../../__generated__/graphql";
import useSimpleStorage from "../../../hooks/simple-storage-hook";
import { useLoading } from "../../../provider/loading/loading-provider";
import FileUtil from "../../../util/file-util";
import Container from "../../atomic/atoms/container";
import InputWithLabel from "../../atomic/atoms/input-with-label";
import SecondaryButton from "../../atomic/atoms/secondary-button";
import InputButton from "../../atomic/molecules/input-button";
import SimpleDialog, { SimpleDialogProps } from "../simple-dialog";

const ProjectUpsertEditDialog = (
  props: {
    editedProject?: Project;
    onConfirmBtnClicked?: (project: Project) => void;
  } & SimpleDialogProps,
) => {
  const { editedProject, onConfirmBtnClicked, ...rest } = props;
  const [project, setProject] = useState<Project>({
    name: "",
  });
  const theme = useTheme();
  const { asyncUploadImage } = useSimpleStorage();
  const { showLoading, closeLoading } = useLoading();

  useEffect(() => {}, []);

  const asyncUpdateImageUrlByFile = async (file: File) => {
    showLoading();
    const includeQuestion = project.imageUrl?.includes("?");
    const base64Data = await FileUtil.asyncReadAsBase64Data(file);
    const ext = FileUtil.getFileExtension(file);
    const imageName = v1();
    console.log(imageName);
    await asyncUploadImage(`project/${imageName}`, base64Data, file.type);
    let imageUrl = `https://3ridge.s3.ap-northeast-2.amazonaws.com/project/${imageName}.${ext}`;
    if (!includeQuestion) {
      imageUrl += "?";
    }
    setProject((prevState) => {
      return {
        ...prevState,
        imageUrl,
      };
    });
    closeLoading();
  };

  useEffect(() => {
    if (editedProject) {
      setProject(editedProject);
    } else {
      setProject({ name: "" });
    }
  }, [editedProject]);

  const title = useMemo(() => {
    return editedProject ? "프로젝트 편집" : "프로젝트 생성";
  }, [editedProject]);

  return (
    <SimpleDialog
      {...rest}
      title={title}
      maxWidth={"sm"}
      onClose={() => {
        // @ts-ignore
        props.onCloseBtnClicked?.(undefined);
      }}
      onCloseBtnClicked={(e) => {
        props.onCloseBtnClicked?.(e);
      }}
    >
      <Stack sx={{ marginTop: 1 }} spacing={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ paddingBottom: 2 }}
        >
          <Typography variant={"body1"}>이미지</Typography>
          <div style={{ position: "relative" }}>
            {project.imageUrl && (
              <Image
                width={128}
                height={128}
                src={project.imageUrl}
                alt={""}
                style={{
                  borderRadius: 10,
                  borderColor: theme.palette.neutral[700],
                  borderStyle: "solid",
                  borderWidth: 2,
                  margin: 0,
                }}
              ></Image>
            )}
            {!project.imageUrl && (
              <Skeleton
                width={128}
                height={128}
                variant={"rounded"}
                animation={"wave"}
              ></Skeleton>
            )}
            <InputButton
              sx={{
                top: 0,
                left: 0,
                width: 128,
                height: 128,
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: theme.palette.neutral["700"],
                position: "absolute",
              }}
              onChanged={async (file: File) => {
                await asyncUpdateImageUrlByFile(file);
              }}
            ></InputButton>
          </div>
        </Stack>
        <InputWithLabel
          label={"이름"}
          labelWidth={"38%"}
          value={project?.name}
          onChange={(e) => {
            const { value } = e.target;
            setProject((prevState) => {
              return {
                ...prevState,
                name: value,
              };
            });
          }}
        ></InputWithLabel>
        <InputWithLabel
          label={"세부설명"}
          labelWidth={"38%"}
          value={project?.description}
          onChange={(e) => {
            const { value } = e.target;
            setProject((prevState) => {
              return {
                ...prevState,
                description: value,
              };
            });
          }}
        ></InputWithLabel>
        <Stack>
          <Stack spacing={2} sx={{ marginTop: 3 }}>
            <Typography variant={"body1"}>링크 설정</Typography>
            <Divider></Divider>
            <Container>
              <Stack spacing={1}>
                <InputWithLabel
                  label={"디스코드 URL"}
                  labelWidth={"38%"}
                  value={project?.projectSocial?.discordUrl}
                  onChange={(e) => {
                    const { value } = e.target;
                    setProject((prevState) => {
                      return {
                        ...prevState,
                        projectSocial: {
                          ...prevState.projectSocial,
                          discordUrl: value,
                        },
                      };
                    });
                  }}
                ></InputWithLabel>
                <InputWithLabel
                  label={"미디엄 URL"}
                  labelWidth={"38%"}
                  value={project?.projectSocial?.mediumUrl}
                  onChange={(e) => {
                    const { value } = e.target;
                    setProject((prevState) => {
                      return {
                        ...prevState,
                        projectSocial: {
                          ...prevState.projectSocial,
                          mediumUrl: value,
                        },
                      };
                    });
                  }}
                ></InputWithLabel>
                <InputWithLabel
                  label={"웹사이트 URL"}
                  labelWidth={"38%"}
                  value={project?.projectSocial?.officialUrl}
                  onChange={(e) => {
                    const { value } = e.target;
                    setProject((prevState) => {
                      return {
                        ...prevState,
                        projectSocial: {
                          ...prevState.projectSocial,
                          officialUrl: value,
                        },
                      };
                    });
                  }}
                ></InputWithLabel>
                <InputWithLabel
                  label={"텔레그램 URL"}
                  labelWidth={"38%"}
                  value={project?.projectSocial?.telegramUrl}
                  onChange={(e) => {
                    const { value } = e.target;
                    setProject((prevState) => {
                      return {
                        ...prevState,
                        projectSocial: {
                          ...prevState.projectSocial,
                          telegramUrl: value,
                        },
                      };
                    });
                  }}
                ></InputWithLabel>
                <InputWithLabel
                  label={"네이버 블로그 URL"}
                  labelWidth={"38%"}
                  value={project?.projectSocial?.naverBlogUrl}
                  onChange={(e) => {
                    const { value } = e.target;
                    setProject((prevState) => {
                      return {
                        ...prevState,
                        projectSocial: {
                          ...prevState.projectSocial,
                          naverBlogUrl: value,
                        },
                      };
                    });
                  }}
                ></InputWithLabel>
                <InputWithLabel
                  label={"트위터 URL"}
                  labelWidth={"38%"}
                  value={project?.projectSocial?.twitterUrl}
                  onChange={(e) => {
                    const { value } = e.target;
                    setProject((prevState) => {
                      return {
                        ...prevState,
                        projectSocial: {
                          ...prevState.projectSocial,
                          twitterUrl: value,
                        },
                      };
                    });
                  }}
                ></InputWithLabel>
                <InputWithLabel
                  label={"카카오 URL"}
                  labelWidth={"38%"}
                  value={project?.projectSocial?.kakaoUrl}
                  onChange={(e) => {
                    const { value } = e.target;
                    setProject((prevState) => {
                      return {
                        ...prevState,
                        projectSocial: {
                          ...prevState.projectSocial,
                          kakaoUrl: value,
                        },
                      };
                    });
                  }}
                ></InputWithLabel>
              </Stack>
            </Container>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        sx={{ marginTop: 3 }}
      >
        <SecondaryButton
          fullWidth={true}
          onClick={(e) => {
            e.preventDefault();
            onConfirmBtnClicked?.(project);
            setProject({ name: "" });
          }}
        >
          확인
        </SecondaryButton>
      </Stack>
    </SimpleDialog>
  );
};

export default ProjectUpsertEditDialog;
