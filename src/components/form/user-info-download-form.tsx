import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import PrimaryButton from "../atomic/atoms/primary-button";
import React, { PropsWithChildren, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { ChainType } from "../../__generated__/graphql";
import Container from "../atomic/atoms/container";
import { TicketUserQuery } from "../../types";
import CircularProgress from "@mui/material/CircularProgress";
import SecondaryButton from "../atomic/atoms/secondary-button";
import { useAlert } from "../../provider/alert/alert-provider";
import { getErrorMessage } from "../../error/my-error";

const UserInfoDownloadForm = (
  props: PropsWithChildren & {
    title?: string;
    onDownloadButtonClick?: (res: TicketUserQuery) => void;
  }
) => {
  const theme = useTheme();
  const [checked, setChecked] = useState([true, true, true, true]);
  const [chainType, setChainType] = useState<ChainType>(ChainType.Evm);
  const { title, onDownloadButtonClick } = props;
  const [loading, setLoading] = useState(false);
  const { showAlert, showErrorAlert } = useAlert();

  return (
    <Container>
      <Stack spacing={1}>
        {title && (
          <>
            <Typography variant={"h6"}>{title}</Typography>
            <Divider></Divider>
          </>
        )}
        <FormGroup>
          <FormControlLabel
            checked={checked[0]}
            control={
              <Checkbox
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setChecked((prevState) => {
                    const src = { ...checked };
                    src[0] = event.target.checked;
                    return { ...src };
                  });
                }}
              />
            }
            label="이메일"
          />
          <Container>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <FormControlLabel
                checked={checked[1]}
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setChecked((prevState) => {
                        const src = { ...checked };
                        src[1] = event.target.checked;
                        return { ...src };
                      });
                    }}
                  />
                }
                label="지갑주소"
              />
              <FormControl>
                <InputLabel>체인</InputLabel>
                <Select
                  value={chainType}
                  label="체인"
                  onChange={(e) => {
                    const { value } = e.target;
                    //@ts-ignore
                    setChainType(value);
                  }}
                  sx={{ minWidth: 120, background: "" }}
                >
                  <MenuItem value={ChainType.Evm}>EVM</MenuItem>
                  <MenuItem value={ChainType.Aptos}>앱토스</MenuItem>
                  <MenuItem value={ChainType.Sui}>수이</MenuItem>
                  <MenuItem value={ChainType.Stacks}>스택스</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Container>
          <FormControlLabel
            checked={checked[2]}
            control={
              <Checkbox
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setChecked((prevState) => {
                    const src = { ...checked };
                    src[2] = event.target.checked;
                    return { ...src };
                  });
                }}
              />
            }
            label="텔레그램"
          />
          <FormControlLabel
            checked={checked[3]}
            control={
              <Checkbox
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setChecked((prevState) => {
                    const src = { ...checked };
                    src[3] = event.target.checked;
                    return { ...src };
                  });
                }}
              />
            }
            label="트위터"
          />
        </FormGroup>
        <div style={{ position: "relative" }}>
          <SecondaryButton
            size={"small"}
            sx={{ width: "100%" }}
            onClick={async (e) => {
              try {
                setLoading(true);
                await onDownloadButtonClick?.({
                  includeEmail: checked[0],
                  includeWalletChainType: checked[1] ? chainType : undefined,
                  includeTelegram: checked[2],
                  includeTwitterId: checked[3],
                });
              } catch (e) {
                showErrorAlert({ content: getErrorMessage(e) });
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            다운로드
          </SecondaryButton>
          {loading && (
            <div
              style={{
                position: "absolute",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                transform: "translateY(-100%)",
                height: "100%",
              }}
            >
              <CircularProgress
                size={"1.2rem"}
                sx={{ color: "white" }}
              ></CircularProgress>
            </div>
          )}
        </div>
      </Stack>
    </Container>
  );
};

export default UserInfoDownloadForm;
