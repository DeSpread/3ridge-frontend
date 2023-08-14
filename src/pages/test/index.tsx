import React from "react";
import PrimaryButton from "../../components/atomic/atoms/primary-button";

const Test = () => {
  return (
    <>
      <PrimaryButton
        onClick={(e) => {
          location.href =
            "https://discord.com/api/oauth2/authorize?client_id=1138447738871238736&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fdiscord&response_type=code&scope=identify";
        }}
      >
        로그인
      </PrimaryButton>
    </>
  );
};

export default Test;
