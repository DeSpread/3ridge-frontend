import {
  Box,
  Stack,
  Typography,
  Link,
  Grid,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";
import SecondaryButton from "../../components/atoms/secondary-button";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";

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
      }}
    >
      <Stack direction={"column"}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ padding: 3 }}
          rowSpacing={4}
        >
          <Grid item>
            <Stack direction={"column"} spacing={2}>
              <Typography variant={"h5"}>Bridge your projects</Typography>
              <Box>
                <Typography variant={"body1"}>
                  Bridge helps you reach, acquire, and retain users
                </Typography>
                <Typography variant={"body1"}>
                  with powerful, interactive experiences.
                </Typography>
              </Box>
              <SecondaryButton
                size={"large"}
                style={{ width: 180 }}
                onClick={async () => {
                  showLoading();
                  await router.push("/explore");
                  closeLoading();
                }}
              >
                Let`s Explore
              </SecondaryButton>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction={"row-reverse"} spacing={smUp ? 12 : 4}>
              {footerData.map((x, xIdx) => {
                return (
                  <Stack key={xIdx} direction={"column"} spacing={3}>
                    <Typography variant={smUp ? "h5" : "h6"}>
                      {x.title}
                    </Typography>
                    <Stack direction={"column"} spacing={2}>
                      {x.subMenus.map((y, yIdx) => {
                        return (
                          <NextLink
                            key={yIdx}
                            href={y.url}
                            rel={"noopener noreferrer"}
                            target={"_blank"}
                          >
                            <Typography
                              variant={mdUp ? "body1" : "body2"}
                              sx={{
                                color: theme.palette.neutral["400"],
                                "&:hover": {
                                  color: theme.palette.action.hover,
                                },
                              }}
                            >
                              {y.title}
                            </Typography>
                          </NextLink>
                        );
                      })}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ padding: 3 }}>
          <Typography
            variant={"body2"}
            sx={{ color: theme.palette.neutral["600"] }}
          >
            © Copyright 2022 DeSpread Labs, Inc.
          </Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default HomeFooter;
