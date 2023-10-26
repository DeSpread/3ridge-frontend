import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { index } from "@zxing/text-encoding/es2015/encoding/indexes";
import { e } from "msw/lib/glossary-de6278a9";
import React, { useEffect, useState } from "react";

import ClickTyphography from "@/components/atomic/atoms/click-typhography";
import PrimaryButton from "@/components/atomic/atoms/primary-button";
import SimpleDialog from "@/components/dialogs/simple-dialog";
import { useAlert } from "@/provider/alert/alert-provider";

const MarketingAgreementForm = ({
  defaultValue = false,
  onChangedValue,
}: {
  defaultValue?: boolean;
  onChangedValue?: (checked: boolean[]) => void;
}) => {
  const { showAlert } = useAlert();
  const [checkedList, setCheckedList] = useState([defaultValue, defaultValue]);
  const [openSubDialogList, setOpenSubDialogList] = useState([false, false]);

  useEffect(() => {
    onChangedValue?.(checkedList);
  }, [checkedList]);

  return (
    <>
      <Stack spacing={2} sx={{ marginTop: 3 }} alignItems={"center"}>
        <Stack spacing={2}>
          <div>
            <FormControlLabel
              label="마케팅 수신에 전체 동의"
              control={
                <Checkbox
                  checked={checkedList[0] && checkedList[1]}
                  indeterminate={checkedList[0] !== checkedList[1]}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCheckedList([
                      event.target.checked,
                      event.target.checked,
                    ]);
                  }}
                />
              }
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              <Stack direction={"row"} alignItems={"center"}>
                <FormControlLabel
                  label=""
                  control={
                    <Checkbox
                      checked={checkedList[0]}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setCheckedList([event.target.checked, checkedList[1]]);
                      }}
                    />
                  }
                />
                <Box sx={{ marginLeft: -2 }}>
                  <Tooltip title={"마케팅 수신 동의 - 1"}>
                    <Box>
                      <ClickTyphography
                        onClick={(e) => {
                          setOpenSubDialogList((prevState) => {
                            return [true, prevState[1]];
                          });
                        }}
                      >
                        마케팅 수신 동의 - 1
                      </ClickTyphography>
                    </Box>
                  </Tooltip>
                </Box>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <FormControlLabel
                  label=""
                  control={
                    <Checkbox
                      checked={checkedList[1]}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setCheckedList([checkedList[0], event.target.checked]);
                      }}
                    />
                  }
                />
                <Box sx={{ marginLeft: -2 }}>
                  <Tooltip title={"마케팅 수신 동의 - 2"}>
                    <Box>
                      <ClickTyphography
                        onClick={(e) => {
                          setOpenSubDialogList((prevState) => {
                            return [prevState[0], true];
                          });
                        }}
                      >
                        마케팅 수신 동의 - 2
                      </ClickTyphography>
                    </Box>
                  </Tooltip>
                </Box>
              </Stack>
            </Box>
          </div>
        </Stack>
      </Stack>
      <SimpleDialog
        open={openSubDialogList[0]}
        title={"마케팅 수신 동의 - 1"}
        onCloseBtnClicked={(e) => {
          setOpenSubDialogList((prevState) => {
            return [false, prevState[1]];
          });
        }}
      >
        <Typography>마케팅 수신 동의</Typography>
      </SimpleDialog>
      <SimpleDialog
        open={openSubDialogList[1]}
        title={"마케팅 수신 동의 - 2"}
        onCloseBtnClicked={(e) => {
          setOpenSubDialogList((prevState) => {
            return [prevState[0], false];
          });
        }}
      >
        <Typography>마케팅 수신 동의</Typography>
      </SimpleDialog>
    </>
  );
};

export default MarketingAgreementForm;
