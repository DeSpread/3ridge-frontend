import { Stack } from "@mui/material";
import { useState } from "react";

import {
  ContentEncodingType,
  ContentFormatType,
  ContentMetadata,
  QuestPolicy,
  QuestPolicyType,
} from "@/__generated__/graphql";
import InputWithLabel from "@/components/atomic/atoms/input-with-label";
import { Quest } from "@/types";

interface DiscordGuildJoinQuestEditProps {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}

export default function DiscordGuildJoinQuestEdit(
  props: DiscordGuildJoinQuestEditProps,
) {
  const { editedQuest, onChange } = props;
  const [title, setTitle] = useState(editedQuest?.title_v2?.content ?? "");
  const [guildId, setGuildId] = useState(
    (editedQuest?.questPolicy?.context as any)?.guildId ?? "",
  );
  const [guildInviteUrl, setGuildInviteUrl] = useState(
    (editedQuest?.questPolicy?.context as any)?.guildInviteUrl ?? "",
  );

  function updateData(title: string, guildId: string, guildInviteUrl: string) {
    const _newContentMetaData = {
      content: title.trim(),
      contentEncodingType: ContentEncodingType.None,
      contentFormatType: ContentFormatType.Markdown,
    };

    onChange?.(
      {
        questPolicy: QuestPolicyType.DiscordGuildJoin,
        context: JSON.stringify({
          guildId,
          guildInviteUrl,
        }),
      },
      _newContentMetaData,
    );
  }

  return (
    <Stack spacing={1}>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"38%"}
        value={title}
        onChange={(e) => {
          const { value } = e.target;
          setTitle(value);
          updateData(value, guildId, guildInviteUrl);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"서버 ID"}
        labelWidth={"38%"}
        value={guildId}
        onChange={(e) => {
          const { value } = e.target;
          setGuildId(value);
          updateData(title, value, guildInviteUrl);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"서버 초대 URL"}
        labelWidth={"38%"}
        value={guildInviteUrl}
        onChange={(e) => {
          const { value } = e.target;
          setGuildInviteUrl(value);
          updateData(title, guildId, value);
        }}
      ></InputWithLabel>
    </Stack>
  );
}
