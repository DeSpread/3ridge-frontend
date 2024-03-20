import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import addSeconds from "date-fns/addSeconds";
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { ContentMetadata } from "../../../__generated__/graphql";
import { MouseEventWithParam } from "../../../types";
import ContentMetaDataRenderComponent from "../atoms/content-meta-data-render-component";
import PrimaryButton from "../atoms/primary-button";
import SecondaryButton from "../atoms/secondary-button";

export type VerifyCardProps = PropsWithChildren & {
  sx?: CSSProperties;
  title?: string;
  title_v2?: ContentMetadata;
  description?: string;
  summary?: string;
  index?: number;
  onStartBtnClicked?: MouseEventHandler;
  onVerifyBtnClicked?: MouseEventHandler;
  verified?: boolean;
  autoVerified?: boolean;
  disabled?: boolean;
  hideStartButton?: boolean;
  overrideConfirmBtnLabel?: string;
  startButtonLabel?: string;
  timerLength?: number;
};

const VerifyCard = (props: VerifyCardProps) => {
  const { timerLength = 5 } = props;

  const [cardState, setCardState] = useState("IDLE"); // VERIFYING, VERIFIED, DISABLED
  const [verifyingProgress, setVerifyingProgress] = useState(0);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [isStarted, setIsStarted] = useState(false);

  const getConfirmBtnLabel = () => {
    return props.overrideConfirmBtnLabel ?? "확인하기";
  };

  useEffect(() => {
    if (props.hideStartButton) {
      setIsStarted(true);
    }
  }, [props.hideStartButton]);

  const onStartBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsStarted(true);
    props.onStartBtnClicked?.(e);
  };

  const cardContentsForMdDownSize = () => {
    return (
      <Stack spacing={3}>
        <Stack direction={"row"} alignItems={"center"}>
          <Stack
            direction={"column"}
            justifyContent={"center"}
            sx={{ width: "100%" }}
          >
            <Box>
              <ContentMetaDataRenderComponent
                contentMetaData={props.title_v2}
                textComponentFunc={(content) => {
                  return (
                    <Typography
                      variant={"h6"}
                      sx={{
                        wordBreak: "keep-all",
                      }}
                      textAlign={"center"}
                    >
                      {content}
                    </Typography>
                  );
                }}
                htmlComponentFunc={(content) => {
                  return (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          content
                            ?.replace(
                              "{a-style}",
                              "display: block; text-align: center;",
                            )
                            .replace("{h6-style}", "text-align: center;") ?? "",
                      }}
                    ></div>
                  );
                }}
              ></ContentMetaDataRenderComponent>
            </Box>
            {props.description && (
              <Box sx={{ marginTop: 1 }}>
                <Typography
                  variant={"body2"}
                  sx={{
                    wordBreak: "keep-all",
                  }}
                  textAlign={"center"}
                >
                  {props.description}
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          sx={{ width: "100%" }}
        >
          {!props.hideStartButton && (
            <SecondaryButton
              sx={{ width: 110 }}
              disabled={props.disabled || props.verified}
              size={"medium"}
              onClick={onStartBtnClick}
            >
              시작
            </SecondaryButton>
          )}
          <div style={{ position: "relative" }}>
            <PrimaryButton
              size={"medium"}
              sx={{ width: 110 }}
              endIcon={props.verified ? <CheckIcon /> : <></>}
              onClick={(e) => {
                setCardState("VERIFYING");
                let timer: NodeJS.Timer;
                const _vDate = addSeconds(new Date(), timerLength);
                function checkRemain() {
                  const now = new Date();
                  //@ts-ignore
                  const distDt = _vDate - now;
                  setVerifyingProgress((prevState) => {
                    return prevState + 10 / timerLength;
                  });
                  if (distDt < 0) {
                    clearInterval(timer);
                    setCardState("IDLE");
                    setVerifyingProgress(100);
                    return;
                  }
                }
                timer = setInterval(checkRemain, 100);
                setVerifyingProgress(0);
                const myEvent = {} as MouseEventWithParam<{
                  callback: (msg: string) => void;
                }>;
                myEvent.params = {
                  callback: (msg: string) => {
                    setCardState("IDLE");
                    setVerifyingProgress(0);
                  },
                };
                props.onVerifyBtnClicked?.(myEvent);
              }}
              disabled={
                props.disabled ||
                props.verified ||
                props.autoVerified ||
                cardState === "VERIFYING"
              }
            >
              {cardState === "VERIFYING"
                ? "확인중"
                : props.verified
                ? "완료"
                : props.autoVerified
                ? getConfirmBtnLabel()
                : getConfirmBtnLabel()}
            </PrimaryButton>
            <div
              style={{
                position: "absolute",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                bottom: 9,
              }}
            >
              {cardState === "VERIFYING" && (
                <LinearProgress
                  value={verifyingProgress}
                  color={"warning"}
                  variant={"determinate"}
                  sx={{
                    width: "60%",
                    borderRadius: 3,
                    height: "2px",
                  }}
                ></LinearProgress>
              )}
            </div>
          </div>
        </Stack>
      </Stack>
    );
  };

  const cardContentForMdUpSize = () => {
    return (
      <Grid
        container
        alignItems={"center"}
        justifyContent={smUp ? "space-between" : "center"}
        columns={16}
        rowSpacing={2}
      >
        <Grid item>
          <Stack direction={"row"} alignItems={"center"}>
            {props.index && smUp && (
              <Box
                sx={{
                  background: (theme) => theme.palette.neutral[800],
                  width: smUp ? 28 : 14,
                  height: smUp ? 28 : 14,
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 28,
                }}
              >
                <Typography
                  variant={smUp ? "body2" : "caption"}
                  sx={{
                    color: (theme) => theme.palette.neutral[100],
                    width: 28,
                    textAlign: "center",
                  }}
                >
                  {props.index}
                </Typography>
              </Box>
            )}
            <Stack
              direction={"column"}
              justifyContent={"center"}
              sx={{ marginLeft: smUp ? 3 : 0 }}
            >
              <Box>
                <ContentMetaDataRenderComponent
                  contentMetaData={props.title_v2}
                  textComponentFunc={(content) => {
                    return (
                      <Typography
                        variant={"h6"}
                        sx={{
                          wordBreak: "keep-all",
                        }}
                      >
                        {content}
                      </Typography>
                    );
                  }}
                  htmlComponentFunc={(content) => {
                    return (
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            content
                              ?.replace("{a-style}", "")
                              .replace("{h6-style}", "") ?? "",
                        }}
                      ></div>
                    );
                  }}
                ></ContentMetaDataRenderComponent>
              </Box>
              {props.description && (
                <Box sx={{ marginTop: 1 }}>
                  <Typography
                    variant={"body2"}
                    sx={{
                      wordBreak: "break-word",
                    }}
                    textAlign={smUp ? "left" : "center"}
                  >
                    {props.description}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid item sx={{ background: "" }}>
          <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
            {!props.hideStartButton && (
              <SecondaryButton
                sx={{ width: 110 }}
                disabled={props.disabled || props.verified}
                size={"medium"}
                onClick={onStartBtnClick}
              >
                {props.startButtonLabel ?? '시작'}
              </SecondaryButton>
            )}
            <div style={{ position: "relative" }}>
              <PrimaryButton
                size={"medium"}
                sx={{ width: 110 }}
                endIcon={props.verified ? <CheckIcon /> : <></>}
                onClick={(e) => {
                  setCardState("VERIFYING");
                  let timer: NodeJS.Timer;
                  const _vDate = addSeconds(new Date(), timerLength);
                  function checkRemain() {
                    const now = new Date();
                    //@ts-ignore
                    const distDt = _vDate - now;
                    setVerifyingProgress((prevState) => {
                      return prevState + 10 / timerLength;
                    });
                    if (distDt < 0) {
                      clearInterval(timer);
                      setCardState("IDLE");
                      setVerifyingProgress(100);
                      return;
                    }
                  }
                  timer = setInterval(checkRemain, 100);
                  setVerifyingProgress(0);
                  const myEvent = {} as MouseEventWithParam<{
                    callback: (msg: string) => void;
                  }>;
                  myEvent.params = {
                    callback: (msg: string) => {
                      setCardState("IDLE");
                      setVerifyingProgress(0);
                    },
                  };
                  props.onVerifyBtnClicked?.(myEvent);
                }}
                disabled={
                  props.disabled ||
                  props.verified ||
                  props.autoVerified ||
                  cardState === "VERIFYING" ||
                  isStarted === false
                }
              >
                {cardState === "VERIFYING"
                  ? "확인중"
                  : props.verified
                  ? "완료"
                  : props.autoVerified
                  ? getConfirmBtnLabel()
                  : getConfirmBtnLabel()}
              </PrimaryButton>
              <div
                style={{
                  position: "absolute",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  bottom: 9,
                }}
              >
                {cardState === "VERIFYING" && (
                  <LinearProgress
                    value={verifyingProgress}
                    color={"warning"}
                    variant={"determinate"}
                    sx={{
                      width: "60%",
                      borderRadius: 3,
                      height: "2px",
                    }}
                  ></LinearProgress>
                )}
              </div>
            </div>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Card sx={props.sx}>
        <CardContent sx={{ background: theme.palette.neutral[800] }}>
          {mdUp ? cardContentForMdUpSize() : cardContentsForMdDownSize()}
        </CardContent>
      </Card>
    </>
  );
};

export default VerifyCard;
