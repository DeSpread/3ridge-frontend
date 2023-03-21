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
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
} from "../../error/my-error";
import { useAlert } from "../../provider/alert/alert-provider";
import SignUpWithEmailForm from "./components/sign-up-with-email-form";
import {
  EmailSignUpEventParams,
  MAIL_VERIFY,
  MouseEventWithParam,
  ObjectValues,
} from "../../type";
import VerifyYourEmailForm from "../../components/organisms/verify-your-email-form";
import { useLoading } from "../../provider/loading/loading-provider";
import { useSignDialog } from "../../page-hook/sign-dialog-hook";

const FORM_TYPE = {
  SELECT: "SELECT",
  OTHERS: "OTHERS",
  WITH_EMAIL: "WITH_EMAIL",
  VERIFY_EMAIL: "VERIFY_EMAIL",
} as const;

type FormType = ObjectValues<typeof FORM_TYPE>;

const Signup = () => {
  const router = useRouter();
  const { showErrorAlert, showAlert } = useAlert();
  const {
    googleSignUp,
    walletSignUp,
    emailVerify,
    emailSignIn,
    resendEmailVerify,
  } = useLogin();
  const { showLoading, closeLoading } = useLoading();
  const { setShowSignInDialog } = useSignDialog();
  const [signupParams, setSignUpParams] = useState<EmailSignUpEventParams>({
    email: "",
    password: "",
  });
  const [formType, setFormType] = useState<FormType>(FORM_TYPE.SELECT);

  return (
    <>
      <Head>
        <title>3ridge : Bridge to Web3</title>
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
                console.log("aaa");
                googleSignUp({
                  onSuccess: () => {
                    router.push("/profile").then();
                  },
                  onError: (error: AppError) => {
                    if (
                      getErrorMessage(error).includes(
                        APP_ERROR_MESSAGE.GOOGLE_LOGIN_POPUP_CLOSED
                      )
                    ) {
                      return;
                    }
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
                const myEvent =
                  e as MouseEventWithParam<EmailSignUpEventParams>;
                showLoading();
                emailVerify(myEvent.params, {
                  onSuccess: () => {
                    setSignUpParams({ ...myEvent.params });
                    setFormType(FORM_TYPE.VERIFY_EMAIL);
                    closeLoading();
                  },
                  onError: (error: AppError) => {
                    console.error(error);
                    let message = "Unknown error occurred";
                    if (error.message === MAIL_VERIFY.NOT_VERIFIED) {
                      closeLoading();
                      setSignUpParams({ ...myEvent.params });
                      setFormType(FORM_TYPE.VERIFY_EMAIL);
                    } else if (error.message === MAIL_VERIFY.USER_NOT_FOUND) {
                      closeLoading();
                      message = "Something auth progress problem occurred";
                      showErrorAlert({ content: message });
                    } else if (error.message === MAIL_VERIFY.PASSWORD_WRONG) {
                      closeLoading();
                      message = "Check your password";
                      showErrorAlert({ content: message });
                    } else if (error.message === MAIL_VERIFY.VERIFIED) {
                      const { email, password } =
                        error.payload as EmailSignUpEventParams;
                      emailSignIn(
                        { email, password },
                        {
                          onSuccess: () => {
                            closeLoading();
                            router.push("/profile").then();
                          },
                          onError: (e: Error) => {
                            closeLoading();
                            showErrorAlert({ content: getErrorMessage(e) });
                          },
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
                    onError: (error: Error) => {
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
                      router.push("/profile").then();
                    },
                    onError: (e: Error) => {},
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
