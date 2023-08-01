import React, { useEffect } from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonOverlayCard = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight(ref.current?.offsetWidth ?? 0);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <Box ref={ref}>
      <Skeleton
        width={height}
        height={height}
        animation={"wave"}
        variant={"rounded"}
      ></Skeleton>
    </Box>
  );
};

export default SkeletonOverlayCard;
