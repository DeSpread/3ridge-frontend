import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
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
                    //@ts-ignore
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
                <PrimaryButton
                  size={"medium"}
                  onClick={props.onVerifyBtnClicked}
                  disabled={props.verified || props.autoVerified}
                >
                  {props.verified ? "Verified" : "Verify"}
                </PrimaryButton>
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
