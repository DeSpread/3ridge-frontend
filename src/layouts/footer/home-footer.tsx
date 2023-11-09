import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import SecondaryButton from "../../components/atomic/atoms/secondary-button";
import { useLoading } from "../../provider/loading/loading-provider";


const TWITTER_LINK = "https://twitter.com/3ridge_io";
const MAIL_LINK = "mailto:support@3ridge.io?Subject=Hello!%203ridge";

const HomeFooter = () => {
  const theme = useTheme();
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div
      style={{
        background: theme.palette.background.default,
        width: "100%",
        zIndex: 1,
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        marginTop: 4,
      }}
    >
      <Divider sx={{ width: "100%", borderBottomWidth: 1 }} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <SecondaryButton
            size={"small"}
            sx={{
              width: smUp ? 150 : 124,
            }}
            onClick={async (e) => {
              e.preventDefault();
              // throw new Error("Sentry Frontend Error");
              window.open("https://3ridge.beehiiv.com/subscribe", "_blank");
            }}
          >
            {smUp ? "뉴스레터 구독하기" : "뉴스레터"}
          </SecondaryButton>
        </Stack>
        <Stack direction={"row"}>
          {/*{smUp ? (*/}
          {/*  <Link*/}
          {/*    href="https://airtable.com/shr406tfeuXcHz1o0"*/}
          {/*    color="inherit"*/}
          {/*    underline="hover"*/}
          {/*    target="_blank"*/}
          {/*    rel="noreferrer"*/}
          {/*  >*/}
          {/*    <Typography variant={smUp ? "body1" : "caption"}>*/}
          {/*      프로젝트 등록*/}
          {/*    </Typography>*/}
          {/*  </Link>*/}
          {/*) : (*/}
          {/*  <IconButton href={"https://airtable.com/shr406tfeuXcHz1o0"}>*/}
          {/*    <AppRegistrationIcon></AppRegistrationIcon>*/}
          {/*  </IconButton>*/}
          {/*)}*/}
          {smUp ? (
            <Link
              href={TWITTER_LINK}
              color="inherit"
              underline="hover"
              style={{ marginLeft: 16 }}
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant={smUp ? "body1" : "caption"}>
                트위터
              </Typography>
            </Link>
          ) : (
            <IconButton href={TWITTER_LINK}>
              <TwitterIcon></TwitterIcon>
            </IconButton>
          )}
          {smUp ? (
            <Link
              href="https://discord.gg/3ridge"
              color="inherit"
              underline="hover"
              style={{ marginLeft: 16 }}
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant={smUp ? "body1" : "caption"}>
                디스코드
              </Typography>
            </Link>
          ) : (
            <IconButton href={"https://discord.gg/3ridge"}>
              <Image
                src={
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/discord.svg"
                }
                alt={""}
                width={24}
                height={24}
              ></Image>
            </IconButton>
          )}
          {smUp ? (
            <Link
              href={MAIL_LINK}
              color="inherit"
              underline="hover"
              style={{ marginLeft: 16 }}
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant={smUp ? "body1" : "caption"}>
                이메일
              </Typography>
            </Link>
          ) : (
            <IconButton href={MAIL_LINK}>
              <EmailIcon></EmailIcon>
            </IconButton>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default HomeFooter;
