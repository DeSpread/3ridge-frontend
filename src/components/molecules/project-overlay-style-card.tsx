import React, { useEffect, useLayoutEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  CardProps,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { Project } from "../../type";
import CheckIcon from "../atoms/svg/check-icon";

type ProjectCardProps = CardProps & {
  project?: Project;
};

const ProjectOverlayStyleCard = (props: ProjectCardProps) => {
  const { project } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  useLayoutEffect(() => {
    setHeight(ref.current?.offsetWidth ?? 0);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight(ref.current?.offsetWidth ?? 0);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <Box
      sx={{
        cursor: "pointer",
        ...props.sx,
      }}
      ref={ref}
      onClick={props.onClick}
    >
      <Box
        sx={{
          borderRadius: 4,
          height,
          background: theme.palette.neutral[800],
          backgroundSize: "cover",
          transition: "all 0.2s ease-out 0s",
          transitionDuration: "0.2s",
          transitionDelay: "0s",
          borderWidth: 3,
          borderColor: theme.palette.neutral[700],
          borderStyle: "solid",
          transitionTimingFunction: "ease-out",
          "&:hover": {
            borderColor: theme.palette.secondary.main,
          },
        }}
      >
        <div
          style={{
            width: height,
            height: height,
            background: "",
            padding: 24,
          }}
        >
          <Stack
            sx={{ width: "100%", background: "", height: "100%" }}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack sx={{ background: "" }}>
              {project?.imageUrl && (
                <Image
                  src={project?.imageUrl}
                  alt={""}
                  width={height * 0.45}
                  height={height * 0.45}
                  style={{
                    borderRadius: height,
                  }}
                ></Image>
              )}
            </Stack>
            <Box sx={{ marginTop: 2 }}>
              <Stack
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                marginRight={"-30px"}
              >
                <Typography
                  variant={smUp ? "body1" : "h6"}
                  color={"neutral.100"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project?.name}
                </Typography>
                {/*<Box sx={{ marginLeft: -10, padding: 0 }}>*/}
                <Image
                  src={
                    "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/mark.svg"
                  }
                  alt={""}
                  width={20}
                  height={smUp ? 20 : 30}
                  style={{
                    marginLeft: "-0px",
                  }}
                ></Image>
                {/*</Box>*/}
              </Stack>
            </Box>
          </Stack>
        </div>
      </Box>
    </Box>
  );
};

export default ProjectOverlayStyleCard;
