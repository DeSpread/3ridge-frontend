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
import { useSetRecoilState } from "recoil";
import { showSignInDialogState } from "../../recoil";
import { useAlert } from "../../provider/alert/alert-provider";
import SignUpWithEmailForm from "./components/sign-up-with-email-form";
import { MAIL_VERIFY, MouseEventWithParam, ObjectValues } from "../../type";
import { EmailSignUpParams } from "../../provider/login/hook/email-login-hook";
import VerifyYourEmailForm from "./components/verify-your-email-form";

export const FORM_TYPE = {
  SELECT: "SELECT",
  OTHERS: "OTHERS",
  WITH_EMAIL: "WITH_EMAIL",
  VERIFY_EMAIL: "VERIFY_EMAIL",
} as const;

type FormType = ObjectValues<typeof FORM_TYPE>;

const Signup = () => {
  const [formType, setFormType] = useState<FormType>(FORM_TYPE.SELECT);
  const router = useRouter();
  const { googleSignUp, walletSignUp } = useLogin();
  const setShowSignInDialog = useSetRecoilState(showSignInDialogState);
  const { showErrorAlert, showAlert, closeAlert } = useAlert();
  const { emailVerify, emailSignIn, resendEmailVerify } = useLogin();
  const [signupParams, setSignUpParams] = useState<EmailSignUpParams>({
    email: "",
    password: "",
  });

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
          {formType === FORM_TYPE.SELECT && (
            <SignUpSelectForm
              onClickSignUpWith={(e: MouseEvent) => {
                e.preventDefault();
                setFormType(FORM_TYPE.OTHERS);
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
          {formType === FORM_TYPE.OTHERS && (
            <SignUpOthersForm
              onSignUpWithGoogleClicked={(e) => {
                googleSignUp({
                  onSuccess: () => {
                    router.push("/").then();
                  },
                  onError: (error: AppError) => {
                    showErrorAlert({ content: error.message });
                  },
                });
              }}
              onSignUpWithEmailClicked={(e) => {
                setFormType(FORM_TYPE.WITH_EMAIL);
              }}
            ></SignUpOthersForm>
          )}
          {formType === FORM_TYPE.WITH_EMAIL && (
            <SignUpWithEmailForm
              onClickSendVerification={(e) => {
                const myEvent = e as MouseEventWithParam<EmailSignUpParams>;
                emailVerify(myEvent.params, {
                  onSuccess: () => {
                    setSignUpParams({ ...myEvent.params });
                    setFormType(FORM_TYPE.VERIFY_EMAIL);
                  },
                  onError: (error: AppError) => {
                    console.log("aaa");
                    console.error(error);
                    let message = "Unknown error occurred";
                    if (error.message === MAIL_VERIFY.NOT_VERIFIED) {
                      setSignUpParams({ ...myEvent.params });
                      setFormType(FORM_TYPE.VERIFY_EMAIL);
                    } else if (error.message === MAIL_VERIFY.USER_NOT_FOUND) {
                      message = "Something auth progress problem occurred";
                      showErrorAlert({ content: message });
                    } else if (error.message === MAIL_VERIFY.PASSWORD_WRONG) {
                      message = "Check your password";
                      showErrorAlert({ content: message });
                    } else if (error.message === MAIL_VERIFY.VERIFIED) {
                      const { email, password } =
                        error.payload as EmailSignUpParams;
                      emailSignIn(
                        { email, password },
                        {
                          onSuccess: () => {
                            router.push("/").then();
                          },
                          onError: (e) => {},
                        }
                      );
                    }
                  },
                });
              }}
            ></SignUpWithEmailForm>
          )}
          {formType === FORM_TYPE.VERIFY_EMAIL && (
            <VerifyYourEmailForm
              email={signupParams.email}
              onClickResendVerification={(e) => {
                const { email, password } = signupParams;
                resendEmailVerify(
                  { email, password },
                  {
                    onSuccess: () => {
                      showAlert({
                        title: "Info",
                        content: (
                          <div>
                            <p style={{ marginBottom: -2 }}>Email is resend</p>
                            <p>Please check your email</p>
                          </div>
                        ),
                      });
                    },
                    onError: (error) => {
                      if (error.message === MAIL_VERIFY.VERIFIED) {
                        showAlert({
                          title: "Info",
                          content: (
                            <div>
                              <p style={{ marginBottom: -2 }}>
                                Already verified
                              </p>
                              <p>Please Sign in</p>
                            </div>
                          ),
                        });
                        return;
                      }
                      showErrorAlert({ content: "Unknown error occurred" });
                    },
                  }
                );
              }}
              onClickSignIn={(e) => {
                const { email, password } = signupParams;
                emailSignIn(
                  { email, password },
                  {
                    onSuccess: () => {
                      router.push("/").then();
                    },
                    onError: (e) => {},
                  }
                );
              }}
            ></VerifyYourEmailForm>
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
