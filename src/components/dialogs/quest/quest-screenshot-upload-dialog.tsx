import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

import ContentMetaDataRenderComponent from "@/components/atomic/atoms/content-meta-data-render-component";
import SecondaryButton from "@/components/atomic/atoms/secondary-button";
import InputButton from "@/components/atomic/molecules/input-button";
import SimpleDialog, {
  SimpleDialogProps,
} from "@/components/dialogs/simple-dialog";
import { VerifyScreenShotQuestContext } from "@/types";
import FileUtil from "@/util/file-util";

const QuestScreenshotUploadDialog = (
  props: {
    context?: VerifyScreenShotQuestContext;
    onConfirmBtnClicked?: ({
      base64Data,
      ext,
    }: {
      base64Data?: string;
      ext?: string;
    }) => void;
  } & SimpleDialogProps,
) => {
  const { onCloseBtnClicked, context, ...rest } = props;
  const theme = useTheme();
  const [imageFile, setImageFile] = useState<string>();
  const [base64Data, setBase64Data] = useState<string>();
  const [ext, setExt] = useState<string>();

  return (
    <SimpleDialog
      {...rest}
      maxWidth={"sm"}
      onCloseBtnClicked={(e) => {
        setImageFile(undefined);
        setExt(undefined);
        setBase64Data(undefined);
        onCloseBtnClicked?.(e);
      }}
    >
      <Stack sx={{ marginTop: 1 }} spacing={2}>
        {context?.description && (
          <Stack>
            <ContentMetaDataRenderComponent
              contentMetaData={context?.description}
            ></ContentMetaDataRenderComponent>
            <Divider sx={{ marginTop: 2 }}></Divider>
          </Stack>
        )}
        <Box
          sx={{
            width: "100%",
            minHeight: 320,
            borderColor: theme.palette.neutral[100],
            borderWidth: 2,
            borderStyle: "dashed",
            borderRadius: 1,
            position: "relative",
          }}
        >
          {!imageFile && (
            <Stack
              sx={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                <CloudUploadIcon fontSize={"large"}></CloudUploadIcon>
                <Typography variant={"body1"}>스크린샷 업로드</Typography>
              </Stack>
            </Stack>
          )}
          {imageFile && (
            <Stack
              sx={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                padding: "1px",
                // background: "red",
              }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img
                src={imageFile}
                style={{
                  width: "100%",
                  height: "100%",
                  // minHeight: 320,
                  objectFit: "cover",
                }}
              ></img>
            </Stack>
          )}

          <InputButton
            sx={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              ":hover": {
                background: "rgba(255, 255, 255, 0.08)",
              },
            }}
            onChanged={async (file: File) => {
              const base64 = await FileUtil.asyncReadAsBase64Data(file);
              setImageFile(URL.createObjectURL(file));
              const ext = file.type.split("/")[1].split(";")[0].trim();
              setExt(ext);
              setBase64Data(base64);
            }}
            onError={(error) => {}}
          ></InputButton>
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ marginTop: 3 }}
        >
          <SecondaryButton
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              props.onConfirmBtnClicked?.({ base64Data, ext });
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default QuestScreenshotUploadDialog;
