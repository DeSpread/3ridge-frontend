import InputWithLabel from "../../atomic/atoms/input-with-label";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ContentEncodingType,
  ContentFormatType,
  ContentMetadata,
  Maybe,
  QuestPolicy,
  QuestPolicyType,
  Scalars,
} from "../../../__generated__/graphql";
import dedent from "dedent";

const TelegramQuestEditForm = (props: {
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const [telegramHandle, setTelegramHandle] = useState<string>();
  const [telegramMessage, setTelegramMessage] = useState<string>();

  const { onChange } = props;

  const updateData = (_telegramHandle?: string, _telegramMessage?: string) => {
    _telegramHandle = _telegramHandle?.trim();
    const onlyHandle = _telegramHandle?.replace("@", "");
    const context = { channelId: _telegramHandle?.replace("@", "") };

    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifyTelegram,
    };

    let content = _telegramMessage ?? "";
    if (_telegramHandle && content?.includes(_telegramHandle)) {
      content =
        _telegramMessage
          ?.trim()
          ?.replace(" ", "&nbsp")
          ?.replace(
            _telegramHandle,
            dedent`<a style="{a-style}" href="https://t.me/${onlyHandle}" target="_blank">${_telegramHandle}</a>`
          )
          .trim() ?? "";
    }

    const _newContentMetaData = {
      content: dedent`<h6 style="{h6-style}">${content}</h6>`,
      contentEncodingType: ContentEncodingType.None,
      contentFormatType: ContentFormatType.Html,
    };

    onChange?.(_newQuestPolicy, _newContentMetaData);
  };

  return (
    <Stack spacing={1}>
      <InputWithLabel
        label={"텔레그램 핸들 (@포함)"}
        labelWidth={"38%"}
        value={telegramHandle}
        onChange={(e) => {
          const _telegramHandle = e.target.value;
          setTelegramHandle(_telegramHandle);
          updateData(_telegramHandle, telegramMessage);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"38%"}
        value={telegramMessage}
        onChange={(e) => {
          const _telegramMessage = e.target.value;
          setTelegramMessage(_telegramMessage);
          updateData(telegramHandle, _telegramMessage);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

export { TelegramQuestEditForm };
