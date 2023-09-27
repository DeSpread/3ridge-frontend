import { Skeleton } from "@mui/material";
import clsx from "clsx";
import NextImage from "next/image";
import { CSSProperties } from "react";

interface CustomImageProps {
  alt: string;
  src?: string;
  className?: string;
  loading?: boolean;
  skeleton?: boolean;
  width?: `${number}px`;
  height?: `${number}px`;
  objectFit?: CSSProperties["objectFit"];
}

export const Image = ({
  alt,
  className,
  src,
  loading,
  skeleton,
  width,
  height,
  objectFit = "cover",
}: CustomImageProps) => {
  const isSizeDefined = !!width && !!height;

  return (
    <div
      className={clsx([
        !isSizeDefined && "w-full",
        "relative flex aspect-square items-center justify-center",
      ])}
      {...(isSizeDefined && { style: { width, height } })}
    >
      {!loading && src ? (
        <NextImage
          className={className}
          {...{ alt, src }}
          fill
          style={{
            position: "absolute",
            objectFit,
          }}
        />
      ) : (
        skeleton && (
          // TODO: update skeleton with tailwindcss component
          <Skeleton
            style={{
              borderRadius: 4,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            animation={"wave"}
            variant={"rounded"}
          />
        )
      )}
    </div>
  );
};
