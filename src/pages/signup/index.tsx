import { MouseEvent, ReactElement, useState } from "react";
import MainLayout from "../../components/layouts/main-layout";
import { Divider, Stack, Typography } from "@mui/material";
import HomeFooter from "../../components/layouts/footer/home-footer";
import Head from "next/head";
import LinkTypography from "../../components/atoms/link-typography";
import SignUpSelectForm from "./components/sign-up-select-form";
import SignUpOthersForm from "./components/sign-up-others-form";

const Signup = () => {
  const [formType, setFormType] = useState("select-form");

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
                console.log("aaa");
                setFormType("others-form");
              }}
            ></SignUpSelectForm>
          )}
          {formType === "others-form" && <SignUpOthersForm></SignUpOthersForm>}
          <Stack
            direction={"column"}
            sx={{ paddingTop: 16, minWidth: "500px", paddingBottom: 10 }}
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
