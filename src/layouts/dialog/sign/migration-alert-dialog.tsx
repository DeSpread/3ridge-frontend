import { Stack, Typography } from "@mui/material";
import React, { MouseEventHandler } from "react";

import PrimaryButton from "@/components/atomic/atoms/primary-button";
import SimpleDialog, {
  SimpleDialogProps,
} from "@/components/dialogs/simple-dialog";

const MigrationAlertDialog = ({
  onMigrationAllowedClick,
  onMigrationCancelClick,
  ...rest
}: {
  onMigrationAllowedClick?: MouseEventHandler;
  onMigrationCancelClick?: MouseEventHandler;
} & SimpleDialogProps) => {
  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Stack sx={{}} alignItems={"center"}>
          <Typography variant={"body1"}>
            기존 사용 하던 계정이 있으신가요? 기존 데이터를 연동해드리겠습니다
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ marginTop: 3 }}>
          <PrimaryButton onClick={onMigrationAllowedClick}>
            네 기존에 사용하던 쓰릿지 계정이 있습니다
          </PrimaryButton>
          <PrimaryButton onClick={onMigrationCancelClick}>
            아니요 쓰릿지 방문이 처음입니다
          </PrimaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default MigrationAlertDialog;
