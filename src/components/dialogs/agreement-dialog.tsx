import {
  Box,
  DialogContent,
  DialogProps,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { MouseEventHandler, useMemo, useState } from "react";
import {
  AgreementEventParam,
  MouseEventWithParam,
  VerifyAgreementQuestContext,
  Z_INDEX_OFFSET,
} from "../../types";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import SecondaryButton from "../atomic/atoms/secondary-button";
import ContentMetaDataRenderComponent from "../atomic/atoms/content-meta-data-render-component";
import QuestQuizForm from "../form/quest/quest-quiz-form";
import QuestAgreementForm from "../form/quest/quest-agreement-form";
import CloseIcon from "@mui/icons-material/Close";

type AgreementDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
  onCompleteAgreement?: () => void;
  context: VerifyAgreementQuestContext;
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
          <Stack
            direction={"column"}
            spacing={1}
            sx={{ marginTop: -2, marginBottom: 1 }}
          >
            <Box sx={{ paddingBottom: 3, paddingTop: 3 }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                {(context.agreementList?.length ?? 0) > 1 ? (
                  <Typography variant={"body1"}>{`확인 ${
                    agreementIndex + 1
                  } of ${context.agreementList?.length}`}</Typography>
                ) : (
                  <Typography variant={"h6"}>&nbsp;</Typography>
                )}
                <IconButton
                  sx={{
                    borderRadius: 32,
                    marginRight: 0,
                    "&:hover": {
                      boxShadow: "none",
                      transform: "translateY(0px)",
                    },
                  }}
                  onClick={props.onCloseBtnClicked}
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </Stack>
            </Box>
            {props.context?.agreementList &&
            props.context?.agreementList?.length > 0 ? (
              <Box sx={{ marginTop: 3 }}>
                <ContentMetaDataRenderComponent
                  contentMetaData={
                    props.context?.agreementList[agreementIndex]?.title
                  }
                  textComponentFunc={(content) => {
                    return <Typography variant={"body1"}>{content}</Typography>;
                  }}
                ></ContentMetaDataRenderComponent>
              </Box>
            ) : (
              <></>
            )}
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 1 }}>
            <QuestAgreementForm
              agreementContent={
                props.context?.agreementList
                  ? props.context?.agreementList[agreementIndex]
                  : undefined
              }
              onSelectChanged={(e) => {
                const myEvent = e as MouseEventWithParam<AgreementEventParam>;
                setActiveNext(myEvent.params.correct);
              }}
              id={agreementIndex}
              isLast={isLast}
            />
          </Box>
          <Box sx={{ marginTop: 4 }}>
            <SecondaryButton
              disabled={!activeNext}
              fullWidth={true}
              onClick={onNextQuestionButtonClicked}
            >
              {isLast ? "확인" : "다음"}
            </SecondaryButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgreementDialog;
