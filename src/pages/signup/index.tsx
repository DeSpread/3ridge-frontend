import React, { MouseEvent, ReactElement, useMemo, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";
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
  getLocaleErrorMessage,
} from "../../error/my-error";
import { useAlert } from "../../provider/alert/alert-provider";
import SignUpWithEmailForm from "./components/sign-up-with-email-form";
import {
  EmailSignUpEventParams,
  MAIL_VERIFY,
  MouseEventWithParam,
  ObjectValues,
  SupportedNetwork,
} from "../../type";
import VerifyYourEmailForm from "../../components/organisms/verify-your-email-form";
import { useLoading } from "../../provider/loading/loading-provider";
import { useSignDialog } from "../../page-hook/sign-dialog-hook";
import AwsClient from "../../remote/aws-client";
import SignInWithNetworkSelectDialog from "../../layouts/dialog/sign/sign-in-with-network-select-dialog";
import SignInWithSupportedWalletDialog from "../../layouts/dialog/sign/sign-in-with-supported-wallet-dialog";
import {
  convertToSuppoertedNetwork,
  convertToWalletName,
} from "../../util/type-util";
import ResourceFactory from "../../helper/resource-factory";
import { useTheme } from "@mui/material/styles";
import { useMobile } from "../../provider/mobile/mobile-context";

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
    // resendEmailVerify,
  } = useLogin();
  const { showLoading, closeLoading } = useLoading();
  const { setShowSignInDialog } = useSignDialog();
  const [signupParams, setSignUpParams] = useState<EmailSignUpEventParams>({
    email: "",
    password: "",
  });
  const [formType, setFormType] = useState<FormType>(FORM_TYPE.WITH_EMAIL);
  const [signInWithNetworkSelectVisible, setSignInWithNetworkSelectVisible] =
    useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const resourceFactory = ResourceFactory.getInstance();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { isMobile } = useMobile();

  const signInWithSupportedWalletVisible = useMemo(() => {
    return selectedNetwork ? true : false;
  }, [selectedNetwork]);

  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
      </Head>
      <div
        style={{ flex: 1, background: "", minHeight: `calc(100vh - 140px)` }}
      >
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
                setSignInWithNetworkSelectVisible(true);
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
              onClickSignIn={(e) => {
                e.preventDefault();
                setShowSignInDialog(true);
              }}
              onClickSendVerification={(e) => {
                const myEvent =
                  e as MouseEventWithParam<EmailSignUpEventParams>;
                showLoading();
                emailVerify(myEvent.params, {
                  onSuccess: (msg) => {
                    if (msg === "mail auth is already done") {
                      showErrorAlert({
                        content: "이미 인증으로 사용된 메일입니다.",
                      });
                      closeLoading();
                      return;
                    }
                    setSignUpParams({ ...myEvent.params });
                    setFormType(FORM_TYPE.VERIFY_EMAIL);
                    closeLoading();
                  },
                  onError: (error: AppError) => {
                    // console.log(error);
                    if (error.message === "auth already requested") {
                      setSignUpParams({ ...myEvent.params });
                      setFormType(FORM_TYPE.VERIFY_EMAIL);
                      closeLoading();
                      return;
                    }
                    showErrorAlert({ content: getLocaleErrorMessage(error) });
                    closeLoading();
                  },
                });
              }}
            ></SignUpWithEmailForm>
          )}
          {formType === FORM_TYPE.VERIFY_EMAIL && (
            <VerifyYourEmailForm
              email={signupParams.email}
              signInTitle={"인증하였다면, 메일로 로그인 시도하기"}
              onClickResendVerification={async (e) => {
                const { email, password } = signupParams;
                showLoading();
                try {
                  const res = await AwsClient.getInstance().asyncResendAuthMail(
                    email
                  );
                  if (res.status === 500 || res.status === 400) {
                    const data = await res.text();
                    const message = JSON.parse(data).message;
                    showErrorAlert({ content: message });
                  } else {
                    showAlert({
                      title: "Info",
                      content: (
                        <div>
                          <p style={{ marginBottom: -2 }}>
                            이메일이 재전송 되었습니다
                          </p>
                          <p>메일함에 메일을 확인해주세요</p>
                        </div>
                      ),
                    });
                  }
                } catch (e) {
                  showErrorAlert({ content: "Unknown error occurred" });
                } finally {
                  closeLoading();
                }
              }}
              onClickSignIn={(e) => {
                const { email, password } = signupParams;
                showLoading();
                emailSignIn(
                  { email, password },
                  {
                    onSuccess: () => {
                      closeLoading();
                      router.push("/profile").then();
                    },
                    onError: (e: Error) => {
                      closeLoading();
                      showErrorAlert({ content: getLocaleErrorMessage(e) });
                    },
                  }
                );
              }}
            ></VerifyYourEmailForm>
          )}
          <Stack
            direction={"column"}
            sx={{
              paddingTop: 0,
              minWidth: smUp ? "500px" : "80%",
              paddingBottom: 10,
              background: "",
            }}
            spacing={1}
          >
            <Divider></Divider>
            {smUp ? (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography variant={"body2"} textAlign={"center"}>
                  가입시 다음에 동의합니다.
                </Typography>
                <LinkTypography variant={"body2"}>
                  &nbsp;이용약관&nbsp;
                </LinkTypography>
                <Typography variant={"body2"}>및</Typography>
                <LinkTypography variant={"body2"}>
                  &nbsp;개인 정보 보호 방침
                </LinkTypography>
              </Stack>
            ) : (
              <Stack
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography variant={"body2"} textAlign={"center"}>
                  가입시 다음에 동의합니다.
                </Typography>
                <Stack direction={"row"}>
                  <LinkTypography variant={"body2"}>
                    &nbsp;이용약관&nbsp;
                  </LinkTypography>
                  <Typography variant={"body2"}>및</Typography>
                  <LinkTypography variant={"body2"}>
                    &nbsp;개인 정보 보호 방침
                  </LinkTypography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
        <SignInWithNetworkSelectDialog
          title={"연결하려는 네트워트를 선택하세요"}
          open={signInWithNetworkSelectVisible}
          onCloseBtnClicked={(e) => {
            e.preventDefault();
            setSignInWithNetworkSelectVisible(false);
          }}
          onClose={() => {
            setSignInWithNetworkSelectVisible(false);
          }}
          onNetworkButtonClicked={(network) => {
            setSignInWithNetworkSelectVisible(false);
            setSelectedNetwork(network);
          }}
        ></SignInWithNetworkSelectDialog>
        <SignInWithSupportedWalletDialog
          title={"연결하려는 지갑을 선택하세요"}
          open={signInWithSupportedWalletVisible}
          onCloseBtnClicked={(e) => {
            e.preventDefault();
            setSelectedNetwork("");
          }}
          onClose={() => {
            setSelectedNetwork("");
          }}
          walletInfos={(() => {
            return resourceFactory.getWalletInfos(
              convertToSuppoertedNetwork(selectedNetwork),
              isMobile
            );
          })()}
          onWalletSelected={({ name, value }) => {
            const walletName = convertToWalletName(value);
            walletSignUp(
              {
                network: selectedNetwork as SupportedNetwork,
                name: walletName,
              },
              {
                onSuccess: () => {
                  showLoading();
                  router.push("/explore").then((res) => {
                    closeLoading();
                    setSelectedNetwork("");
                  });
                },
                onError: (error: AppError) => {
                  if (
                    error.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED
                  ) {
                    //@ts-ignore
                    showWalletAlert(convertToSuppoertedNetwork(error.payload));
                  } else {
                    showErrorAlert({ content: error.message });
                  }
                  setSelectedNetwork("");
                },
              }
            );
          }}
        ></SignInWithSupportedWalletDialog>
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
