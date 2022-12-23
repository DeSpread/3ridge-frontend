import { MouseEvent, ReactElement, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { Divider, Stack, Typography } from "@mui/material";
import HomeFooter from "../../layouts/footer/home-footer";
import Head from "next/head";
import LinkTypography from "../../components/atoms/link-typography";
import SignUpSelectForm from "./components/sign-up-select-form";
import SignUpOthersForm from "./components/sign-up-others-form";
import { useRouter } from "next/router";
import { useLogin } from "../../provider/login/login-provider";
import { AppError } from "../../error/my-error";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showSignInDialogState } from "../../recoil";
import { useAlert } from "../../provider/alert/alert-provider";

const Signup = () => {
  const [formType, setFormType] = useState("select-form");
  const router = useRouter();
  const { googleSignUp, walletSignUp } = useLogin();
  const setShowSignInDialog = useSetRecoilState(showSignInDialogState);
  const { showAlert, closeAlert } = useAlert();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div style={{ flex: 1, background: "" }}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ background: "" }}
        >
          {formType === "select-form" && (
            <SignUpSelectForm
              onClickSignUpWith={(e: MouseEvent) => {
                e.preventDefault();
                setFormType("others-form");
              }}
              onClickConnectWallet={(e: MouseEvent) => {
                e.preventDefault();
                walletSignUp({
                  onSuccess: () => {
                    router.push("/").then();
                  },
                  onError: (error: AppError) => {},
                });
              }}
              onShowSignClicked={(e) => {
                e.preventDefault();
                setShowSignInDialog(true);
              }}
            ></SignUpSelectForm>
          )}
          {formType === "others-form" && (
            <SignUpOthersForm
              onSignUpWithGoogleClicked={(e) => {
                googleSignUp({
                  onSuccess: () => {
                    router.push("/").then();
                  },
                  onError: (error: AppError) => {
                    console.log(error);
                    // todo : show alert message (${error.name}, ${error.message})
                  },
                });
              }}
              onSignUpWithEmailClicked={(e) => {
                console.log("aaa");
                showAlert({ title: "test", content: "abc" });
              }}
            ></SignUpOthersForm>
          )}
          <Stack
            direction={"column"}
            sx={{ paddingTop: 0, minWidth: "500px", paddingBottom: 10 }}
            spacing={1}
          >
            <Divider></Divider>
            <Stack direction={"row"}>
              <Typography variant={"body2"}>
                By signing up, you agree to our
              </Typography>
              <LinkTypography variant={"body2"}>
                &nbsp;Terms of use&nbsp;
              </LinkTypography>
              <Typography variant={"body2"}>and</Typography>
              <LinkTypography variant={"body2"}>
                &nbsp;Privacy Policy
              </LinkTypography>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

Signup.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout disableNavButtonSet={true} footerComponent={<HomeFooter />}>
    {page}
  </MainLayout>
);

export default Signup;
