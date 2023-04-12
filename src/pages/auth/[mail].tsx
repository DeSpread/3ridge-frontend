import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import { Stack, Typography, Box, Divider, Skeleton, Link } from "@mui/material";
import MainLayout from "../../layouts/main-layout";
import { useRouter } from "next/router";
import PrimaryButton from "../../components/atoms/primary-button";
import NextLink from "next/link";
import { useTheme } from "@mui/material/styles";
import AwsClient from "../../remote/aws-client";
import { getErrorMessage } from "../../error/my-error";
import { useLogin } from "../../provider/login/login-provider";
import { useAlert } from "../../provider/alert/alert-provider";
import { useLoading } from "../../provider/loading/loading-provider";

const Skelton = () => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      spacing={4}
      sx={{ marginBottom: 12 }}
    >
      <Divider
        sx={{ width: "100%", marginBottom: 4, borderBottomWidth: 2 }}
      ></Divider>
      <Skeleton
        width={412}
        height={256}
        animation={"wave"}
        variant={"rounded"}
      ></Skeleton>
      <Box sx={{ marginBottom: 4 }}></Box>
      <Divider sx={{ width: "100%", borderBottomWidth: 2 }}></Divider>
    </Stack>
  );
};

const SomethingError = (props: { errorMessage: string }) => {
  const theme = useTheme();

  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
        sx={{ marginBottom: 12 }}
      >
        <Divider
          sx={{ width: "100%", marginBottom: 4, borderBottomWidth: 2 }}
        ></Divider>
        <Stack
          sx={{
            width: 412,
            height: 256,
          }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant={"h5"} sx={{ marginBottom: 4 }}>
            ERROR
          </Typography>
          <Typography variant={"h6"} color={theme.palette.neutral[400]}>
            {props.errorMessage}
          </Typography>
          <Box sx={{ marginTop: 4 }}></Box>
          <NextLink
            href={"mailto:support@3ridge.xyz?subject=%F0%9F%91%8B"}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            <Link variant={"body1"}>Please contract to with error message</Link>
          </NextLink>
        </Stack>
        <Box sx={{ marginBottom: 4 }}></Box>
        <Divider sx={{ width: "100%", borderBottomWidth: 2 }}></Divider>
      </Stack>
    </>
  );
};

const AuthComplete = (props: { mail: string }) => {
  const theme = useTheme();
  const router = useRouter();
  const { emailSignInWithoutPassword, isLoggedIn } = useLogin();
  const { showAlert, showErrorAlert, closeAlert } = useAlert();
  const { showLoading, closeLoading } = useLoading();
  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
        sx={{ marginBottom: 12 }}
      >
        <Divider
          sx={{ width: "100%", marginBottom: 4, borderBottomWidth: 2 }}
        ></Divider>
        <Typography variant={"h4"} textAlign={"center"}>
          Mail Verification Complete
        </Typography>
        <Typography variant={"h6"} color={theme.palette.neutral[400]}>
          Thank you for using our service
        </Typography>
        <PrimaryButton
          sx={{
            width: 186,
            marginTop: 4,
          }}
          onClick={async () => {
            if (isLoggedIn) {
              router.push(`/explore`).then((res) => {});
              return;
            }
            showLoading();
            emailSignInWithoutPassword(
              { mail: props.mail },
              {
                onSuccess: () => {
                  closeLoading();
                  router.push(`/explore`).then((res) => {});
                },
                onError: (error) => {
                  closeLoading();
                  showErrorAlert({ content: error.message });
                },
              }
            );
          }}
        >
          <Box>
            <Typography
              className={"MuiTypography"}
              variant={"body1"}
              color={theme.palette.neutral[900]}
              fontFamily={"LINESeedKR-Bd"}
            >
              Start Now
            </Typography>
          </Box>
        </PrimaryButton>
        <Box sx={{ marginBottom: 4 }}></Box>
        <Divider sx={{ width: "100%", borderBottomWidth: 2 }}></Divider>
      </Stack>
    </>
  );
};

const Auth = () => {
  const router = useRouter();
  const theme = useTheme();
  const { updateAuthMail } = useLogin();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const mail =
        typeof router.query.mail === "string" ? router.query.mail : undefined;
      if (!mail) {
        setLoading(false);
        return;
      }
      setMail(mail);
      (async () => {
        try {
          console.log(`mail: ${mail}`);
          updateAuthMail(
            { mail },
            {
              onSuccess: (msg) => {
                setLoading(false);
              },
              onError: (error) => {
                const capitalizedStr = error.message.replace(
                  /^\w/,
                  (c: string) => c.toUpperCase()
                );
                setErrorMsg(`${capitalizedStr}`);
                setLoading(false);
              },
            }
          );
        } catch (e) {
          console.log(e);
          setErrorMsg(`Internal Error : ${getErrorMessage(e)}`);
          setLoading(false);
        }
      })();
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Mail authorization</title>
      </Head>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ background: "", height: `calc(100vh - 56px)` }}
      >
        {!loading &&
          (errorMsg ? (
            <SomethingError errorMessage={errorMsg}></SomethingError>
          ) : (
            <AuthComplete mail={mail}></AuthComplete>
          ))}
        {loading && <Skelton></Skelton>}
      </Stack>
    </>
  );
};

Auth.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Auth;
