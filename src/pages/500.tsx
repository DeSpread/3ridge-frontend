import NextLink from "next/link";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "../components/atoms/primary-button";
import LinkTypography from "../components/atoms/link-typography";

const ServerError = (props: { error: Error }) => {
  const theme = useTheme();

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
        <Stack>
          <Box sx={{ marginBottom: 1 }}>
            <Typography variant={"h6"}>문제가 발생하였습니다</Typography>
          </Box>
          <Box sx={{ marginBottom: 1 }}>
            <Divider></Divider>
          </Box>
          <Typography>
            문제가 지속될 경우 아래 이메일 링크로 개발자에게 문의해 보세요
          </Typography>
          <LinkTypography
            sx={{
              fontWeight: "bold",
              color: theme.palette.error.main,
              "&:hover": {
                color: theme.palette.error.light,
                textDecoration: "underline",
              },
            }}
          >
            이메일 문의
          </LinkTypography>
        </Stack>
      </Box>
    </>
  );
};

export default ServerError;
