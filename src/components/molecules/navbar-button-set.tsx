import { Box, AppBar, Stack, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NavbarButton from "../atoms/navbar-button";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WindowIcon from "@mui/icons-material/Window";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { MouseEventHandler, PropsWithChildren } from "react";

type NavbarButtonSetProps = PropsWithChildren & {
  bountiesBtnOnClick: MouseEventHandler;
  contentsBtnOnClick: MouseEventHandler;
  achievementsBtnOnClick: MouseEventHandler;
  communitiesBtnOnClick: MouseEventHandler;
  leaderBoardBtnOnClick: MouseEventHandler;
};

const NavbarButtonSet = ({
  bountiesBtnOnClick,
  contentsBtnOnClick,
  achievementsBtnOnClick,
  communitiesBtnOnClick,
  leaderBoardBtnOnClick,
}: NavbarButtonSetProps) => {
  const theme = useTheme();

  return (
    <Stack direction={"row"}>
      <NavbarButton
        onClick={bountiesBtnOnClick}
        icon={<BoltIcon sx={{ color: "yellow" }}></BoltIcon>}
      >
        Events
      </NavbarButton>
      {/*<NavbarButton*/}
      {/*  onClick={contentsBtnOnClick}*/}
      {/*  icon={*/}
      {/*    <LocalFireDepartmentIcon*/}
      {/*      sx={{ color: "#ff900b" }}*/}
      {/*    ></LocalFireDepartmentIcon>*/}
      {/*  }*/}
      {/*>*/}
      {/*  Contents*/}
      {/*</NavbarButton>*/}
      {/*<NavbarButton*/}
      {/*  onClick={achievementsBtnOnClick}*/}
      {/*  icon={<EmojiEventsIcon sx={{ color: "#ffd15c" }}></EmojiEventsIcon>}*/}
      {/*>*/}
      {/*  Achievements*/}
      {/*</NavbarButton>*/}
      <NavbarButton
        onClick={communitiesBtnOnClick}
        icon={
          <WindowIcon sx={{ color: theme.palette.primary.main }}></WindowIcon>
        }
      >
        Projects
      </NavbarButton>
      <NavbarButton
        onClick={leaderBoardBtnOnClick}
        icon={
          <BarChartIcon
            sx={{ color: theme.palette.primary.main }}
          ></BarChartIcon>
        }
      >
        LeaderBoard
      </NavbarButton>
    </Stack>
  );
};

export default NavbarButtonSet;
