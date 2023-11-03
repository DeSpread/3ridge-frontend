"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

export default function Header() {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <nav>
      <Image
        src={
          "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"
        }
        height={smUp ? 52 : 48}
        width={smUp ? 132 : 120}
        alt={""}
      />
      <Image
        src={
          "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/beta.svg"
        }
        height={smUp ? 30 : 30}
        width={smUp ? 30 : 30}
        alt={""}
      />
    </nav>
  );
}
