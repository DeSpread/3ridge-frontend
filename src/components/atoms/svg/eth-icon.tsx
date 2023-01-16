import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReversibleSvgIconProps } from "../../../type";

function EthIcon(props: ReversibleSvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.1 19.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z"
          fill={props.reverse ? "#313f75" : "#627EEA"}
        ></path>
        <path
          d="M10.396 2.874V8.14l4.452 1.99-4.452-7.256Z"
          fill={props.reverse ? "#808080" : "#fff"}
          fillOpacity={0.602}
        ></path>
        <path
          d="M10.397 2.874 5.945 10.13l4.452-1.99V2.874Z"
          fill={props.reverse ? "#808080" : "#fff"}
        ></path>
        <path
          d="M10.396 13.542v3.58l4.454-6.164-4.454 2.584Z"
          fill={props.reverse ? "#808080" : "#fff"}
          fillOpacity={0.602}
        ></path>
        <path
          d="M10.397 17.121v-3.579l-4.452-2.584 4.452 6.163Z"
          fill={props.reverse ? "#808080" : "#fff"}
        ></path>
        <path
          d="m10.396 12.714 4.452-2.584-4.452-1.99v4.574Z"
          fill={props.reverse ? "#808080" : "#fff"}
          fillOpacity={0.2}
        ></path>
        <path
          d="m5.944 10.13 4.452 2.584V8.14l-4.452 1.99Z"
          fill={props.reverse ? "#808080" : "#fff"}
          fillOpacity={0.602}
        ></path>
      </svg>
    </SvgIcon>
  );
}

export default EthIcon;
