import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReversibleSvgIconProps } from "../../../type";
import SuiIcon from "./sui-icon";

function EthIcon(props: ReversibleSvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 327.5 533.3"
      >
        <path fill="#8A92B2" d="M163.7,197.2V0L0,271.6L163.7,197.2z" />
        <path
          fill="#62688F"
          d="M163.7,368.4V197.2L0,271.6L163.7,368.4z M163.7,197.2l163.7,74.4L163.7,0V197.2z"
        />
        <path fill="#3C3C3B" d="M163.7,197.2v171.2l163.7-96.8L163.7,197.2z" />
        <path fill="#454A75" d="M163.7,399.4L0,302.7l163.7,230.7V399.4z" />
        <path fill="#62688F" d="M327.5,302.7l-163.8,96.7v134L327.5,302.7z" />
      </svg>
    </SvgIcon>
  );
}

export default EthIcon;
