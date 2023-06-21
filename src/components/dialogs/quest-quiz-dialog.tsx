import * as React from "react";
import { MouseEventHandler, useMemo, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogContent,
  DialogProps,
  Stack,
  Typography,
} from "@mui/material";
import QuestQuizForm from "../molecules/quest-quiz-form";
import {
  MouseEventWithParam,
  QuizEventParam,
  QuizQuestContext,
  Z_INDEX_OFFSET,
} from "../../type";
import SecondaryButton from "../atoms/secondary-button";
import { useTheme } from "@mui/material/styles";
import {
  decodeBase64,
  decodeBase64IfHtmlPattern,
  isBase64HtmlPattern,
} from "../../util/string-util";

type QuestQuizDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
  onCompleteQuiz?: () => void;
  context: QuizQuestContext;
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
        {...rest}
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
      >
        <DialogTitle>
          <Stack direction={"column"} spacing={1}>
            <Typography variant={"body1"}>{`Question ${questionIndex + 1} of ${
              context.quizList?.length
            }`}</Typography>
            <Typography
              variant={"h5"}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {props.context?.quizList &&
              props.context?.quizList?.length > 0 ? (
                isBase64HtmlPattern(
                  props.context?.quizList[questionIndex].title
                ) ? (
                  <div
                    style={{
                      textAlign: "justify",
                      color: "white",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: decodeBase64(
                        props.context?.quizList[questionIndex].title
                      ),
                    }}
                  ></div>
                ) : (
                  <Box sx={{ marginTop: 3 }}>
                    <Typography variant={"body1"}>
                      {props.context?.quizList[questionIndex].title}
                    </Typography>
                  </Box>
                )
              ) : (
                <></>
              )}
            </Typography>
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
