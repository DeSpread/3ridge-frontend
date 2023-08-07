import Image from "next/image";
import { Skeleton } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { useTheme } from "@mui/material/styles";

const EventImage = ({
  imageUrl,
}: { imageUrl?: string } & PropsWithChildren) => {
  const theme = useTheme();

  return imageUrl ? (
    <Image
      width={128}
      height={128}
      src={imageUrl}
      alt={""}
      style={{
        borderRadius: 10,
        borderColor: theme.palette.neutral[700],
        borderStyle: "solid",
        borderWidth: 2,
        margin: 0,
      }}
    ></Image>
  ) : (
    <Skeleton
      width={128}
      height={128}
      variant={"rounded"}
      animation={"wave"}
    ></Skeleton>
  );
};

export default EventImage;
