import { OutlinedInput, OutlinedInputProps, styled } from "@mui/material";

const StyledOutlinedInput = styled((props: OutlinedInputProps) => (
  <OutlinedInput {...props}></OutlinedInput>
))(({ theme }) => ({
  borderWidth: 1,
  borderRadius: 12,
  borderColor: "transparent",
  boxShadow: "0 0 0 1px #35333a",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
    borderRadius: 12,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
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
}));

export default StyledOutlinedInput;
