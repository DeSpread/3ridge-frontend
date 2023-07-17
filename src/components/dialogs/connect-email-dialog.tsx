import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { MouseEventHandler, useState } from "react";
import VerifyYourEmailForm from "../organisms/verify-your-email-form";
import SendVerificationEmailForm from "../organisms/send-verification-email-form";
import {
  EmailSignUpEventParams,
  MouseEventWithParam,
  ObjectValues,
  Z_INDEX_OFFSET,
} from "../../type";
import MailTextField from "../molecules/mail-text-field";
import SecondaryButton from "../atoms/secondary-button";
import { validateMail } from "../../util/string-util";
import AwsClient from "../../remote/aws-client";
import { useAlert } from "../../provider/alert/alert-provider";
import { getLocaleErrorMessage } from "../../error/my-error";
import CircularProgress from "@mui/material/CircularProgress";
import addSeconds from "date-fns/addSeconds";
import ValidatedTextInput from "../molecules/validated-text-input";
import { useTheme } from "@mui/material/styles";

export const CONNECT_MAIL_DIALOG_FORM_TYPE = {
  SEND_EMAIL: "SEND_EMAIL",
  VERIFY_EMAIL: "VERIFY_EMAIL",
} as const;

export type ConnectMailDialogFormType = ObjectValues<
  typeof CONNECT_MAIL_DIALOG_FORM_TYPE
>;

type ConnectEmailDialogProps = DialogProps & {
  onOauthComplete: (mail: string) => void;
  onCloseBtnClicked: MouseEventHandler;
};

const ConnectEmailDialog = (props: ConnectEmailDialogProps) => {
  const [mail, setMail] = useState("");
  const { showAlert, showErrorAlert, closeAlert } = useAlert();
  const [authLoading, setAuthLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [code, setCode] = useState("");
  const [codeErrorMessage, setCodeErrorMessage] = useState("");
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const COUNT = 600;

  return (
    <Dialog
      {...props}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG,
      }}
    >
      <DialogTitle>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography textAlign={"left"} variant={"h6"}>
            {props.title}
          </Typography>
          <IconButton
            sx={{ borderRadius: 32, marginRight: -1 }}
            onClick={props.onCloseBtnClicked}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 0, marginBottom: 0 }}>
          <Stack
            direction={"column"}
            sx={{
              background: "",
              minWidth: smUp ? "500px" : "",
              paddingTop: 4,
              marginBottom: 12,
            }}
            spacing={4}
          >
            <Typography textAlign={"left"} variant={"h5"}>
              메일 인증하기
            </Typography>
            <Stack spacing={4}>
              <Box sx={{ width: "100%", background: "", position: "relative" }}>
                <MailTextField
                  disabled={count > 0 || authLoading}
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  placeholder={"Email Address"}
                  sx={{ width: "100%" }}
                ></MailTextField>
                {smUp && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SecondaryButton
                      disabled={!validateMail(mail) || authLoading || count > 0}
                      color={"secondary"}
                      variant={"contained"}
                      sx={{
                        borderRadius: "11px",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        height: "100%",
                        width: 120,
                        borderColor: "transparent",
                        background: "transparent",
                      }}
                      size={"small"}
                      onClick={async (e) => {
                        try {
                          if (count > 0) {
                            return;
                          }
                          setAuthLoading(true);
                          setCodeErrorMessage("");
                          const res =
                            await AwsClient.getInstance().asyncRequestAuthCodeMail(
                              mail
                            );
                          if (res.status === 204) {
                            setCount(COUNT);
                            let _vDate = addSeconds(new Date(), COUNT + 1);
                            let intervalId = setInterval(() => {
                              const now = new Date();
                              //@ts-ignore
                              const distDt = _vDate - now;
                              setCount((prevState) => {
                                return prevState > 0 ? prevState - 1 : 0;
                              });
                              if (distDt < 0) {
                                clearInterval(intervalId);
                                setCount(0);
                                return;
                              }
                            }, 1000);
                          } else {
                            const data = await res.text();
                            const message = JSON.parse(data).message;
                            showErrorAlert({ content: message });
                          }
                        } catch (e) {
                          setCount(0);
                          showErrorAlert({ content: getLocaleErrorMessage(e) });
                        } finally {
                          setAuthLoading(false);
                        }
                      }}
                    >
                      {authLoading && (
                        <CircularProgress size={16}></CircularProgress>
                      )}
                      {!authLoading && count === 0 && "인증 메일 전송"}
                      {!authLoading && count > 0 && `${count.toString()}초`}
                    </SecondaryButton>
                  </div>
                )}
                {!smUp && (
                  <SecondaryButton
                    disabled={!validateMail(mail) || authLoading || count > 0}
                    color={"secondary"}
                    variant={"contained"}
                    sx={{
                      borderRadius: "11px",
                      borderWidth: 1,
                      // borderTopLeftRadius: 0,
                      // borderBottomLeftRadius: 0,
                      height: "100%",
                      width: "100%",
                      // borderColor: "transparent",
                      background: "transparent",
                      marginTop: 1,
                    }}
                    size={"small"}
                    onClick={async (e) => {
                      try {
                        if (count > 0) {
                          return;
                        }
                        setAuthLoading(true);
                        setCodeErrorMessage("");
                        const res =
                          await AwsClient.getInstance().asyncRequestAuthCodeMail(
                            mail
                          );
                        if (res.status === 204) {
                          setCount(COUNT);
                          let _vDate = addSeconds(new Date(), COUNT + 1);
                          let intervalId = setInterval(() => {
                            const now = new Date();
                            //@ts-ignore
                            const distDt = _vDate - now;
                            setCount((prevState) => {
                              return prevState > 0 ? prevState - 1 : 0;
                            });
                            if (distDt < 0) {
                              clearInterval(intervalId);
                              setCount(0);
                              return;
                            }
                          }, 1000);
                        } else {
                          const data = await res.text();
                          const message = JSON.parse(data).message;
                          showErrorAlert({ content: message });
                        }
                      } catch (e) {
                        setCount(0);
                        showErrorAlert({ content: getLocaleErrorMessage(e) });
                      } finally {
                        setAuthLoading(false);
                      }
                    }}
                  >
                    {authLoading && (
                      <CircularProgress size={16}></CircularProgress>
                    )}
                    {!authLoading && count === 0 && "인증 메일 전송"}
                    {!authLoading && count > 0 && `${count.toString()}초`}
                  </SecondaryButton>
                )}
              </Box>
              {/* ---  --- */}
              {count > 0 && (
                <Stack>
                  <Box
                    sx={{ width: "100%", background: "", position: "relative" }}
                  >
                    <ValidatedTextInput
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value?.trim());
                      }}
                      isValid={code.length === 6}
                      inputProps={{
                        style: {
                          height: 10,
                        },
                      }}
                      placeholder={"Code 6자리"}
                      sx={{ width: "100%" }}
                    ></ValidatedTextInput>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SecondaryButton
                        disabled={!(authLoading || count > 0)}
                        color={"secondary"}
                        variant={"contained"}
                        sx={{
                          borderRadius: "11px",
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          height: "100%",
                          width: 120,
                          borderColor: "transparent",
                          background: "transparent",
                        }}
                        size={"small"}
                        onClick={async (e) => {
                          try {
                            setCodeLoading(true);
                            const res =
                              await AwsClient.getInstance().asyncGetAuthCodeOfMail(
                                mail
                              );
                            const data = await res.text();
                            const message = JSON.parse(data).message;
                            if (message === code) {
                              props.onOauthComplete?.(mail);
                            } else {
                              setCodeErrorMessage("인증 코드가 맞지 않습니다");
                            }
                          } catch (e) {
                            showErrorAlert({
                              content: getLocaleErrorMessage(e),
                            });
                          } finally {
                            setCodeLoading(false);
                          }
                        }}
                      >
                        {codeLoading && (
                          <CircularProgress size={16}></CircularProgress>
                        )}
                        {!codeLoading && "코드인증"}
                      </SecondaryButton>
                    </div>
                  </Box>
                  {codeErrorMessage && (
                    <Box sx={{ marginTop: 1 }}>
                      <Typography
                        variant={"body2"}
                        color={theme.palette.error.main}
                      >
                        {codeErrorMessage}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectEmailDialog;
