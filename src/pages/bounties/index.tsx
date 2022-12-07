import { ReactElement, useEffect } from "react";
import MainLayout from "../../components/layouts/main-layout";
import { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import { Chip, Stack, Typography, Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import BountyCard from "../../components/atoms/bounty-card";

const Bounties = (props: AppProps) => {
  const theme = useTheme();
  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>Staking</title>
      </Head>
      <div style={{ flex: 1, background: "", marginTop: 32 }}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ background: "" }}
          spacing={4}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography variant={"h5"}>Explore</Typography>
            <Chip
              icon={<BoltIcon color={"secondary"} />}
              label={"Bounties"}
            ></Chip>
            <Typography
              variant={"body2"}
              sx={{ color: theme.palette.text.disabled }}
            >
              Instantly earn crypto by discovering web3
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <BountyCard>abc</BountyCard>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

Bounties.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Bounties;
