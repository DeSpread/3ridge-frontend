import { SvgIcon } from "@mui/material";
import React from "react";

function EmailIcon() {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="-3 -5 20 20"
      >
        {/*<polygon*/}
        {/*  className="cls-1"*/}
        {/*  points="76.01 89.49 87.99 89.49 87.99 89.49 82 72.47 76.01 89.49"*/}
        {/*/>*/}
        <path
          d="M15.667.333H2.333C1.417.333.667 1.083.667 2v10c0 .917.75 1.667 1.666 1.667h13.334c.916 0 1.666-.75 1.666-1.667V2c0-.917-.75-1.667-1.666-1.667zm-.334 3.542l-5.45 3.409a1.65 1.65 0 0 1-1.766 0l-5.45-3.409a.708.708 0 1 1 .75-1.2L9 6.167l5.583-3.492a.708.708 0 1 1 .75 1.2z"
          fill="#fff"
        ></path>
      </svg>
    </SvgIcon>
  );
}

export default EmailIcon;
