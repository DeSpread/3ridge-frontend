import React, { MouseEventHandler, useEffect, useState } from "react";
import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import SecondaryButton from "../atomic/atoms/secondary-button";
import { TimeField } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material/styles";
import { format, subHours } from "date-fns";
import { parseStrToDate } from "../../util/date-util";
import { useAlert } from "../../provider/alert/alert-provider";

const DateEditDialog = (
  props: {
    initBeginDate: Date;
    initEndDate: Date;
    onCloseBtnClicked?: MouseEventHandler;
    onConfirmBtnClicked?: (beginDate: Date, endDate: Date) => void;
  } & SimpleDialogProps
) => {
  const { ...rest } = props;
  const [beginDate, setBeginDate] = useState(props.initBeginDate);
  const [endDate, setEndDate] = useState(props.initEndDate);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { showErrorAlert, showAlert } = useAlert();

  useEffect(() => {
    if (props.initBeginDate?.toString() !== "Invalid Date")
      setBeginDate(props.initBeginDate);
    if (props.initEndDate?.toString() !== "Invalid Date")
      setEndDate(props.initEndDate);
  }, [props.initBeginDate, props.initEndDate]);

  return (
    <SimpleDialog
      {...rest}
      maxWidth={"sm"}
      onClose={() => {
        // @ts-ignore
        props.onCloseBtnClicked?.(undefined);
      }}
      onCloseBtnClicked={(e) => {
        props.onCloseBtnClicked?.(e);
      }}
    >
      <Stack sx={{ marginTop: 1 }}>
        <Grid container spacing={mdUp ? 0 : 1} justifyContent={"center"}>
          <Grid item>
            <Stack direction={"row"} alignItems={"center"}>
              <Box sx={{ width: 80 }}>
                <Typography sx={{ marginLeft: 2 }}>시작일</Typography>
              </Box>
              <TimeField
                value={beginDate}
                onChange={(newValue) => {
                  if (!newValue) return;
                  setBeginDate(newValue);
                }}
                format="yyyy-MM-dd HH:mm:ss"
              />
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction={"row"} alignItems={"center"}>
              <Box sx={{ width: 80 }}>
                <Typography sx={{ marginLeft: 2 }}>종료일</Typography>
              </Box>
              <TimeField
                value={endDate}
                onChange={(newValue) => {
                  if (!newValue) return;
                  setEndDate(newValue);
                }}
                format="yyyy-MM-dd HH:mm:ss"
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ marginTop: 3 }}
        >
          <SecondaryButton
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              const _beginDate =
                !beginDate || beginDate?.toString() === "Invalid Date"
                  ? props.initBeginDate
                  : beginDate;
              const _endDate =
                endDate?.toString() === "Invalid Date"
                  ? props.initEndDate
                  : endDate;

              console.log(_beginDate.getTime() - _endDate.getTime());
              if (_endDate.getTime() - _beginDate.getTime() < 0) {
                showAlert({
                  title: "알림",
                  content: "마지막 시간값은 시작 시간보다 커야합니다.",
                });
                return;
              }
              props.onConfirmBtnClicked?.(_beginDate, _endDate);
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default DateEditDialog;
