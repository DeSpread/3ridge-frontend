import {
  Box,
  Stack,
  Link,
  useMediaQuery, Divider,
} from "@mui/material";
import SecondaryButton from "../../components/atoms/secondary-button";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";
import React from "react";

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
        marginBottom: theme.spacing(5)
      }}
    >
      <Divider sx={{ width: "100%", borderBottomWidth: 2 }}/>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <SecondaryButton
              size={"small"}
              sx={{
                width: 150,
              }}
              onClick={(e) => {
                e.preventDefault();
                window.open("https://3ridge.beehiiv.com/subscribe", "_blank");
              }}
          >
            Join Newsletter
          </SecondaryButton>
        </Stack>
        <Box>
          <Link href="https://twitter.com/3ridge_xyz" color="inherit" underline="hover">
            Twitter
          </Link>
          <Link href="https://discord.gg/3ridge" color="inherit" underline="hover" style={{ marginLeft: 16 }}>
            Discord
          </Link>
          <Link href="mailto:support@3ridge.xyz?Subject=Hello!%203ridge" color="inherit" underline="hover" style={{ marginLeft: 16 }}>
            Email
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default HomeFooter;
