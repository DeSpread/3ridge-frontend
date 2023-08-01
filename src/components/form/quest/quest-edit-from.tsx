import InputWithLabel from "../../atomic/atoms/input-with-label";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  ChainType,
  ContentEncodingType,
  ContentFormatType,
  ContentMetadata,
  QuestPolicy,
  QuestPolicyType,
} from "../../../__generated__/graphql";
import dedent from "dedent";
import {
  Quest,
  Verify3ridgePointQuestContext,
  VerifyHasWalletAddressQuestContext,
  VerifyTelegramQuestContext,
  VerifyTwitterFollowQuestContext,
  VerifyTwitterRetweetQuestContext,
  VerifyVisitWebsiteQuestContext,
} from "../../../type";
import NumberWithLabel from "../../atomic/atoms/number-with-label";
import MathUtil from "../../../util/math-util";

const VerifyVisitWebsiteEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const { editedQuest, onChange } = props;

  const [handle, setHandle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy ===
        QuestPolicyType.VerifyVisitWebsite
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyVisitWebsiteQuestContext;
        setUrl(context.url);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim()
        );
      }
    }
  }, [editedQuest]);

  const updateData = (_message?: string, _url?: string, _handle?: string) => {
    const context = { url: _url };
    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifyVisitWebsite,
    };

    let content = _message ?? "";

    if (_handle && content?.includes(_handle)) {
      content =
        _message
          ?.trim()
          ?.replace(" ", "&nbsp")
          ?.replace(
            _handle.replace(" ", "&nbsp"),
            dedent`<a style="{a-style}" href="${_url}" target="_blank">${_handle}</a>`
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
        label={"링크 페이지 이름"}
        labelWidth={"38%"}
        value={handle}
        onChange={(e) => {
          const { value } = e.target;
          setHandle(value);
          updateData(message, url, value);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"웹 페이지 URL"}
        labelWidth={"38%"}
        value={url}
        onChange={(e) => {
          const { value } = e.target;
          setUrl(value);
          updateData(message, value, handle);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"38%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(value, url, handle);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

// ---

const VerifyHasWalletAddressEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const { editedQuest, onChange } = props;

  const [message, setMessage] = useState<string>();
  const [chainType, setChainType] = useState<ChainType | string>("ANY");

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy ===
        QuestPolicyType.VerifyHasWalletAddress
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyHasWalletAddressQuestContext;
        setChainType(context.chain);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim()
        );
      }
    }
  }, [editedQuest]);

  const updateData = (_message?: string, _chainType?: ChainType | string) => {
    const context = { chain: _chainType };
    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifyHasWalletAddress,
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
      <FormControl>
        <InputLabel>체인</InputLabel>
        <Select
          value={chainType}
          label="체인"
          onChange={(e) => {
            const { value } = e.target;
            //@ts-ignore
            setChainType(value);
            updateData(message, value);
          }}
          sx={{ width: 120, background: "" }}
        >
          <MenuItem value={ChainType.Evm}>EVM</MenuItem>
          <MenuItem value={ChainType.Aptos}>앱토스</MenuItem>
          <MenuItem value={ChainType.Sui}>수이</MenuItem>
          <MenuItem value={ChainType.Stacks}>스택스</MenuItem>
          <MenuItem value={"ANY"}>아무거나</MenuItem>
        </Select>
      </FormControl>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"38%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(value, chainType);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

// ---

const VerifyEmailEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const { editedQuest, onChange } = props;

  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy === QuestPolicyType.VerifyEmail
      ) {
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim()
        );
      }
    }
  }, [editedQuest]);

  const updateData = (_message?: string) => {
    const context = {};
    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifyEmail,
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
      <InputWithLabel
        label={"메세지"}
        labelWidth={"38%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(value);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

// ---

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
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim()
        );
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

const VerifyTelegramOrDiscordQuestEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
  questPolicy: QuestPolicyType.VerifyTelegram | QuestPolicyType.VerifyDiscord;
}) => {
  const [handle, setHandle] = useState<string>();
  const [message, setMessage] = useState<string>();

  const { editedQuest, onChange, questPolicy } = props;

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy ===
          QuestPolicyType.VerifyTelegram ||
        editedQuest.questPolicy?.questPolicy === QuestPolicyType.VerifyDiscord
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyTelegramQuestContext;
        setHandle(`@${context.channelId}`);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim()
        );
      }
    }
  }, [editedQuest]);

  const updateData = (_handle?: string, _message?: string) => {
    _handle = _handle?.trim();
    const onlyHandle = _handle?.replace("@", "");
    const context = { channelId: _handle?.replace("@", "") };

    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy,
    };

    let content = _message ?? "";
    const hrefLink =
      questPolicy === QuestPolicyType.VerifyTelegram
        ? `https://t.me/${onlyHandle}`
        : `https://discord.gg/${onlyHandle}`;

    if (_handle && content?.includes(_handle)) {
      content =
        _message
          ?.trim()
          ?.replace(" ", "&nbsp")
          ?.replace(
            _handle,
            dedent`<a style="{a-style}" href="${hrefLink}" target="_blank">${_handle}</a>`
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

  const handleInputLabel = useMemo(() => {
    if (questPolicy === QuestPolicyType.VerifyTelegram) {
      return "텔레그램 핸들 (@포함)";
    }
    return "디스코드 핸들 (@포함)";
  }, [questPolicy]);

  return (
    <Stack spacing={1}>
      <InputWithLabel
        label={handleInputLabel}
        labelWidth={"38%"}
        value={handle}
        onChange={(e) => {
          const { value } = e.target;
          setHandle(value);
          updateData(value, message);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"38%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(handle, value);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

export {
  VerifyTelegramOrDiscordQuestEditForm,
  VerifyTwitterFollowEditForm,
  VerifyTwitterRetweetOrLinkingEditForm,
  Verify3ridgePointEditForm,
  VerifyEmailEditForm,
  VerifyHasWalletAddressEditForm,
  VerifyVisitWebsiteEditForm,
};
