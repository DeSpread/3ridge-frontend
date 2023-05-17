import {
  Box,
  Stack,
  Link,
  useMediaQuery,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import SecondaryButton from "../../components/atoms/secondary-button";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import PrimaryButton from "../../components/atoms/primary-button";
import Image from "next/image";

const footerData = [
  {
    title: "Connect",
    subMenus: [
      {
        title: "Email Us",
        url: "mailto:support@3ridge.xyz?subject=%F0%9F%91%8B",
      },
      {
        title: "Twitter",
        url: "https://twitter.com/3ridge_xyz",
      },
      {
        title: "Discord",
        url: "https://discord.gg/7UB6JjjCNV",
      },
    ],
  },
  {
    title: "Docs",
    subMenus: [
      {
        title: "Documentation",
        url: "/",
      },
      {
        title: "Code of Conduct",
        url: "/",
      },
      {
        title: "Terms of Service",
        url: "/",
      },
      {
        title: "Privacy Policy",
        url: "/",
      },
    ],
  },
  {
    title: "Company",
    subMenus: [
      {
        title: "Careers",
        url: "/",
      },
      {
        title: "Blog",
        url: "/",
      },
    ],
  },
];

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
            onClick={(e) => {
              e.preventDefault();
              window.open("https://3ridge.beehiiv.com/subscribe", "_blank");
            }}
          >
            {smUp ? "뉴스레터 구독하기" : "뉴스레터"}
          </SecondaryButton>
        </Stack>
        <Stack direction={"row"}>
          {smUp ? (
            <Link
              href="https://airtable.com/shr406tfeuXcHz1o0"
              color="inherit"
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant={smUp ? "body1" : "caption"}>
                프로젝트 등록
              </Typography>
            </Link>
          ) : (
            <IconButton href={"https://airtable.com/shr406tfeuXcHz1o0"}>
              <AppRegistrationIcon></AppRegistrationIcon>
            </IconButton>
          )}
          {smUp ? (
            <Link
              href="https://twitter.com/3ridge_xyz"
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
            <IconButton href={"https://twitter.com/3ridge_xyz"}>
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
              href="mailto:support@3ridge.xyz?Subject=Hello!%203ridge"
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
            <IconButton
              href={"mailto:support@3ridge.xyz?Subject=Hello!%203ridge"}
            >
              <EmailIcon></EmailIcon>
            </IconButton>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default HomeFooter;
