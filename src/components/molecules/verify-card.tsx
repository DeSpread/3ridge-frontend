import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from "react";
import SecondaryButton from "../atoms/secondary-button";
import PrimaryButton from "../atoms/primary-button";

type VerifyCardProps = PropsWithChildren & {
  sx?: CSSProperties;
  title?: string;
  description?: string;
  summary?: string;
  index?: number;
  onStartBtnClicked?: MouseEventHandler;
  onVerifyBtnClicked?: MouseEventHandler;
  verified?: boolean;
  autoVerified?: boolean;
};

const VerifyCard = (props: VerifyCardProps) => {
  const [cardState, setCardState] = useState("IDLE"); // VERIFYING, VERIFIED, DISABLED

  return (
    <>
      <Card sx={props.sx}>
        <CardContent>
          <Grid
            container
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            columns={16}
          >
            <Grid item xs={1}>
              {props.index && (
                <Box
                  sx={{
                    background: (theme) => theme.palette.neutral[800],
                    width: 28,
                    height: 28,
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 28,
                  }}
                >
                  <Typography
                    variant={"caption"}
                    //@ts-ignore
                    sx={{ color: (theme) => theme.palette.neutral[100] }}
                  >
                    {props.index}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={11} sx={{ background: "" }}>
              <Stack direction={"column"} justifyContent={"center"}>
                <Box>
                  <Typography
                    variant={"h6"}
                    sx={{
                      wordBreak: "break-word",
                    }}
                  >
                    {props.title}
                  </Typography>
                </Box>
                {props.description && (
                  <Box sx={{ marginTop: 1 }}>
                    <Typography
                      variant={"body2"}
                      sx={{
                        wordBreak: "break-word",
                      }}
                    >
                      {props.description}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>
            <Grid item xs={4} sx={{ background: "" }}>
              <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                <div style={{ position: "relative" }}>
                  <PrimaryButton
                    size={"medium"}
                    onClick={(e) => {
                      setCardState("VERIFYING");
                      // setInterval()
                      // props.onVerifyBtnClicked?.(e);
                      // let timer = null;

                      // function checkRemain() {
                      //   var now = new Date();
                      //   var distDt = _vDate - now;
                      // }
                      // timer = setInterval(checkRemain, 1000);
                    }}
                    disabled={
                      props.verified ||
                      props.autoVerified ||
                      cardState === "VERIFYING"
                    }
                  >
                    {cardState === "VERIFYING" && "Verifying"}
                    {cardState !== "VERIFYING" && props.verified
                      ? "Verified"
                      : "Verify"}
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
                        value={50}
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
                <SecondaryButton
                  size={"medium"}
                  onClick={props.onStartBtnClicked}
                >
                  Start
                </SecondaryButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default VerifyCard;
