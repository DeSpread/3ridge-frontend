import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler, useMemo, useState } from "react";

import { useSignedUserQuery } from "../../hooks/signed-user-query-hook";
import { Z_INDEX_OFFSET } from "../../types";
import SecondaryButton from "../atomic/atoms/secondary-button";
import ValidatedTextInput from "../atomic/molecules/validated-text-input";

type ConnectTwitterDialogProps = DialogProps & {
  onCloseBtnClicked: MouseEventHandler;
};

const ConnectTwitterDialog = (props: ConnectTwitterDialogProps) => {
  const { asyncUpdateSocialTwitter } = useSignedUserQuery();
  const [twitterId, setTwitterId] = useState("");

  const invalid = useMemo(() => {
    return true;
  }, []);

  return (
    <Dialog
      {...props}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG,
      }}
    >
      <DialogTitle>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography textAlign={"left"} variant={"h6"}>
            {props.title}
          </Typography>
          <IconButton
            sx={{ borderRadius: 32, marginRight: -1 }}
            onClick={props.onCloseBtnClicked}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 0, marginBottom: 0 }}>
          <Stack
            direction={"column"}
            sx={{
              background: "",
              // minWidth: "500px",
              paddingTop: 4,
              marginBottom: 12,
            }}
            spacing={4}
          >
            <Typography textAlign={"left"} variant={"h5"}>
              트위터 핸들 입력하기
            </Typography>
            <Stack spacing={4}>
              <Box sx={{ width: "100%", background: "", position: "relative" }}>
                <ValidatedTextInput
                  isValid={invalid}
                  placeholder={"트위터 핸들 ID (@없이 이름만)"}
                  sx={{ width: "100%" }}
                  value={twitterId}
                  onChange={(e) => {
                    setTwitterId(e.target.value);
                  }}
                  inputProps={{
                    style: {
                      height: 10,
                    },
                  }}
                ></ValidatedTextInput>
              </Box>
              <SecondaryButton
                color={"secondary"}
                variant={"contained"}
                sx={{
                  borderRadius: "11px",
                  height: "100%",
                  width: "100%",
                  background: "transparent",
                }}
                size={"small"}
                onClick={async (e) => {
                  await asyncUpdateSocialTwitter(twitterId);
                  props.onCloseBtnClicked(e);
                }}
              >
                입력하기
              </SecondaryButton>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectTwitterDialog;
