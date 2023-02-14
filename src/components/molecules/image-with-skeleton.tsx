import Image, { ImageProps } from "next/image";
import React, { CSSProperties, useState } from "react";
import { Skeleton } from "@mui/material";

const ImageWithSkeleton = (props: ImageProps & { sx?: CSSProperties }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <Skeleton
          width={props.width}
          height={props.height}
          animation={"wave"}
          variant={"rounded"}
        ></Skeleton>
      )}
      <Image
        {...props}
        src={props.src}
        height={loaded ? props.height : 0}
        loading={"lazy"}
        alt={""}
        style={props.sx}
        onLoadingComplete={() => {
          console.log("aaa");
          setLoaded(true);
        }}
      />
    </>
  );
};

export default ImageWithSkeleton;
