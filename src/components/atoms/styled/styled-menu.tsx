import { Chip, ChipProps, Menu, MenuProps } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    sx={{}}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 218,
    background: "transparent", //theme.palette.primary.main,
    color: "white",
    // boxShadow: "inset 4px 4px 4px #35333a, inset -4px -4px 4px #35333a",
    "& .MuiMenu-list": {
      padding: 2,
      margin: 2,
      // padding: "12px 4px",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default StyledMenu;
