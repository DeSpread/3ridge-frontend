"use client";

import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";

import NavbarButton from "@/components/atomic/atoms/navbar-button";
import SubMenuButton from "@/components/atomic/molecules/sub-menu-button";

export default function Nav() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  if (isSmall) {
    return <SubMenuButton />;
  }

  return (
    <Stack direction={"row"} sx={{ background: "" }}>
      <Box>
        <Link href={"/explore"}>
          <NavbarButton>이벤트</NavbarButton>
        </Link>
      </Box>
      <Box>
        <Link href={"/projects"}>
          <NavbarButton>프로젝트</NavbarButton>
        </Link>
      </Box>
      <Box>
        <Link href={"/leaderboard"}>
          <NavbarButton>유저랭킹</NavbarButton>
        </Link>
      </Box>
    </Stack>
  );
}
