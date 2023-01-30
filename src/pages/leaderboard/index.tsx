import Head from "next/head";
import React, {
  CSSProperties,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  SVGProps,
  useMemo,
} from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  SvgIconProps,
  Typography,
} from "@mui/material";
import MainLayout from "../../layouts/main-layout";
import { useLeaderUsersQuery } from "../../page-hook/leader-users-query-hook";
import PrimaryCard from "../../components/atoms/primary-card";
import XpChip from "../../components/atoms/styled/xp-chip";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../const";
import No1Icon from "../../components/atoms/svg/no1-icon";
import WithOverlapChildren from "../../hoc/with-overlap-children";
import { User } from "../../type";
import No2Icon from "../../components/atoms/svg/no2-icon";
import No3Icon from "../../components/atoms/svg/no3-icon";
import { useSignedUserQuery } from "../../page-hook/user-query-hook";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const InnerAbleNo1Icon = WithOverlapChildren(No1Icon);
const InnerAbleNo2Icon = WithOverlapChildren(No2Icon);
const InnerAbleNo3Icon = WithOverlapChildren(No3Icon);

const RankCard = ({ user, rank }: { user: User; rank: number }) => {
  const { profileImageUrl, name, rewardPoint } = user;

  const renderBadge = (
    WrappedComponent: React.ComponentType<SvgIconProps>,
    rank: number
  ) => {
    return (
      <WrappedComponent
        style={{
          width: 32,
          height: 32,
        }}
      >
        <Typography
          variant={"body2"}
          sx={{
            marginBottom: "0px",
            color: "white",
          }}
        >
          {rank}
        </Typography>
      </WrappedComponent>
    );
  };

  const renderRankBadge = (rank: number) => {
    if (rank > 3 || rank < 1) {
      return (
        <RemoveCircleOutlineIcon
          sx={{
            width: 32,
            height: 32,
            //@ts-ignore
            color: (theme) => theme.palette.neutral["500"],
          }}
        />
      );
    }
    return renderBadge(
      [InnerAbleNo1Icon, InnerAbleNo2Icon, InnerAbleNo3Icon][rank - 1],
      rank
    );
  };

  return (
    <PrimaryCard
      withCardContent={false}
      hoverEffect={true}
      cardSx={{ padding: 3, paddingLeft: 1, paddingRight: 1 }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Box
            sx={{
              width: 64,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rank > 3 ? (
              <XpChip
                sx={{
                  minWidth: 28,
                  height: 28,
                  borderRadius: 14,
                }}
                label={<Typography variant={"body2"}>{rank}</Typography>}
              ></XpChip>
            ) : (
              renderRankBadge(rank)
            )}
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Avatar
              sx={{ width: 52, height: 52 }}
              src={profileImageUrl ?? DEFAULT_PROFILE_IMAGE_DATA_SRC}
            ></Avatar>
          </Box>
          <Stack direction={"column"} sx={{ marginLeft: 3 }}>
            <Typography variant={"body2"}>{name}</Typography>
          </Stack>
        </Stack>
        <Box sx={{ marginRight: 2 }}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant={"body2"}>Total&nbsp;:&nbsp;</Typography>
            <Typography
              variant={"body2"}
              color={"white"}
              sx={{ fontWeight: "bold" }}
            >
              {rewardPoint}
            </Typography>
            <Typography variant={"body2"}>&nbsp;{`Point`}</Typography>
          </Stack>
        </Box>
      </Stack>
    </PrimaryCard>
  );
};

const Leaderboard = () => {
  const { leaderUsersData, leaderUsersDataLoading, findUserRank } =
    useLeaderUsersQuery();
  const { userData } = useSignedUserQuery();

  const userRank = useMemo(() => {
    return findUserRank(userData._id);
  }, [userData]);

  return (
    <>
      <Head>
        <title>Leaderboard</title>
      </Head>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        spacing={5}
        sx={{ marginTop: 1, marginBottom: 12, background: "" }}
      >
        <Grid item sx={{ background: "" }}>
          <Box sx={{ minWidth: 800, background: "" }}>
            <Stack direction={"column"}>
              <Typography variant={"h4"}>Leaderboard</Typography>
              {userData._id && (
                <Box sx={{ marginTop: 5 }}>
                  <Stack direction={"column"} spacing={2}>
                    <Box>
                      <Typography variant={"h6"}>Your ranking</Typography>
                    </Box>
                    <RankCard
                      user={userData}
                      rank={findUserRank(userData._id)}
                    ></RankCard>
                  </Stack>
                </Box>
              )}
              <Box sx={{ marginTop: 5 }}>
                <Stack direction={"column"} spacing={2}>
                  <Box>
                    <Typography variant={"h6"}>
                      Top users in the last 30 days
                    </Typography>
                  </Box>
                  {leaderUsersData?.map((e, index) => {
                    return <RankCard user={e} rank={index + 1} key={index} />;
                  })}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

Leaderboard.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Leaderboard;
