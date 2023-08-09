import { Stack, Typography, useMediaQuery } from "@mui/material";
import LinkTypography from "../atomic/atoms/link-typography";
import React, { ReactElement } from "react";
import { useTheme } from "@mui/material/styles";

const ErrorInfoForm = (props: { content: string | ReactElement }) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { content } = props;

  return (
    <Stack direction={"column"} sx={{ flex: 1, background: "" }}>
      <p>{content}</p>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ marginTop: 2 }}
        justifyContent={smUp ? "flex-start" : "center"}
      >
        <LinkTypography
          href={"https://discord.gg/3ridge"}
          sx={{
            fontWeight: "bold",
            "&:hover": {
              color: "#914e1d",
              textDecoration: "underline",
            },
            color: theme.palette.warning.main,
            // display: "block",
          }}
          variant={"body1"}
        >
          3ridge 디스코드
          {!smUp && (
            <Typography variant={"body1"}>
              에서 Ticket을 통해 문의하세요
            </Typography>
          )}
        </LinkTypography>
        {smUp && (
          <Typography variant={"body1"}>
            에서 Ticket을 통해 문의하세요
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default ErrorInfoForm;
