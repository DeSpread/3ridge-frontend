import React, { ReactElement } from "react";
import MainLayout from "../../layouts/main-layout";
import HomeFooter from "../../layouts/footer/home-footer";
import PrimaryButton from "../../components/atomic/atoms/primary-button";

const Test = () => {
  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:8000/kakao",
    });
  };

  return (
    <>
      <PrimaryButton onClick={kakaoLogin}>로그인</PrimaryButton>
    </>
  );
};

Test.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout disableNavButtonSet={true} footerComponent={<HomeFooter />}>
    {page}
  </MainLayout>
);

export default Test;
