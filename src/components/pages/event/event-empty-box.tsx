import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { StackProps } from "@mui/system";

const EventEmptyBox = (props: { title?: string } & StackProps) => {
  const { title, ...rest } = props;
  const theme = useTheme();
  return (
    <Stack
      {...rest}
      style={{
        borderRadius: 10,
        borderColor: theme.palette.neutral[700],
        borderStyle: "solid",
        borderWidth: 2,
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography>{title}</Typography>
    </Stack>
  );
};

export default EventEmptyBox;
