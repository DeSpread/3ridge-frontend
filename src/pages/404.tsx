import NextLink from "next/link";
import Head from "next/head";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import PrimaryButton from "../components/atomic/atoms/primary-button";

const NotFound = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Head>
        <title>Error: Not Found</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          backgroundColor: "background.paper",
          display: "flex",
          flexGrow: 1,
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{ flex: 1, marginTop: -16 }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            alt={""}
            width={512}
            height={512}
            src={"https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/404.svg"}
            style={{ marginBottom: -64 }}
          ></Image>
          <Typography
            align="center"
            color="textSecondary"
            sx={{ mt: 0.5 }}
            variant="body1"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <NextLink href="/home" passHref>
              <PrimaryButton variant="outlined">
                Back to Dashboard
              </PrimaryButton>
            </NextLink>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default NotFound;
