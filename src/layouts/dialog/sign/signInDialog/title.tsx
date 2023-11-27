import { ArrowBackIosNew, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { SignInType } from "./types";

import { SupportedNetwork } from "@/types";

interface TitleProps {
  signInType?: SignInType;
  network?: SupportedNetwork;
  onClickPrev?(): void;
  onClickClose?(): void;
}

export default function Title(props: TitleProps) {
  if (props.signInType === "wallet") {
    if (props.network) {
      return (
        <div className="flex items-center">
          <IconButton onClick={props.onClickPrev}>
            <ArrowBackIosNew />
          </IconButton>
          연결하려는 지갑을 선택하세요
        </div>
      );
    }

    if (process.env["NEXT_PUBLIC_ENV_NAME"] === "production") {
      return (
        <div className="flex items-center justify-between">
          연결하려는 네트워크를 선택하세요
          <IconButton onClick={props.onClickClose}>
            <Close />
          </IconButton>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <IconButton onClick={props.onClickPrev}>
          <ArrowBackIosNew />
        </IconButton>
        연결하려는 네트워크를 선택하세요
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      안녕하세요! 3ridge입니다 😄
      <IconButton onClick={props.onClickClose}>
        <Close />
      </IconButton>
    </div>
  );
}
