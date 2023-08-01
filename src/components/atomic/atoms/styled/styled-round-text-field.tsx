import { styled, TextField, TextFieldProps } from "@mui/material";
import { TabProps } from "@mui/material/Tab/Tab";
import Tab from "@mui/material/Tab";

const StyledRoundTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  borderWidth: 1,
  borderRadius: 12,
  borderColor: "transparent",
  boxShadow: "0 0 0 1px #35333a",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
      borderRadius: 12,
    },
    "&:hover fieldset": {
      borderColor: "transparent",
      backgroundColor: "transparent",
      transition: "box-shadow 0.1s ease-out 0s",
      boxShadow: "0 0 0 2px #787385",
      transitionDuration: "0.1s",
      transitionDelay: "0s",
      transitionTimingFunction: "ease-out",
      transitionProperty: "box-shadow",
      borderRadius: 12,
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
      borderRadius: 12,
    },
  },
}));

export default StyledRoundTextField;
