import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler, useMemo, useState, useRef } from "react";
//@ts-ignore
import AvatarEditor from "react-avatar-editor";
import { Z_INDEX_OFFSET } from "../../type";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import SecondaryButton from "../atomic/atoms/secondary-button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type ConnectEmailDialogProps = DialogProps & {
  imageFile?: File;
  onImageFileSaved?: ({
    base64Data,
    ext,
  }: {
    base64Data: string;
    ext: string;
  }) => void;
  onBackBtnClicked?: MouseEventHandler;
};

const PictureEditDialog = (props: ConnectEmailDialogProps) => {
  const editor = useRef<AvatarEditor>();
  const [sliderValue, setSliderValue] = useState(50);

  const scale = useMemo(() => {
    return 1 - (50 - sliderValue) / 50;
  }, [sliderValue]);

  const onSaveButtonClicked = async () => {
    const data = editor.current?.getImageScaledToCanvas().toDataURL();
    const splits = data.split(",");
    const ext = splits[0].split("/")[1].split(";")[0].trim();
    const imageData = splits[1];
    props.onImageFileSaved?.({ base64Data: imageData, ext });
  };

  return (
    <Dialog
      {...props}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG,
        backdropFilter: "blur(2px)",
      }}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            background: "",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <IconButton
              sx={{
                borderRadius: 32,
                borderWidth: 1,
                //@ts-ignore
                borderColor: (theme) => theme.palette.neutral["600"],
                borderStyle: "solid",
              }}
              onClick={props.onBackBtnClicked}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Typography textAlign={"left"} variant={"h6"}>
              {props.title}
            </Typography>
          </Stack>
          <SecondaryButton onClick={onSaveButtonClicked}>Save</SecondaryButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ background: "" }}
          spacing={4}
        >
          <Box sx={{ marginTop: 0 }}></Box>
          <Stack
            sx={{
              width: "100%",
              background: "black",
            }}
            alignItems={"center"}
          >
            <div>
              <AvatarEditor
                ref={editor}
                image={props.imageFile}
                width={250}
                height={250}
                border={50}
                borderRadius={250}
                color={[0, 0, 0, 0.6]}
                scale={scale}
              ></AvatarEditor>
            </div>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <ZoomOutIcon
              //@ts-ignore
              sx={{ color: (theme) => theme.palette.neutral["600"] }}
            ></ZoomOutIcon>
            <Box sx={{ width: 200 }}>
              <Slider
                value={sliderValue}
                onChange={(event: Event, newValue: number | number[]) => {
                  if (typeof newValue === "number") setSliderValue(newValue);
                }}
              ></Slider>
            </Box>
            <ZoomInIcon
              //@ts-ignore
              sx={{ color: (theme) => theme.palette.neutral["600"] }}
            ></ZoomInIcon>
          </Stack>
          <Box sx={{ marginBottom: 6 }}></Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PictureEditDialog;
