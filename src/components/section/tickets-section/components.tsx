import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ForwardedRef, forwardRef, HTMLAttributes } from "react";

export const TicketsSectionNoData = () => {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        marginTop: 4,
        background: "",
        width: "100%",
        minHeight: 300,
      }}
    >
      <Image
        alt="no-data"
        src={"https://3ridge.s3.ap-northeast-2.amazonaws.com/empty-box_.svg"}
        width={256}
        height={256}
      />
      <Typography variant={"h5"}>앗! 컨텐츠가 없어요 :(</Typography>
    </Stack>
  );
};

export const TicketsSectionSkeleton = () => {
  return (
    <>
      {Array(5).map((_, i) => (
        <Grid key={i} item xs={30} sm={15} md={10} lg={6}>
          <Skeleton height={400} variant={"rounded"} animation={"wave"} />
        </Grid>
      ))}
    </>
  );
};

const LoadMoreInner = (
  props: HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      className="flex h-32 items-center justify-center gap-4"
      ref={ref}
      {...props}
    >
      <svg
        className="h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <label>새로운 이벤트 불러오는 중...</label>
    </div>
  );
};

export const LoadMore = forwardRef(LoadMoreInner);
