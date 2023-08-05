import * as React from "react";
import { MouseEventHandler, useMemo, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogContent,
  DialogProps,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import QuestQuizForm from "../../form/quest/quest-quiz-form";
import {
  MouseEventWithParam,
  QuizEventParam,
  VerifyQuizQuestContext,
  Z_INDEX_OFFSET,
} from "../../../type";
import SecondaryButton from "../../atomic/atoms/secondary-button";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

type QuestQuizDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
  onCompleteQuiz?: () => void;
  context: VerifyQuizQuestContext;
};

const QuestQuizDialog = (props: QuestQuizDialogProps) => {
  const { context, ...rest } = props;
  const [activeNextQuestion, setActiveNextQuestion] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const theme = useTheme();

  const onNextQuestionButtonClicked = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (questionIndex + 1 < (props.context?.quizList?.length ?? 0)) {
      setQuestionIndex((prevState) => prevState + 1);
      setActiveNextQuestion(false);
    } else if (questionIndex + 1 >= (props.context?.quizList?.length ?? 0)) {
      props.onCompleteQuiz?.();
    }
  };

  const isLast = useMemo(() => {
    const length = props.context?.quizList?.length ?? 0;
    return questionIndex === length - 1;
  }, [questionIndex, props.context?.quizList?.length]);

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
            <Stack direction={"column"} spacing={1}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant={"body1"}>{`Question ${
                  questionIndex + 1
                } of ${context.quizList?.length}`}</Typography>
                <IconButton
                  sx={{
                    borderRadius: 32,
                    marginRight: 0,
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }}
                  onClick={props.onCloseBtnClicked}
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </Stack>
              <Typography
                variant={"h5"}
                sx={{
                  wordBreak: "break-word",
                }}
              >
                {props.context?.quizList &&
                props.context?.quizList?.length > 0 ? (
                  <Box sx={{ marginTop: 3 }}>
                    <Typography variant={"body1"}>
                      {props.context?.quizList[questionIndex].title}
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}
              </Typography>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 1 }}>
            <QuestQuizForm
              quizContent={
                props.context?.quizList
                  ? props.context?.quizList[questionIndex]
                  : undefined
              }
              onSelectChanged={(e) => {
                const myEvent = e as MouseEventWithParam<QuizEventParam>;
                setActiveNextQuestion(myEvent.params.correct);
              }}
              id={questionIndex}
              isLast={isLast}
            />
          </Box>
          <Box sx={{ marginTop: 0 }}>
            <SecondaryButton
              disabled={!activeNextQuestion}
              fullWidth={true}
              onClick={onNextQuestionButtonClicked}
            >
              {isLast ? "완료" : "다음 문제"}
            </SecondaryButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestQuizDialog;
