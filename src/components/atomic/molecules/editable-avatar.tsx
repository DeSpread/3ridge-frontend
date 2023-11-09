import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, IconButton } from "@mui/material";
import React from "react";

import BlockIcon from "./block-icon";

const EditableAvatar = ({
  src,
  blockSeed,
  onFileImageAdded,
}: {
  src?: string;
  blockSeed?: string;
  onFileImageAdded?: (f: File) => void;
}) => {
  return (
    <div style={{ position: "relative" }}>
      {src && <Avatar sx={{ width: 100, height: 100 }} src={src}></Avatar>}
      {!src && blockSeed && (
        <div style={{ zIndex: 2 }}>
          <BlockIcon seed={blockSeed} scale={12}></BlockIcon>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          background: "rgba(0, 0, 0, 0.5)",
          top: src ? 0 : -2,
          left: src ? 0 : -2,
          borderRadius: 50,
        }}
      >
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            top: 30,
            left: 30,
            width: 40,
            height: 40,
            borderRadius: 25,
            background: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <input
            name={"newImage"}
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                const file = e.target.files[0];
                if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
                  onFileImageAdded?.(file);
                }
              }
              e.target.value = "";
            }}
          />
          <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
        </IconButton>
      </div>
    </div>
  );
};

export default EditableAvatar;
