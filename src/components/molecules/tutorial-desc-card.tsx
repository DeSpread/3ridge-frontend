import { useTheme } from "@mui/material/styles";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import GradientTypography from "../atoms/gradient-typography";
import React from "react";

const TutorialDescCard = (props: {
  title: string;
  index: number;
  imageUrl: string;
  contents: string[];
}) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      sx={{
        borderWidth: 1,
        padding: 2,
      }}
    >
      <Box>
        <Grid
          container
          sx={{ background: "" }}
          direction={"row"}
          rowSpacing={4}
          justifyContent={"center"}
        >
          <Grid item sx={{ background: "" }}>
            <Stack direction={"column"}>
              <Box
                sx={{
                  background: "",
                  flex: 1,
                  width: "100%",
                }}
              >
                <Image
                  src={props.imageUrl}
                  alt={""}
                  width={smUp ? 256 : 218}
                  height={smUp ? 256 : 218}
                  style={{
                    borderRadius: 8,
                    borderWidth: 0,
                    borderColor: "white",
                    borderStyle: "solid",
                  }}
                ></Image>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            sx={{ marginLeft: mdUp ? 8 : 0, minWidth: mdUp ? 400 : 320 }}
          >
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={smUp ? "flex-start" : "center"}
              sx={{ height: "100%" }}
            >
              <Box>
                <GradientTypography
                  variant={smUp ? "h3" : "h5"}
                  sx={{
                    fontFamily: "LINESeedKR-Bd",
                  }}
                  textAlign={smUp ? "left" : "center"}
                >
                  {props.title}
                </GradientTypography>
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                  maxWidth: smUp ? 420 : 320,
                  background: "",
                }}
              >
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 0,
                    lineHeight: "4em",
                  }}
                >
                  {props.contents.map((e, index) => {
                    return (
                      <div key={index}>
                        <Typography
                          variant={smUp ? "h6" : "body2"}
                          sx={{ color: theme.palette.neutral[400] }}
                        >
                          {e}
                        </Typography>
                      </div>
                    );
                  })}
                </ul>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default TutorialDescCard;
