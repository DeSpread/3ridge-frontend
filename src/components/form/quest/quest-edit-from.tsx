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
import {
  Quest,
  Verify3ridgePointQuestContext,
  VerifyTelegramQuestContext,
  VerifyTwitterFollowQuestContext,
  VerifyTwitterRetweetQuestContext,
} from "../../../type";
import NumberWithLabel from "../../atomic/atoms/number-with-label";
import MathUtil from "../../../util/math-util";

const Verify3ridgePointEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const { editedQuest, onChange } = props;

  const [numberValue, setNumberValue] = useState(0);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy ===
        QuestPolicyType.Verify_3RidgePoint
      ) {
        const context = editedQuest.questPolicy
          ?.context as Verify3ridgePointQuestContext;
        setNumberValue(context?.point);
      }
    }
  }, [editedQuest]);

  const updateData = (_point?: number, _message?: string) => {
    const context = {
      point: _point,
    };
    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.Verify_3RidgePoint,
    };

    const _newContentMetaData = {
      content: _message ?? "",
      contentEncodingType: ContentEncodingType.None,
      contentFormatType: ContentFormatType.Text,
    };

    onChange?.(_newQuestPolicy, _newContentMetaData);
  };

  return (
    <Stack spacing={1}>
      <NumberWithLabel
        label={"기준 포인트"}
        labelWidth={"50%"}
        value={numberValue}
        onChange={(e) => {
          const value = MathUtil.clamp(parseInt(e.target.value), 0);
          setNumberValue(value);
          updateData(value, message);
        }}
      ></NumberWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"42%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(numberValue, value);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

// ---

const VerifyTwitterRetweetOrLinkingEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
  questPolicy:
    | QuestPolicyType.VerifyTwitterRetweet
    | QuestPolicyType.VerifyTwitterLiking;
}) => {
  const [username, setUsername] = useState<string>();
  const [tweetId, setTweetId] = useState<string>();
  const [message, setMessage] = useState<string>();

  const { editedQuest, onChange, questPolicy } = props;

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy ===
          QuestPolicyType.VerifyTwitterRetweet ||
        editedQuest.questPolicy?.questPolicy ===
          QuestPolicyType.VerifyTwitterLiking
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyTwitterRetweetQuestContext;
        setUsername(`@${context.username}`);
        setTweetId(context.tweetId);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim()
        );
      }
    }
  }, [editedQuest]);

  const updateData = (
    _username?: string,
    _message?: string,
    _tweetId?: string
  ) => {
    const onlyUserName = _username?.replace("@", "");
    const context = {
      username: onlyUserName,
      twitterUrl: "",
      tweetId: _tweetId,
    };
    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy,
    };

    let content = _message ?? "";
    if (_username && content?.includes(_username)) {
      content =
        _message
          ?.trim()
          ?.replace(" ", "&nbsp")
          ?.replace(
            _username,
            dedent`<a style="{a-style}" href="https://twitter.com/${onlyUserName}" target="_blank">${_username}</a>`
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
        label={"트위터 유저네임 (@포함)"}
        labelWidth={"42%"}
        value={username}
        onChange={(e) => {
          const { value } = e.target;
          setUsername(value);
          updateData(value, message);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"TWEET ID"}
        labelWidth={"42%"}
        value={tweetId}
        onChange={(e) => {
          const { value } = e.target;
          setTweetId(value);
          updateData(username, message, value);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"42%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(username, value, tweetId);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

// ---

const VerifyTwitterFollowEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const [username, setUsername] = useState<string>();
  const [message, setMessage] = useState<string>();

  const { editedQuest, onChange } = props;

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy ===
        QuestPolicyType.VerifyTwitterFollow
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyTwitterFollowQuestContext;
        setUsername(`@${context.username}`);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim()
        );
      }
    }
  }, [editedQuest]);

  const updateData = (_username?: string, _message?: string) => {
    const onlyUserName = _username?.replace("@", "");
    const context = { username: onlyUserName, twitterUrl: "" };
    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifyTwitterFollow,
    };

    let content = _message ?? "";
    if (_username && content?.includes(_username)) {
      content =
        _message
          ?.trim()
          ?.replace(" ", "&nbsp")
          ?.replace(
            _username,
            dedent`<a style="{a-style}" href="https://twitter.com/${onlyUserName}" target="_blank">${_username}</a>`
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
        label={"트위터 유저네임 (@포함)"}
        labelWidth={"42%"}
        value={username}
        onChange={(e) => {
          const { value } = e.target;
          setUsername(value);
          updateData(value, message);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"42%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(username, value);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

// ---

const TelegramQuestEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const [telegramHandle, setTelegramHandle] = useState<string>();
  const [telegramMessage, setTelegramMessage] = useState<string>();

  const { editedQuest, onChange } = props;

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy === QuestPolicyType.VerifyTelegram
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyTelegramQuestContext;
        setTelegramHandle(`@${context.channelId}`);
        setTelegramMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim()
        );
      }
    }
  }, [editedQuest]);

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

export {
  TelegramQuestEditForm,
  VerifyTwitterFollowEditForm,
  VerifyTwitterRetweetOrLinkingEditForm,
  Verify3ridgePointEditForm,
};
