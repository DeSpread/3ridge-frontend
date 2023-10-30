import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { MouseEventHandler, useEffect, useState } from "react";

import GradientTypography from "@/components/atomic/atoms/gradient-typography";
import PrimaryButton from "@/components/atomic/atoms/primary-button";
import SimpleDialog, {
  SimpleDialogProps,
} from "@/components/dialogs/simple-dialog";
import ErrorInfoForm from "@/components/form/error-info-form";
import MarketingAgreementForm from "@/components/form/signup/marketing-agreement-form";
import StringHelper from "@/helper/string-helper";
import { useAlert } from "@/provider/alert/alert-provider";
import { delay } from "@/util/timer";
import { Z_INDEX_OFFSET } from "@/types";

const MigrationDialog = ({
  onMigrationClick,
  address,
  ...rest
}: {
  address?: string;
  onMigrationClick?: MouseEventHandler;
} & SimpleDialogProps) => {
  const [checkedList, setCheckedList] = useState([false, false]);
  const [loading, setLoading] = useState(true);

  const { showAlert } = useAlert();

  useEffect(() => {
    setLoading(true);
    delay(500).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <SimpleDialog {...rest} maxWidth={"sm"}>
        <Stack sx={{ marginTop: 1 }} alignItems={"center"}>
          {address && (
            <>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography variant={"h5"}>연결된 주소:</Typography>
                <GradientTypography variant={"h5"}>
                  {StringHelper.convertAddressToMidEllipsis(address, 8, 6)}
                </GradientTypography>
              </Stack>
              <Stack spacing={2} sx={{ marginTop: 3 }} alignItems={"center"}>
                <PrimaryButton
                  onClick={(e) => {
                    if (!(checkedList[0] && checkedList[1])) {
                      showAlert({
                        title: "알림",
                        content: "마케팅 수신에 모두 동의 부탁드립니다",
                      });
                      return;
                    }
                    onMigrationClick?.(e);
                  }}
                >
                  해당 계정으로 카카오 연동하기
                </PrimaryButton>
                <MarketingAgreementForm
                  defaultValue={false}
                  onChangedValue={(checked) => {
                    setCheckedList([...checked]);
                  }}
                ></MarketingAgreementForm>
              </Stack>
            </>
          )}
          {!loading && !address && (
            <>
              <Stack
                direction={"column"}
                width={"100%"}
                sx={{ background: "" }}
              >
                <Typography>지갑으로 로그인 되지 않았습니다.</Typography>
                <Typography>지갑 로그인이 된 후 연동이 가능합니다.</Typography>
                <Box sx={{ marginTop: -1 }}>
                  <ErrorInfoForm content={""}></ErrorInfoForm>
                </Box>
              </Stack>
            </>
          )}
          {loading && !address && (
            <>
              <Stack
                direction={"column"}
                width={"100%"}
                minHeight={280}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CircularProgress size="sm" />
              </Stack>
            </>
          )}
        </Stack>
      </SimpleDialog>
    </>
  );
};

export default MigrationDialog;
