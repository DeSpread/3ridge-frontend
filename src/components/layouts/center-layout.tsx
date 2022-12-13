import {Box} from "@mui/material";
import {PropsWithChildren} from "react";

const CenterLayout = ({children}: PropsWithChildren) => {
  return (
      <Box
          pt={10}
          pl={50}
          pr={50}>
        {children}
      </Box>
  );
};

export default CenterLayout;
