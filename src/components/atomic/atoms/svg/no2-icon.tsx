import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

function No2Icon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path
          d="M14.852 1.558a3 3 0 0 1 2.296 0L25.4 4.976A3 3 0 0 1 27.024 6.6l3.418 8.252a3 3 0 0 1 0 2.296L27.024 25.4a3 3 0 0 1-1.624 1.624l-8.252 3.418a3 3 0 0 1-2.296 0L6.6 27.024A3 3 0 0 1 4.976 25.4l-3.418-8.252a3 3 0 0 1 0-2.296L4.976 6.6A3 3 0 0 1 6.6 4.976l8.252-3.418Z"
          fill="#9da8b0"
          stroke="#e2e3e3"
          stroke-width="2"
        ></path>
      </svg>
    </SvgIcon>
  );
}

export default No2Icon;
