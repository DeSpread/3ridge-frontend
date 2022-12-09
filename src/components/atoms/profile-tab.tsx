import {Box, Stack, Typography} from "@mui/material";
import {useEffect,} from "react";

const ProfileTab = (props: { headerTitle: string; }) => {
  const {headerTitle} = props;

  useEffect(() => {
  }, []);

  return (
      <>
        <Box
            sx={{
              flex: 1,
              // ...props.style
            }}
        >
          <Stack
              direction={"column"}
              alignItems={"left"}
              sx={{background: ""}}
              spacing={4}>
            <Typography variant="h4">
              {headerTitle}
            </Typography>
          </Stack>
        </Box>
      </>
  );
};

export default ProfileTab;
