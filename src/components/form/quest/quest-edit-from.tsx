import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dedent from "dedent";
import { highlight, languages } from "prismjs";
import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";

import {
  ChainType,
  ContentEncodingType,
  ContentFormatType,
  ContentMetadata,
  QuestPolicy,
  QuestPolicyType,
} from "../../../__generated__/graphql";
import {
  Quest,
  QuizContent,
  Verify3ridgePointQuestContext,
  VerifyDiscordQuestContext,
  VerifyHasWalletAddressQuestContext,
  VerifyOnChainContext,
  VerifyQuizQuestContext,
  VerifyScreenShotQuestContext,
  VerifySurveyQuestContext,
  VerifyTelegramQuestContext,
  VerifyTwitterFollowQuestContext,
  VerifyTwitterRetweetQuestContext,
  VerifyVisitWebsiteQuestContext,
} from "../../../types";
import MathUtil from "../../../util/math-util";
import InputWithLabel from "../../atomic/atoms/input-with-label";
import NumberInput from "../../atomic/atoms/number-input";
import NumberWithLabel from "../../atomic/atoms/number-with-label";

import Container from "@/components/atomic/atoms/container";
import StringUtil from "@/util/string-util";

const VerifySurveyEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const theme = useTheme();

  const { editedQuest, onChange } = props;
  const [message, setMessage] = useState<string>("");
  const [texts, setTexts] = useState([""]);

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy === QuestPolicyType.VerifySurvey
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifySurveyQuestContext;
        setTexts((prevState) => {
          return [...context.questions];
        });
        setMessage(editedQuest.title_v2?.content ?? "");
      }
    }
  }, [editedQuest]);

  const updateData = (_message: string, _text?: string, index?: number) => {
    const questions = [...texts];
    if (index !== undefined && _text) questions[index] = _text ?? "";
    const context = { questions };
    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifySurvey,
    };

    const _newContentMetaData = {
      content: _message,
      contentEncodingType: ContentEncodingType.None,
      contentFormatType: ContentFormatType.Text,
    };

    onChange?.(_newQuestPolicy, _newContentMetaData);
  };

  return (
    <Stack spacing={1}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        sx={{ width: "100%", background: "" }}
      >
        <InputWithLabel
          label={"메세지"}
          labelWidth={"30%"}
          value={message}
          onChange={(e) => {
            const { value } = e.target;
            setMessage(value);
            updateData(value, undefined, undefined);
          }}
        ></InputWithLabel>
        <IconButton
          className={"MuiIconButton"}
          sx={{
            visibility: "hidden",
            width: 28,
            height: 28,
            borderRadius: 16,
            borderWidth: 2,
            borderStyle: "solid",
            marginLeft: 3,
          }}
        >
          <RemoveIcon
            fontSize={"medium"}
            sx={{
              borderRadius: 30,
              "&:hover": {
                borderColor: theme.palette.secondary.main,
                background: "#61E1FF55",
              },
            }}
          ></RemoveIcon>
        </IconButton>
      </Stack>
      {texts.map((e, i) => {
        return (
          <Stack
            key={i}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            sx={{ width: "100%", background: "" }}
          >
            <InputWithLabel
              key={i}
              label={`질문 ${i + 1}번째`}
              labelWidth={"30%"}
              value={texts[i]}
              onChange={(e) => {
                const { value } = e.target;
                setTexts((prevState) => {
                  const src = [...texts];
                  src[i] = value;
                  return src;
                });
                updateData(message, value, i);
              }}
            ></InputWithLabel>
            {i !== 0 && (
              <IconButton
                className={"MuiIconButton"}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderStyle: "solid",
                  marginLeft: 3,
                }}
                onClick={(e) => {
                  setTexts((prevState) => {
                    const src = [...texts];
                    return src.filter((e, _i) => _i !== i);
                  });
                }}
              >
                <RemoveIcon
                  fontSize={"medium"}
                  sx={{
                    borderRadius: 30,
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      background: "#61E1FF55",
                    },
                  }}
                ></RemoveIcon>
              </IconButton>
            )}
            {i === 0 && (
              <IconButton
                className={"MuiIconButton"}
                sx={{
                  visibility: "hidden",
                  width: 28,
                  height: 28,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderStyle: "solid",
                  marginLeft: 3,
                }}
              >
                <RemoveIcon
                  fontSize={"medium"}
                  sx={{
                    borderRadius: 30,
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      background: "#61E1FF55",
                    },
                  }}
                ></RemoveIcon>
              </IconButton>
            )}
          </Stack>
        );
      })}
      <Divider sx={{ paddingTop: 2, paddingBottom: 2 }}></Divider>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100%", paddingTop: 2 }}
      >
        <IconButton
          className={"MuiIconButton"}
          sx={{
            width: 28,
            height: 28,
            borderRadius: 16,
            borderWidth: 2,
            borderStyle: "solid",
          }}
          onClick={(e) => {
            setTexts((prevState) => {
              const src = [...texts, ""];
              return src;
            });
          }}
        >
          <AddIcon
            fontSize={"medium"}
            sx={{
              borderRadius: 30,
              "&:hover": {
                borderColor: theme.palette.secondary.main,
                background: "#61E1FF55",
              },
            }}
          ></AddIcon>
        </IconButton>
      </Stack>
    </Stack>
  );
};

// ---

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
            .trim(),
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(
          editedQuest.title_v2?.content ?? "",
          "text/html",
        );

        const linkElement = doc.querySelector("a");
        const linkText = linkElement?.textContent;

        setHandle(linkText ?? "");
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
      _handle = _handle?.replaceAll(" ", "&nbsp");
      content =
        _message
          ?.trim()
          ?.replaceAll(" ", "&nbsp")
          ?.replaceAll(
            _handle,
            dedent`<a style="{a-style}" href="${_url}" target="_blank">${_handle.replaceAll(
              "&nbsp",
              " ",
            )}</a>`,
          )
          ?.replaceAll("&nbsp", " ")
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

const VerifyScreenShotForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const theme = useTheme();

  const { editedQuest, onChange } = props;
  const [message, setMessage] = useState<string>("");

  const [textValue, setTextValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [markdownValue, setMarkdownValue] = useState("");
  const [contentFormatType, setContentFormatType] = useState<ContentFormatType>(
    ContentFormatType.Text,
  );

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy ===
        QuestPolicyType.VerifyScreenshot
      ) {
        setMessage(editedQuest.title_v2?.content ?? "");
        const context = editedQuest.questPolicy
          ?.context as VerifyScreenShotQuestContext;
        if (context?.description) {
          setTextValue("");
          setCodeValue("");
          setMarkdownValue("");
          if (
            context?.description?.contentFormatType === ContentFormatType.Text
          ) {
            setTextValue(context?.description?.content);
            setContentFormatType(ContentFormatType.Text);
          } else if (
            context?.description?.contentFormatType === ContentFormatType.Html
          ) {
            setCodeValue(context?.description?.content);
            setContentFormatType(ContentFormatType.Html);
          } else if (
            context?.description?.contentFormatType ===
            ContentFormatType.Markdown
          ) {
            setMarkdownValue(context?.description?.content);
            setContentFormatType(ContentFormatType.Markdown);
          }
        }
      }
    }
  }, [editedQuest]);

  const updateData = (
    _message: string,
    _value: string,
    _contentFormatType: ContentFormatType,
  ) => {
    const content = _value;
    const description = {
      content,
      contentEncodingType: ContentEncodingType.None,
      contentFormatType: _contentFormatType,
    };

    const _newQuestPolicy = {
      context: JSON.stringify({ description }),
      questPolicy: QuestPolicyType.VerifyScreenshot,
    };

    const _newContentMetaData = {
      content: _message,
      contentEncodingType: ContentEncodingType.None,
      contentFormatType: ContentFormatType.Text,
    };

    onChange?.(_newQuestPolicy, _newContentMetaData);
  };

  return (
    <Stack spacing={1}>
      <Stack
        alignItems={"center"}
        justifyContent={"flex-end"}
        sx={{ width: "100%", background: "" }}
        spacing={1}
      >
        <Container sx={{ width: "100%", background: "" }}>
          <Stack
            sx={{ width: "100%", background: "" }}
            alignItems={"flex-start"}
          >
            <Stack
              sx={{ width: "100%" }}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography>내용</Typography>
              <Box>
                <FormControl>
                  <InputLabel>TYPE</InputLabel>
                  <Select
                    value={contentFormatType}
                    label="FormatType"
                    onChange={(e) => {
                      const { value } = e.target;
                      const code =
                        contentFormatType === ContentFormatType.Html
                          ? codeValue
                          : contentFormatType === ContentFormatType.Text
                          ? textValue
                          : markdownValue;
                      if (value === "TEXT") {
                        setContentFormatType(ContentFormatType.Text);
                        updateData(message, code, ContentFormatType.Text);
                      } else if (value === "HTML") {
                        setContentFormatType(ContentFormatType.Html);
                        updateData(message, code, ContentFormatType.Html);
                      } else if (value === "MARKDOWN") {
                        setContentFormatType(ContentFormatType.Markdown);
                        updateData(message, code, ContentFormatType.Markdown);
                      }
                    }}
                  >
                    <MenuItem value={ContentFormatType.Text}>Text</MenuItem>
                    <MenuItem value={ContentFormatType.Html}>Html</MenuItem>
                    <MenuItem value={ContentFormatType.Markdown}>
                      Markdown
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Box sx={{ width: "100%", marginTop: 2 }}>
              {contentFormatType === ContentFormatType.Text && (
                <Editor
                  value={textValue}
                  onValueChange={(code) => {
                    setTextValue(code);
                    updateData(message, code, contentFormatType);
                  }}
                  highlight={(code) =>
                    highlight(code, languages.markup!, "markdown")
                  }
                  padding={15}
                  className="container__editor"
                />
              )}
              {contentFormatType === ContentFormatType.Html && (
                <Editor
                  value={codeValue}
                  onValueChange={(code) => {
                    setCodeValue(code);
                    updateData(message, code, contentFormatType);
                  }}
                  highlight={(code) => highlight(code, languages.jsx!, "jsx")}
                  padding={15}
                  className="container__editor"
                />
              )}
              {contentFormatType === ContentFormatType.Markdown && (
                <Editor
                  value={markdownValue}
                  onValueChange={(code) => {
                    setMarkdownValue(code);
                    updateData(message, code, contentFormatType);
                  }}
                  highlight={(code) =>
                    highlight(code, languages.markup!, "markdown")
                  }
                  padding={15}
                  className="container__editor"
                />
              )}
            </Box>
          </Stack>
        </Container>
        <InputWithLabel
          label={"메세지"}
          labelWidth={"30%"}
          value={message}
          onChange={(e) => {
            const { value } = e.target;
            setMessage(value);
            const code =
              contentFormatType === ContentFormatType.Html
                ? codeValue
                : contentFormatType === ContentFormatType.Text
                ? textValue
                : markdownValue;
            updateData(message, code, contentFormatType);
          }}
        ></InputWithLabel>
      </Stack>
      {/*<Divider sx={{ paddingTop: 2, paddingBottom: 2 }}></Divider>*/}
    </Stack>
  );
};

// ---

const VerifyOnChainEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const { editedQuest, onChange } = props;

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy === QuestPolicyType.VerifyOnChain
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyOnChainContext;
        setChainType(context.chainType);
        setToAddresses([...context.toAddresses]);
        setUrl(context.url);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim() ?? "",
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(
          editedQuest.title_v2?.content ?? "",
          "text/html",
        );

        const linkElement = doc.querySelector("a");
        const linkText = linkElement?.textContent;

        setHandle(linkText ?? "");
      }
    }
  }, [editedQuest]);

  const [message, setMessage] = useState<string>("");
  const [chainType, setChainType] = useState<ChainType>(ChainType.Evm);
  const [toAddresses, setToAddresses] = useState([""]);
  const [handle, setHandle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const theme = useTheme();

  const updateData = (
    _message: string,
    _chainType: ChainType,
    _toAddresses: string[],
    _url: string,
    _handle: string,
  ) => {
    const context: VerifyOnChainContext = {
      toAddresses: _toAddresses,
      chainType: _chainType,
      url: _url,
    };

    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifyOnChain,
    };

    let content = _message ?? "";

    if (_handle && content?.includes(_handle)) {
      _handle = _handle?.replaceAll(" ", "&nbsp");
      content =
        _message
          ?.trim()
          ?.replaceAll(" ", "&nbsp")
          ?.replaceAll(
            _handle,
            dedent`<a style="{a-style}" href="${_url}" target="_blank">${_handle.replaceAll(
              "&nbsp",
              " ",
            )}</a>`,
          )
          ?.replaceAll("&nbsp", " ")
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
      <FormControl>
        <InputLabel>체인</InputLabel>
        <Select
          value={chainType}
          label="체인"
          onChange={(e) => {
            const { value } = e.target;
            const chainType = value as ChainType;
            setChainType(chainType);
            updateData(message, chainType, toAddresses, url, handle);
          }}
          sx={{ width: 120, background: "" }}
        >
          <MenuItem value={ChainType.Evm}>이더리움</MenuItem>
          <MenuItem value={ChainType.Matic}>Matic</MenuItem>
          <MenuItem value={ChainType.MaticMumbai}>Matic Mumbai</MenuItem>
          <MenuItem value={ChainType.Arb}>아비트럼</MenuItem>
          <MenuItem value={ChainType.Bnb}>Bnb</MenuItem>
          <MenuItem value={ChainType.Stacks}>Stacks</MenuItem>
        </Select>
      </FormControl>
      {toAddresses.map((e, i) => {
        return (
          <Stack
            key={i}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            sx={{ width: "100%", background: "" }}
          >
            <InputWithLabel
              key={i}
              label={`toAddress ${i + 1}번째`}
              labelWidth={"40%"}
              value={toAddresses[i]}
              onChange={(e) => {
                const { value } = e.target;
                setToAddresses((prevState) => {
                  const src = [...prevState];
                  src[i] = value;
                  return src;
                });
                const src = [...toAddresses];
                src[i] = value;
                updateData(message, chainType, src, url, handle);
              }}
            ></InputWithLabel>
            {i !== 0 && (
              <IconButton
                className={"MuiIconButton"}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderStyle: "solid",
                  marginLeft: 3,
                }}
                onClick={(e) => {
                  setToAddresses((prevState) => {
                    const src = [...prevState];
                    return src.filter((e, _i) => _i !== i);
                  });
                  let src = [...toAddresses];
                  src = src.filter((e, _i) => _i !== i);
                  updateData(message, chainType, src, url, handle);
                }}
              >
                <RemoveIcon
                  fontSize={"medium"}
                  sx={{
                    borderRadius: 30,
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      background: "#61E1FF55",
                    },
                  }}
                ></RemoveIcon>
              </IconButton>
            )}
            {i === 0 && (
              <IconButton
                className={"MuiIconButton"}
                sx={{
                  visibility: "hidden",
                  width: 28,
                  height: 28,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderStyle: "solid",
                  marginLeft: 3,
                }}
              >
                <RemoveIcon
                  fontSize={"medium"}
                  sx={{
                    borderRadius: 30,
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      background: "#61E1FF55",
                    },
                  }}
                ></RemoveIcon>
              </IconButton>
            )}
          </Stack>
        );
      })}
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100%", paddingTop: 2 }}
      >
        <IconButton
          className={"MuiIconButton"}
          sx={{
            width: 28,
            height: 28,
            borderRadius: 16,
            borderWidth: 2,
            borderStyle: "solid",
          }}
          onClick={(e) => {
            setToAddresses((prevState) => {
              const src = [...prevState, ""];
              return src;
            });
            const src = [...toAddresses, ""];
            updateData(message, chainType, src, url, handle);
          }}
        >
          <AddIcon
            fontSize={"medium"}
            sx={{
              borderRadius: 30,
              "&:hover": {
                borderColor: theme.palette.secondary.main,
                background: "#61E1FF55",
              },
            }}
          ></AddIcon>
        </IconButton>
      </Stack>
      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Divider></Divider>
      </Box>
      <InputWithLabel
        label={"링크 이름"}
        labelWidth={"34%"}
        value={handle}
        onChange={(e) => {
          const { value } = e.target;
          setHandle(value);
          updateData(message, chainType, toAddresses, url, value);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"링크 URL"}
        labelWidth={"34%"}
        value={url}
        onChange={(e) => {
          const { value } = e.target;
          setUrl(value);
          updateData(message, chainType, toAddresses, value, handle);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"34%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(value, chainType, toAddresses, url, handle);
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
            .trim(),
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
            .trim(),
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
            .trim(),
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
    | QuestPolicyType.VerifyTwitterLiking
    | QuestPolicyType.VerifyTwitterLinkingRetweet;
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
          QuestPolicyType.VerifyTwitterLiking ||
        editedQuest.questPolicy?.questPolicy ===
          QuestPolicyType.VerifyTwitterLinkingRetweet
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyTwitterRetweetQuestContext;
        setUsername(`@${context.username}`);
        setTweetId(context.tweetId);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim(),
        );
      }
    }
  }, [editedQuest]);

  const updateData = (
    _username?: string,
    _message?: string,
    _tweetId?: string,
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
      _username = _username?.replaceAll(" ", "&nbsp");
      content =
        _message
          ?.trim()
          ?.replaceAll(" ", "&nbsp")
          ?.replaceAll(
            _username,
            dedent`<a style="{a-style}" href="https://twitter.com/${onlyUserName}" target="_blank">${_username.replaceAll(
              "&nbsp",
              " ",
            )}</a>`,
          )
          ?.replaceAll("&nbsp", " ")
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
            .trim(),
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
      _username = _username?.replaceAll(" ", "&nbsp");
      content =
        _message
          ?.trim()
          ?.replaceAll(" ", "&nbsp")
          ?.replaceAll(
            _username,
            dedent`<a style="{a-style}" href="https://twitter.com/${onlyUserName}" target="_blank">${_username.replaceAll(
              "&nbsp",
              " ",
            )}</a>`,
          )
          ?.replaceAll("&nbsp", " ")
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

const VerifyDiscordQuestEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const [serverName, setServerName] = useState<string>();
  const [inviteLink, setInviteLink] = useState<string>();
  const [serverId, setServerId] = useState<string>();
  const [message, setMessage] = useState<string>();

  const { editedQuest, onChange } = props;

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy === QuestPolicyType.VerifyDiscord
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyDiscordQuestContext;
        setServerName(context.serverName);
        setInviteLink(context.inviteLink);
        setServerId(context.serverId);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim(),
        );
      }
    }
  }, [editedQuest]);

  const updateData = (
    _serverName?: string,
    _inviteLink?: string,
    _serverId?: string,
    _message?: string,
  ) => {
    _serverName = _serverName?.trim();

    const context = {
      channelId: _serverName,
      serverName: _serverName,
      inviteLink: _inviteLink,
      serverId: _serverId,
    };

    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifyDiscord,
    };

    let content = _message ?? "";
    const hrefLink = _inviteLink;

    if (_serverName && content?.includes(_serverName)) {
      _serverName = _serverName?.replaceAll(" ", "&nbsp");
      content =
        _message
          ?.trim()
          ?.replaceAll(" ", "&nbsp")
          ?.replaceAll(
            _serverName,
            dedent`<a style="{a-style}" href="${hrefLink}" target="_blank">${_serverName.replaceAll(
              "&nbsp",
              " ",
            )}</a>`,
          )
          ?.replaceAll("&nbsp", " ")
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
        label={"디스코드 서버 이름"}
        labelWidth={"38%"}
        value={serverName}
        onChange={(e) => {
          const { value } = e.target;
          setServerName(value);
          updateData(value, inviteLink, serverId, message);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"디스코드 초대 링크"}
        labelWidth={"38%"}
        value={inviteLink}
        onChange={(e) => {
          const { value } = e.target;
          setInviteLink(value);
          updateData(serverName, value, serverId, message);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"디스코드 서버 ID"}
        labelWidth={"38%"}
        value={serverId}
        onChange={(e) => {
          const { value } = e.target;
          setServerId(value);
          updateData(serverName, inviteLink, value, message);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"38%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(serverName, inviteLink, serverId, value);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

const VerifyTelegramQuestEditForm = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const [handle, setHandle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [groupId, setGroupId] = useState<string>("");

  const { editedQuest, onChange } = props;

  useEffect(() => {
    if (editedQuest) {
      if (
        editedQuest.questPolicy?.questPolicy === QuestPolicyType.VerifyTelegram
      ) {
        const context = editedQuest.questPolicy
          ?.context as VerifyTelegramQuestContext;
        setHandle(`@${context.channelId}`);
        setMessage(
          editedQuest.title_v2?.content
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace("&nbsp", " ")
            .trim(),
        );
        if (context?.groupId) {
          setGroupId(context?.groupId?.toString());
        }
      }
    }
  }, [editedQuest]);

  const updateData = (
    _handle?: string,
    _message?: string,
    _groupId?: string,
  ) => {
    _handle = _handle?.trim();
    const onlyHandle = _handle?.replace("@", "");
    const context = {
      channelId: _handle?.replace("@", ""),
    } as VerifyTelegramQuestContext;
    if (_groupId) {
      context.groupId = parseInt(_groupId);
    }

    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.VerifyTelegram,
    };

    let content = _message ?? "";
    const hrefLink = `https://t.me/${onlyHandle}`;

    if (_handle && content?.includes(_handle)) {
      _handle = _handle?.replaceAll(" ", "&nbsp");
      content =
        _message
          ?.trim()
          ?.replaceAll(" ", "&nbsp")
          ?.replaceAll(
            _handle,
            dedent`<a style="{a-style}" href="${hrefLink}" target="_blank">${_handle.replaceAll(
              "&nbsp",
              " ",
            )}</a>`,
          )
          ?.replaceAll("&nbsp", " ")
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
        label={"GroupId"}
        labelWidth={"38%"}
        value={groupId}
        onChange={(e) => {
          const { value } = e.target;
          setGroupId(value);
          updateData(handle, message, value);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"텔레그램 핸들 (@포함)"}
        labelWidth={"38%"}
        value={handle}
        onChange={(e) => {
          const { value } = e.target;
          setHandle(value);
          updateData(value, message, groupId);
        }}
      ></InputWithLabel>
      <InputWithLabel
        label={"메세지"}
        labelWidth={"38%"}
        value={message}
        onChange={(e) => {
          const { value } = e.target;
          setMessage(value);
          updateData(handle, value, groupId);
        }}
      ></InputWithLabel>
    </Stack>
  );
};

const VerifyHasDiscordOrTelegramOrTwitter = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
  questPolicy:
    | QuestPolicyType.VerifyHasDiscord
    | QuestPolicyType.VerifyHasTelegram
    | QuestPolicyType.VerifyHasTwitter;
}) => {
  const [message, setMessage] = useState<string>();

  const { editedQuest, onChange, questPolicy } = props;

  useEffect(() => {
    if (editedQuest) {
      setMessage(
        editedQuest.title_v2?.content
          .replace(/<\/?[^>]+(>|$)/g, "")
          .replace("&nbsp", " ")
          .trim(),
      );
    } else {
      setMessage("");
    }
  }, [editedQuest]);

  const updateData = (_message?: string) => {
    const context = {};

    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy,
    };

    const content = _message?.trim();

    const _newContentMetaData = {
      content: content ?? "",
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

const VerifyQuiz = (props: {
  editedQuest?: Quest;
  onChange?: (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => void;
}) => {
  const { editedQuest, onChange } = props;

  const [message, setMessage] = useState<string>("");
  const [titles, setTitles] = useState([""]);
  const [optionsSet, setOptionsSet] = useState<[string[]]>([[""]]);
  const [answers, setAnswers] = useState([1]);
  const theme = useTheme();

  useEffect(() => {
    if (editedQuest) {
      setMessage(
        editedQuest.title_v2?.content
          .replace(/<\/?[^>]+(>|$)/g, "")
          .replace("&nbsp", " ")
          .trim() ?? "",
      );

      const context = editedQuest.questPolicy
        ?.context as VerifyQuizQuestContext;

      const quizList: QuizContent[] = context.quizList ?? [];

      const _titles = [];
      const _optionsSet: [string[]] = [[]];
      const _answers = [];
      for (let i = 0; i < quizList.length; i++) {
        const quizContent = quizList[i];
        const { title, options, correctOptionIndex } = quizContent;
        _titles.push(title);
        _optionsSet[i] = options;
        _answers.push(correctOptionIndex + 1);
      }

      setTitles(_titles);
      setOptionsSet(_optionsSet);
      setAnswers(_answers);
    }
  }, [editedQuest]);

  const updateData = (
    _message: string,
    _titles: string[],
    _optionsSet: [string[]],
    _answers: number[],
  ) => {
    const context: VerifyQuizQuestContext = { quizList: [] };
    for (let i = 0; i < _titles.length; i++) {
      const title = _titles[i];
      const options = _optionsSet[i];
      const correctOptionIndex = _answers[i] - 1;
      context.quizList?.push({
        title,
        options: [...options],
        correctOptionIndex,
      });
    }

    const _newQuestPolicy = {
      context: JSON.stringify(context),
      questPolicy: QuestPolicyType.Quiz,
    };

    const content = _message ?? "";

    const _newContentMetaData = {
      content,
      contentEncodingType: ContentEncodingType.None,
      contentFormatType: ContentFormatType.Text,
    };

    onChange?.(_newQuestPolicy, _newContentMetaData);
  };

  return (
    <Stack spacing={1}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        sx={{ width: "100%", background: "" }}
      >
        <InputWithLabel
          label={"메세지"}
          labelWidth={"30%"}
          value={message}
          onChange={(e) => {
            const { value } = e.target;
            setMessage(value);
            updateData(value, titles, optionsSet, answers);
          }}
        ></InputWithLabel>
        <IconButton
          className={"MuiIconButton"}
          sx={{
            visibility: "hidden",
            width: 28,
            height: 28,
            borderRadius: 16,
            borderWidth: 2,
            borderStyle: "solid",
            marginLeft: 3,
          }}
        >
          <RemoveIcon
            fontSize={"medium"}
            sx={{
              borderRadius: 30,
              "&:hover": {
                borderColor: theme.palette.secondary.main,
                background: "#61E1FF55",
              },
            }}
          ></RemoveIcon>
        </IconButton>
      </Stack>
      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Divider></Divider>
      </Box>
      {titles.map((title, i) => {
        return (
          <Stack key={i} spacing={1}>
            {i !== 0 && (
              <Stack
                sx={{
                  paddingTop: 2,
                  paddingBottom: 2,
                  width: "100%",
                  background: "",
                }}
              >
                <Divider></Divider>
                <Box sx={{ marginTop: 3 }}>
                  <IconButton
                    className={"MuiIconButton"}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderStyle: "solid",
                    }}
                    onClick={(e) => {
                      setOptionsSet((prevState) => {
                        const src: [string[]] = JSON.parse(
                          JSON.stringify(prevState),
                        );
                        src.splice(i, 1);
                        // prevState.splice(i, 1);
                        return [...src];
                      });
                      setTitles((prevState) => {
                        const src = [...prevState];
                        src.splice(i, 1);
                        // prevState.splice(i, 1);
                        return [...src];
                      });

                      const _titles = [...titles];
                      _titles.splice(i, 1);
                      const _optionsSet: [string[]] = JSON.parse(
                        JSON.stringify(optionsSet),
                      );
                      _optionsSet.splice(i, 1);
                      updateData(message, _titles, _optionsSet, answers);
                    }}
                  >
                    <RemoveIcon
                      fontSize={"medium"}
                      sx={{
                        borderRadius: 30,
                        "&:hover": {
                          borderColor: theme.palette.secondary.main,
                          background: "#61E1FF55",
                        },
                      }}
                    ></RemoveIcon>
                  </IconButton>
                </Box>
              </Stack>
            )}
            <Stack
              key={`${i}`}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              sx={{ width: "100%", background: "" }}
            >
              <InputWithLabel
                key={`${i}`}
                label={`질문 ${i + 1} 번째`}
                labelWidth={"30%"}
                value={title}
                onChange={(e) => {
                  const { value } = e.target;
                  setTitles((prevState) => {
                    const src = [...prevState];
                    src[i] = value;
                    return [...src];
                  });
                  const _titles = [...titles];
                  _titles[i] = value;
                  updateData(message, _titles, optionsSet, answers);
                }}
                multiline={true}
              ></InputWithLabel>
              <IconButton
                className={"MuiIconButton"}
                sx={{
                  visibility: "hidden",
                  width: 28,
                  height: 28,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderStyle: "solid",
                  marginLeft: 3,
                }}
              >
                <RemoveIcon
                  fontSize={"medium"}
                  sx={{
                    borderRadius: 30,
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      background: "#61E1FF55",
                    },
                  }}
                ></RemoveIcon>
              </IconButton>
            </Stack>
            <Stack sx={{ width: "100%" }} spacing={1}>
              {optionsSet[i].map((option, i2) => {
                return (
                  <Stack
                    key={`${i}-${i2}`}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    sx={{ width: "100%", background: "" }}
                  >
                    <InputWithLabel
                      key={`${i}-${i2}`}
                      label={`${i2 + 1}번`}
                      labelWidth={"30%"}
                      value={option}
                      onChange={(e) => {
                        const { value } = e.target;
                        setOptionsSet((prevState) => {
                          prevState[i][i2] = value;
                          return [...prevState];
                        });

                        const _optionsSet: [string[]] = JSON.parse(
                          JSON.stringify(optionsSet),
                        );
                        _optionsSet[i][i2] = value;

                        updateData(message, titles, _optionsSet, answers);
                      }}
                    ></InputWithLabel>
                    {i2 !== 0 && (
                      <IconButton
                        className={"MuiIconButton"}
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: 16,
                          borderWidth: 2,
                          borderStyle: "solid",
                          marginLeft: 3,
                        }}
                        onClick={(e) => {
                          setOptionsSet((prevState) => {
                            const src: [string[]] = JSON.parse(
                              JSON.stringify(prevState),
                            );
                            src[i].splice(i2, 1);
                            return [...src];
                          });

                          const _optionsSet: [string[]] = JSON.parse(
                            JSON.stringify(optionsSet),
                          );
                          _optionsSet[i].splice(i2, 1);
                          updateData(message, titles, _optionsSet, answers);
                        }}
                      >
                        <RemoveIcon
                          fontSize={"medium"}
                          sx={{
                            borderRadius: 30,
                            "&:hover": {
                              borderColor: theme.palette.secondary.main,
                              background: "#61E1FF55",
                            },
                          }}
                        ></RemoveIcon>
                      </IconButton>
                    )}
                    {i2 === 0 && (
                      <IconButton
                        className={"MuiIconButton"}
                        sx={{
                          visibility: "hidden",
                          width: 28,
                          height: 28,
                          borderRadius: 16,
                          borderWidth: 2,
                          borderStyle: "solid",
                          marginLeft: 3,
                        }}
                      >
                        <RemoveIcon
                          fontSize={"medium"}
                          sx={{
                            borderRadius: 30,
                            "&:hover": {
                              borderColor: theme.palette.secondary.main,
                              background: "#61E1FF55",
                            },
                          }}
                        ></RemoveIcon>
                      </IconButton>
                    )}
                  </Stack>
                );
              })}
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%", paddingTop: 2 }}
              >
                <IconButton
                  className={"MuiIconButton"}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderStyle: "solid",
                  }}
                  onClick={(e) => {
                    setOptionsSet((prevState) => {
                      const src: [string[]] = JSON.parse(
                        JSON.stringify(prevState),
                      );
                      src[i].push("");
                      return [...src];
                    });
                    const _optionsSet: [string[]] = JSON.parse(
                      JSON.stringify(optionsSet),
                    );
                    _optionsSet[i].push("");
                    updateData(message, titles, _optionsSet, answers);
                  }}
                >
                  <AddIcon
                    fontSize={"medium"}
                    sx={{
                      borderRadius: 30,
                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        background: "#61E1FF55",
                      },
                    }}
                  ></AddIcon>
                </IconButton>

                <Stack
                  sx={{ width: "100%", paddingTop: 2 }}
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Box sx={{ width: "23%" }}>
                    <Typography>정답</Typography>
                  </Box>
                  <NumberInput
                    sx={{ width: 180 }}
                    value={answers[i]}
                    onChange={(e) => {
                      const value = MathUtil.clamp(
                        parseInt(e.target.value),
                        1,
                        optionsSet[i].length,
                      );
                      setAnswers((prevState) => {
                        const src = [...prevState];
                        src[i] = value;
                        return [...src];
                      });

                      const _answers = [...answers];
                      _answers[i] = value;

                      updateData(message, titles, optionsSet, _answers);
                    }}
                  ></NumberInput>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
      <Divider sx={{ paddingTop: 0, paddingBottom: 2 }}></Divider>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100%", paddingTop: 2 }}
      >
        <IconButton
          className={"MuiIconButton"}
          sx={{
            width: 28,
            height: 28,
            borderRadius: 16,
            borderWidth: 2,
            borderStyle: "solid",
          }}
          onClick={(e) => {
            setTitles((prevState) => {
              const src = [...prevState, ""];
              return [...src];
            });
            setOptionsSet((prevState) => {
              const src: [string[]] = JSON.parse(JSON.stringify(prevState));
              src.push([""]);
              return [...src];
            });
            setAnswers((prevState) => {
              const src = [...prevState, 1];
              return [...src];
            });
            const _titles = [...titles, ""];
            const _optionsSet: [string[]] = JSON.parse(
              JSON.stringify(optionsSet),
            );
            _optionsSet.push([""]);
            const _answers = [...answers, 1];
            updateData(message, _titles, _optionsSet, _answers);
          }}
        >
          <AddIcon
            fontSize={"medium"}
            sx={{
              borderRadius: 30,
              "&:hover": {
                borderColor: theme.palette.secondary.main,
                background: "#61E1FF55",
              },
            }}
          ></AddIcon>
        </IconButton>
      </Stack>
    </Stack>
  );
};

export {
  VerifyTelegramQuestEditForm,
  VerifyTwitterFollowEditForm,
  VerifyTwitterRetweetOrLinkingEditForm,
  Verify3ridgePointEditForm,
  VerifyEmailEditForm,
  VerifyHasWalletAddressEditForm,
  VerifyVisitWebsiteEditForm,
  VerifySurveyEditForm,
  VerifyDiscordQuestEditForm,
  VerifyHasDiscordOrTelegramOrTwitter,
  VerifyQuiz,
  VerifyOnChainEditForm,
  VerifyScreenShotForm,
};
