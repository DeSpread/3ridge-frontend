import {Box, Stack} from "@mui/material";
import {PropsWithChildren} from "react";

const CenterLayout = ({children}: PropsWithChildren) => {
  return (
      <>
        <Stack
            direction={"column"}
            alignItems={"center"}
        >
          <Box sx={{ maxWidth: "1200px", padding: "24px"}}>
            {children}
          </Box>
        </Stack>
      </>
  );
};

export default CenterLayout;
