import { Stack, Typography } from "@mui/material";
import React, { MouseEvent, useState } from "react";

import PrimaryButton from "@/components/atomic/atoms/primary-button";
import SimpleDialog, {
  SimpleDialogProps,
} from "@/components/dialogs/simple-dialog";
import MarketingAgreementForm from "@/components/form/signup/marketing-agreement-form";
import { useAlert } from "@/provider/alert/alert-provider";

const AccountCreateAlertDialog = ({
  onCreateAccountClick,
  ...rest
}: {
  onCreateAccountClick?(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    isAgreeMarketingTerm: boolean,
  ): void;
} & SimpleDialogProps) => {
  const [checkedList, setCheckedList] = useState([false, false]);
  const { showAlert } = useAlert();

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Stack sx={{}} alignItems={"center"}>
          <Typography variant={"body1"}>
            카카오 계정으로 계정이 새로 성성됩니다 계속 하시겠습니까?
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ marginTop: 3 }}>
          <PrimaryButton
            onClick={(e) => {
              if (!(checkedList[0] && checkedList[1])) {
                showAlert({
                  title: "알림",
                  content: "마케팅 수신에 모두 동의 부탁드립니다",
                });
                return;
              }
              onCreateAccountClick?.(e, checkedList[1]);
            }}
          >
            예, 생성하겠습니다.
          </PrimaryButton>
          <MarketingAgreementForm
            defaultValue={false}
            onChangedValue={(checked) => {
              setCheckedList([...checked]);
            }}
          ></MarketingAgreementForm>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default AccountCreateAlertDialog;
