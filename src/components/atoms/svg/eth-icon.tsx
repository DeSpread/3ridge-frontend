import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReversibleSvgIconProps } from "../../../type";
import SuiIcon from "./sui-icon";

function EthIcon(props: ReversibleSvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ethereum"
        role="img"
        viewBox="0 0 512 512"
        style={{ filter: props.reverse ? "invert(0)" : "invert(1)" }}
      >
        <path fill="#3C3C3B" d="m256 362v107l131-185z" />
        <path fill="#343434" d="m256 41l131 218-131 78-132-78" />
        <path fill="#8C8C8C" d="m256 41v158l-132 60m0 25l132 78v107" />
        <path fill="#141414" d="m256 199v138l131-78" />
        <path fill="#393939" d="m124 259l132-60v138" />
      </svg>
    </SvgIcon>
  );
}

const NotWalletConnectedEthIcon = (props: ReversibleSvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        version="1.2"
        baseProfile="tiny"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        viewBox="0 0 512 512" // xmlns="http://www.w3.org/2000/svg"
        // aria-label="Ethereum"
        // role="img"
        // viewBox="0 0 512 512"
        // style={{ filter: props.reverse ? "invert(1)" : "invert(0)" }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m256 362v107l131-185z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m256 41l131 218-131 78-132-78"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m256 41v158l-132 60m0 25l132 78v107"
        />
        <path fill-rule="evenodd" clip-rule="evenodd" d="m256 199v138l131-78" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="m124 259l132-60v138" />
      </svg>
      {/*<svg*/}

      {/*>*/}
      {/*  <path*/}
      {/*    fill-rule="evenodd"*/}
      {/*    clip-rule="evenodd"*/}
      {/*    d="M19.497 12.9894L19.4964 12.9907C20.767 14.5839 21.5264 16.6018 21.5264 18.7966C21.5264 21.024 20.7443 23.0693 19.4394 24.6733L19.3271 24.8114L19.2973 24.6359C19.2719 24.4866 19.2422 24.3359 19.2076 24.184C18.5545 21.3147 16.4268 18.8543 12.9249 16.8621C10.5601 15.5205 9.20649 13.905 8.8511 12.0696C8.62158 10.8827 8.79222 9.69055 9.12199 8.66946C9.45165 7.64869 9.94207 6.79344 10.3587 6.27854L10.359 6.27821L11.7212 4.61247C11.9601 4.32035 12.4072 4.32035 12.6461 4.61247L19.497 12.9894ZM21.6517 11.3251L21.6519 11.3245L12.5211 0.159879C12.3468 -0.053293 12.0204 -0.0532931 11.8461 0.159879L2.71522 11.3246L2.71547 11.3252L2.68576 11.3621C1.00551 13.4471 0 16.0968 0 18.9812C0 25.6989 5.45467 31.1449 12.1836 31.1449C18.9126 31.1449 24.3672 25.6989 24.3672 18.9812C24.3672 16.0968 23.3617 13.4471 21.6815 11.3621L21.6517 11.3251ZM4.89996 12.9534L4.90033 12.9529L5.71703 11.9543L5.74171 12.1386C5.76126 12.2847 5.78497 12.4315 5.81309 12.5789C6.34152 15.3515 8.22924 17.6633 11.3853 19.4538C14.1287 21.0152 15.726 22.8106 16.1862 24.7798C16.3782 25.6016 16.4125 26.4101 16.3293 27.117L16.3242 27.1608L16.2846 27.1801C15.0464 27.785 13.6545 28.1245 12.1833 28.1245C7.02345 28.1245 2.84031 23.9484 2.84031 18.7966C2.84031 16.5847 3.61145 14.5523 4.89996 12.9534Z"*/}
      {/*  />*/}
      {/*</svg>*/}
    </SvgIcon>
  );
};

const WalletConnectedEthIcon = (props: ReversibleSvgIconProps) => {
  return <EthIcon {...props} width={12} height={12}></EthIcon>;
};

export default EthIcon;

export { NotWalletConnectedEthIcon, WalletConnectedEthIcon };
