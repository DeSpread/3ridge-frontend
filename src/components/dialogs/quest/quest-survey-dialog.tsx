import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";
import {
  Box,
  DialogContent,
  DialogProps,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { VerifySurveyQuestContext, Z_INDEX_OFFSET } from "../../../types";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import SecondaryButton from "../../atomic/atoms/secondary-button";
import StyledOutlinedInput from "../../atomic/atoms/styled/styled-outlined-input";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAlert } from "../../../provider/alert/alert-provider";

const QuestSurveyDialog = (
  props: {
    onCloseBtnClicked?: MouseEventHandler;
    onConfirmBtnClicked?: (answers?: string[]) => void;
    context?: VerifySurveyQuestContext;
  } & DialogProps
) => {
  const theme = useTheme();
  const { context, onConfirmBtnClicked, ...rest } = props;
  const [surveyIndex, setSurveyIndex] = useState(0);
  const [texts, setTexts] = useState([""]);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (context?.questions) {
      setTexts(new Array(context?.questions.length).fill(""));
    }
    setSurveyIndex(0);
  }, [context]);

  const isLast = useMemo(() => {
    const length = props.context?.questions?.length ?? 0;
    return surveyIndex === length - 1;
  }, [surveyIndex, props.context?.questions?.length]);

  // const reset = () => {
  //   setSurveyIndex(0);
  // };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        sx={{
          backdropFilter: "blur(2px)",
          zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG,
        }}
        PaperProps={{
          style: {
            borderRadius: 16,
            borderWidth: 3,
            borderColor: theme.palette.neutral[700],
            borderStyle: "solid",
            padding: 8,
          },
        }}
        onClose={() => {
          // @ts-ignore
          props.onCloseBtnClicked?.(undefined);
        }}
        {...rest}
      >
        <DialogTitle>
          <Stack>
            <Stack direction={"column"}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                {(context?.questions.length ?? 0) > 1 ? (
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Typography variant={"body1"}>{`설문 `}</Typography>
                    <Typography variant={"body2"}>{`${surveyIndex + 1} / ${
                      context?.questions.length
                    }`}</Typography>
                  </Stack>
                ) : (
                  <Typography variant={"body1"}>설문</Typography>
                )}
                <IconButton
                  sx={{
                    borderRadius: 32,
                    marginRight: 0,
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }}
                  onClick={(e) => {
                    props.onCloseBtnClicked?.(e);
                  }}
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant={"h5"}
                  sx={{
                    wordBreak: "keep-all",
                  }}
                >
                  {props.context?.questions &&
                  props.context?.questions?.length > 0 ? (
                    <Box sx={{ marginTop: 3 }}>
                      <Typography variant={"body1"}>
                        {props.context?.questions[surveyIndex]}
                      </Typography>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Typography>
                {(context?.questions.length ?? 0) > 1 && (
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    sx={{ marginBottom: -1, marginTop: 1, marginLeft: 2 }}
                  >
                    <IconButton
                      sx={{
                        borderRadius: 32,
                        width: 28,
                        height: 28,
                        borderWidth: 2,
                        borderStyle: "solid",
                        marginRight: 1,
                        transition: "transform 0.2s ease",
                        "&:active": {
                          transform: "scale(0.9)",
                        },
                        "&:inactive": {
                          transform: "scale(1)",
                        },
                      }}
                      onClick={(e) => {
                        setSurveyIndex((prevState) => {
                          return Math.max(prevState - 1, 0);
                        });
                      }}
                    >
                      <ArrowBackIosNewIcon fontSize={"small"} />
                    </IconButton>
                    <IconButton
                      sx={{
                        borderRadius: 32,
                        width: 28,
                        height: 28,
                        borderWidth: 2,
                        borderStyle: "solid",
                        transition: "transform 0.2s ease",
                        "&:active": {
                          transform: "scale(0.9)",
                        },
                        "&:inactive": {
                          transform: "scale(1)",
                        },
                      }}
                      onClick={(e) => {
                        setSurveyIndex((prevState) => {
                          return Math.min(
                            prevState + 1,
                            (context?.questions?.length ?? 0) - 1
                          );
                        });
                      }}
                    >
                      <ArrowForwardIosIcon fontSize={"small"} />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack>
            <Box sx={{ marginTop: 1 }}>
              <StyledOutlinedInput
                sx={{
                  width: "100%",
                }}
                value={texts[surveyIndex]}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setTexts((prevState) => {
                    const src = [...texts];
                    src[surveyIndex] = e.target.value;
                    return src;
                  });
                }}
                multiline
                minRows={3}
              />
            </Box>
          </Stack>
          {isLast && (
            <Box sx={{ marginTop: 3 }}>
              <SecondaryButton
                fullWidth={true}
                onClick={(e) => {
                  let correct = true;
                  texts?.forEach((e, i) => {
                    if (!e) {
                      showAlert({
                        title: "알림",
                        content: `${i + 1}번째 설문을 채워주세요`,
                      });
                      correct = false;
                      return;
                    }
                  });
                  if (correct) onConfirmBtnClicked?.(texts);
                }}
              >
                제출하기
              </SecondaryButton>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestSurveyDialog;
