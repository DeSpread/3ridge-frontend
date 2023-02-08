import { useTheme } from "@mui/material/styles";
import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NavbarButton from "../atoms/navbar-button";

type StyledMenuProps = PropsWithChildren & {
  open: boolean;
  anchorEl?: Element;
};

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  height: 10,
  ":focus": {
    backgroundColor: "transparent",
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
})) as typeof MenuItem;

const StyledMenu = ({ open, anchorEl, children }: StyledMenuProps) => {
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          marginTop: 2,
          minWidth: 180,
          borderWidth: 1,
          // background: "#19151e",
          "& .MuiMenu-list": {
            padding: "8px 4px",
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};

const SubMenuButton = (
  props: PropsWithChildren & {
    onExploreClick?: MouseEventHandler;
    onProjectsClick?: MouseEventHandler;
    onLeaderBoardClick?: MouseEventHandler;
  }
) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();

  return (
    <Box
      sx={{
        marginLeft: 2,
        cursor: "pointer",
        "&:hover": {
          color: "white",
          "& .curtain": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }}
      onClick={(event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
      }}
    >
      <IconButton
        sx={{
          borderColor: theme.palette.neutral["100"],
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 2,
          padding: 1,
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            // borderBottomColor: theme.palette.action.selected,
          },
        }}
      >
        <MoreHorizIcon
          sx={{
            color: "white",
            "&:hover": {
              color: theme.palette.neutral["900"],
            },
          }}
        ></MoreHorizIcon>
      </IconButton>
      <StyledMenu open={open} anchorEl={anchorEl}>
        <StyledMenuItem
          sx={{
            borderRadius: 1,
          }}
          onClick={props.onExploreClick}
        >
          <Stack>
            <NavbarButton>Explore</NavbarButton>
          </Stack>
        </StyledMenuItem>
        <StyledMenuItem
          sx={{
            borderRadius: 1,
          }}
          onClick={props.onProjectsClick}
        >
          <Stack>
            <NavbarButton>Projects</NavbarButton>
          </Stack>
        </StyledMenuItem>
        <StyledMenuItem
          sx={{
            borderRadius: 1,
          }}
          onClick={props.onLeaderBoardClick}
        >
          <Stack>
            <NavbarButton>LeaderBoard</NavbarButton>
          </Stack>
        </StyledMenuItem>
      </StyledMenu>
      <div
        className={"curtain"}
        style={{
          position: "absolute",
          marginTop: -32,
          width: 32,
          height: 32,
          borderRadius: 32,
        }}
      ></div>
    </Box>
  );
};

export default SubMenuButton;
