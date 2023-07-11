import {
  Box,
  DialogContent,
  DialogProps,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { MouseEventHandler, useMemo, useState } from "react";
import { VerifyAgreementContext, Z_INDEX_OFFSET } from "../../type";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import SecondaryButton from "../atoms/secondary-button";

type AgreementDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
  onCompleteAgreement?: () => void;
  context: VerifyAgreementContext;
};

const AgreementDialog = (props: AgreementDialogProps) => {
  const { context, ...rest } = props;

  const [activeNext, setActiveNext] = useState(false);
  const [agreementIndex, setAgreementIndex] = useState(0);

  const theme = useTheme();

  const onNextQuestionButtonClicked = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (agreementIndex + 1 < (props.context?.agreementList?.length ?? 0)) {
      setAgreementIndex((prevState) => prevState + 1);
      setActiveNext(false);
    } else if (
      agreementIndex + 1 >=
      (props.context?.agreementList?.length ?? 0)
    ) {
      props.onCompleteAgreement?.();
    }
  };

  const isLast = useMemo(() => {
    const length = props.context?.agreementList?.length ?? 0;
    return agreementIndex === length - 1;
  }, [agreementIndex, props.context?.agreementList?.length]);

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
            {/*<Typography variant={"body1"}>{`Question ${agreementIndex + 1} of ${*/}
            {/*  context.agreementList?.length*/}
            {/*}`}</Typography>*/}
            <Typography
              variant={"h5"}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {props.context?.agreementList &&
              props.context?.agreementList?.length > 0 ? (
                <Box sx={{ marginTop: 3 }}>
                  {/*<Typography variant={"body1"}>*/}
                  {/*  {props.context?.agreementList[questionIndex]?.title.}*/}
                  {/*</Typography>*/}
                </Box>
              ) : (
                <></>
              )}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 1 }}>
            {/*<QuestQuizForm*/}
            {/*  quizContent={*/}
            {/*    props.context?.agreementList*/}
            {/*      ? props.context?.agreementList[questionIndex]*/}
            {/*      : undefined*/}
            {/*  }*/}
            {/*  onSelectChanged={(e) => {*/}
            {/*    const myEvent = e as MouseEventWithParam<QuizEventParam>;*/}
            {/*    setActiveNextQuestion(myEvent.params.correct);*/}
            {/*  }}*/}
            {/*  id={questionIndex}*/}
            {/*  isLast={isLast}*/}
            {/*/>*/}
          </Box>
          <Box sx={{ marginTop: 0 }}>
            <SecondaryButton
              disabled={!activeNext}
              fullWidth={true}
              onClick={onNextQuestionButtonClicked}
            >
              {isLast ? "완료" : "다음"}
            </SecondaryButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgreementDialog;
