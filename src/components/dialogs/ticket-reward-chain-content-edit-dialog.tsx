import {
  ChainType,
  ContentEncodingType,
  ContentFormatType,
  ContentMetadata,
} from "../../__generated__/graphql";
import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SecondaryButton from "../atomic/atoms/secondary-button";
import React, { useEffect, useState } from "react";
import InputWithLabel from "../atomic/atoms/input-with-label";
import dedent from "dedent";
import ResourceHelper from "../../helper/resource-helper";
import { Ticket } from "../../type";

const TicketRewardChainContentEditDialog = (
  props: {
    defaultTicketData?: Ticket;
    onConfirmBtnClicked?: (res: {
      rewardChain?: ChainType;
      rewardClaimable: boolean;
      rewardUnit?: string;
      overrideRewardChainContent?: ContentMetadata;
    }) => void;
  } & SimpleDialogProps
) => {
  const { defaultTicketData, ...rest } = props;
  const [chainType, setChainType] = useState<ChainType | string>("EMPTY");
  const [claimType, setClaimType] = useState("EMPTY");
  const [messageValue, setMessageValue] = useState("");

  useEffect(() => {
    const context = defaultTicketData?.rewardPolicy?.context;
    if (context) {
      setChainType(context.rewardChain ? context.rewardChain : "EMPTY");
      setClaimType(context.rewardUnit ? context.rewardUnit : "EMPTY");
      setMessageValue(
        context.overrideRewardChainContent?.content
          ?.replace(/<\/?[^>]+(>|$)/g, "")
          .replace("&nbsp", " ")
          .trim() ?? ""
      );
    }
  }, [defaultTicketData]);

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
          {chainType === ChainType.Aptos && (
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

              props.onConfirmBtnClicked?.({
                //@ts-ignore
                rewardChain: chainType === "EMPTY" ? undefined : chainType,
                rewardClaimable: claimType === "EMPTY" ? false : true,
                rewardUnit: claimType === "EMPTY" ? "" : claimType,
                overrideRewardChainContent,
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
