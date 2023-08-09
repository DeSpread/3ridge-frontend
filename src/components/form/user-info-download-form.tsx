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
        <PrimaryButton
          size={"small"}
          onClick={(e) => {
            onDownloadButtonClick?.({
              includeEmail: checked[0],
              includeWalletChainType: checked[1] ? chainType : undefined,
              includeTelegram: checked[2],
              includeTwitterId: checked[3],
            });
          }}
        >
          다운로드
        </PrimaryButton>
      </Stack>
    </Container>
  );
};

export default UserInfoDownloadForm;
