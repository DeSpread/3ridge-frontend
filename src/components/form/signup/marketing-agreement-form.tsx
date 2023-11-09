import { Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

import TermAgreeItem from "@/components/atomic/atoms/term-agree-item";

const MarketingAgreementForm = ({
  defaultValue = false,
  onChangedValue,
}: {
  defaultValue?: boolean;
  onChangedValue?: (checked: boolean[]) => void;
}) => {
  const [checkedList, setCheckedList] = useState([defaultValue, defaultValue]);

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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 3,
              }}
            >
              <TermAgreeItem
                checked={checkedList[0]}
                termLink="/term/kakao"
                onChangeCheck={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCheckedList([event.target.checked, checkedList[1]]);
                }}
              >
                (필수) 개인정보 수집·이용 동의
              </TermAgreeItem>
              <TermAgreeItem
                checked={checkedList[1]}
                termLink="/term/kakao"
                onChangeCheck={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCheckedList([checkedList[0], event.target.checked]);
                }}
              >
                (선택) 마케팅 정보 수신 동의
              </TermAgreeItem>
            </Box>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default MarketingAgreementForm;
