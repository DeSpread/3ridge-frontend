import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import dedent from "dedent";
import React, { useEffect, useMemo, useState } from "react";

import {
  ChainType,
  ContentEncodingType,
  ContentFormatType,
  ContentMetadata,
} from "../../../__generated__/graphql";
import ResourceHelper from "../../../helper/resource-helper";
import { ContractInfo, Ticket } from "../../../types";
import InputWithLabel from "../../atomic/atoms/input-with-label";
import SecondaryButton from "../../atomic/atoms/secondary-button";
import StyledOutlinedInput from "../../atomic/atoms/styled/styled-outlined-input";
import SimpleDialog, { SimpleDialogProps } from "../simple-dialog";

const TicketRewardChainContentEditDialog = (
  props: {
    defaultTicketData?: Ticket;
    onConfirmBtnClicked?: (res: {
      rewardChain?: ChainType;
      rewardClaimable: boolean;
      rewardUnit?: string;
      overrideRewardChainContent?: ContentMetadata;
      contractInfo?: ContractInfo;
    }) => void;
  } & SimpleDialogProps,
) => {
  const { defaultTicketData, ...rest } = props;
  const [chainType, setChainType] = useState<ChainType | string>("EMPTY");
  const [claimType, setClaimType] = useState("EMPTY");
  const [messageValue, setMessageValue] = useState("");
  const [contractInfoValue, setContractInfoValue] = useState("");

  useEffect(() => {
    const context = defaultTicketData?.rewardPolicy?.context;
    if (context) {
      setChainType(context.rewardChain ? context.rewardChain : "EMPTY");
      setClaimType(context.rewardUnit ? context.rewardUnit : "EMPTY");
      setMessageValue(
        context.overrideRewardChainContent?.content
          ?.replace(/<\/?[^>]+(>|$)/g, "")
          .replace("&nbsp", " ")
          .trim() ?? "",
      );
      if (context.contractInfo)
        setContractInfoValue(JSON.stringify(context.contractInfo, null, 2));
    }
  }, [defaultTicketData]);

  const isClaimableChain = useMemo(() => {
    return chainType === ChainType.Aptos || chainType === ChainType.Matic;
  }, [chainType]);

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Stack
          sx={{ width: "100%", background: "", position: "relative" }}
          direction={"row"}
          spacing={1}
        >
          <FormControl>
            <InputLabel>체인</InputLabel>
            <Select
              value={chainType}
              label="체인"
              onChange={(e) => {
                const { value } = e.target;
                //@ts-ignore
                setChainType(value);
                if (value !== ChainType.Aptos) {
                  setClaimType("EMPTY");
                }
              }}
              sx={{ minWidth: 120, background: "" }}
            >
              <MenuItem value={ChainType.Evm}>EVM</MenuItem>
              <MenuItem value={ChainType.Aptos}>앱토스</MenuItem>
              <MenuItem value={ChainType.Arb}>아비트럼</MenuItem>
              <MenuItem value={ChainType.Bnb}>BNB</MenuItem>
              <MenuItem value={ChainType.Matic}>폴리곤</MenuItem>
              <MenuItem value={ChainType.Sui}>수이</MenuItem>
              <MenuItem value={ChainType.Stacks}>스택스</MenuItem>
              <MenuItem value={"EMPTY"}>없음</MenuItem>
            </Select>
          </FormControl>
          {isClaimableChain && (
            <FormControl>
              <InputLabel>클레임 타입</InputLabel>
              <Select
                value={claimType}
                label="클레임 타입"
                onChange={(e) => {
                  const { value } = e.target;
                  //@ts-ignore
                  setClaimType(value);
                }}
                sx={{ minWidth: 120, background: "" }}
              >
                <MenuItem value={"EMPTY"}>없음</MenuItem>
                <MenuItem value={"NFT"}>NFT</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
        <Box sx={{ width: "100%", paddingTop: 2, paddingBottom: 1 }}>
          <InputWithLabel
            label={"메세지"}
            labelWidth={"10%"}
            value={messageValue}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
          ></InputWithLabel>
        </Box>
        {chainType === ChainType.Matic && claimType === "NFT" && (
          <Stack>
            <Divider sx={{ marginTop: 1 }}></Divider>
            <Stack
              sx={{ width: "100%", paddingTop: 2, paddingBottom: 1 }}
              spacing={2}
            >
              <Typography
                variant={"body2"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  marginLeft: 0,
                }}
              >
                컨트랙트 정보 (프로그래머가 입력)
              </Typography>
              <StyledOutlinedInput
                fullWidth
                value={contractInfoValue}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                ) => {
                  console.log(e.target.value);
                  setContractInfoValue(e.target.value);
                }}
                multiline={true}
                minRows={5}
              />
            </Stack>
          </Stack>
        )}
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ marginTop: 3 }}
        >
          <SecondaryButton
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              const src =
                chainType === "EMPTY"
                  ? ""
                  : //@ts-ignore
                    ResourceHelper.getIconUri(chainType);
              let imgTag = "";
              if (src) {
                imgTag = dedent`<img style="width: 1.35rem; background: white; border-radius: 1.35rem; border-width: 1px; border-color: white; border-style: solid; margin-right: 0.25rem"
                                    src="${src}"/>`;
              }
              const overrideRewardChainContent: ContentMetadata = {
                content: dedent`<div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                              ${imgTag}
                              <body2>${messageValue}</body2>
                              </div>`,
                contentFormatType: ContentFormatType.Html,
                contentEncodingType: ContentEncodingType.None,
              };

              let contractInfo: ContractInfo | undefined = undefined;
              if (contractInfoValue && claimType === "NFT") {
                contractInfo = JSON.parse(contractInfoValue) as ContractInfo;
              }

              props.onConfirmBtnClicked?.({
                //@ts-ignore
                rewardChain: chainType === "EMPTY" ? undefined : chainType,
                rewardClaimable: claimType === "EMPTY" ? false : true,
                rewardUnit: claimType === "EMPTY" ? "" : claimType,
                overrideRewardChainContent,
                contractInfo,
              });
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default TicketRewardChainContentEditDialog;
