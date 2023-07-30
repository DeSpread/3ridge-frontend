import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

function StacksIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 159.8 159.8"
        // style="enable-background:new 0 0 159.8 159.8;"
        // xml:space="preserve"
      >
        <circle fill="#5546FF" cx="79.9" cy="79.9" r="79.9" />
        <path
          fill="#FFFFFF"
          d="M112.5,122L95.3,95H120V84.8H39v10.2h24.7L46.5,122h12.8l20.2-31.7L99.7,122H112.5z M120,74.9V64.7H95.8
	l17-26.7H99.9L79.5,70.2L59.1,38H46.2l17,26.7H39V75L120,74.9L120,74.9z"
        />
      </svg>
    </SvgIcon>
  );
}

export default StacksIcon;