import React from "react";
import {SvgIcon} from "@mui/material";

function EthIcon() {
  return (
      <SvgIcon>
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.8" fill="#fff">
            <path d="m9.91 1.666-.107.365v10.578l.107.107 4.91-2.902-4.91-8.148Z"></path>
            <path
                d="M9.91 1.666 5 9.814l4.91 2.902V1.666ZM9.91 14.314l-.06.074v3.768l.06.177 4.913-6.92-4.913 2.901Z"></path>
            <path
                d="M9.91 18.333v-4.019L5 11.414l4.91 6.919ZM9.91 12.716l4.911-2.902-4.91-2.232v5.135ZM5 9.814l4.91 2.902V7.582L5 9.814Z"></path>
          </g>
        </svg>
      </SvgIcon>
  );
}

export default EthIcon;