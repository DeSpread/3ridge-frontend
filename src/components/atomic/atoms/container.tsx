import { Box, BoxProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Container = (props: BoxProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderWidth: 1,
        borderStyle: "solid",
        padding: 2,
        borderColor: theme.palette.neutral[700],
        borderRadius: 1,
      }}
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default Container;
