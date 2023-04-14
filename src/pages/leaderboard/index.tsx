import Head from "next/head";
import React, { MouseEventHandler, ReactElement, useMemo } from "react";
import {
  Avatar,
  Box,
  Card,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MainLayout from "../../layouts/main-layout";
import { useLeaderUsersQuery } from "../../page-hook/leader-users-query-hook";
import XpChip from "../../components/atoms/styled/xp-chip";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../const";
import { User } from "../../type";
import { useSignedUserQuery } from "../../page-hook/signed-user-query-hook";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import StringHelper from "../../helper/string-helper";
import GradientTypography from "../../components/atoms/gradient-typography";
import { useTheme } from "@mui/material/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLeaderUserRankQuery } from "../../page-hook/leader-user-rank-query-hook";
import BlockIcon from "../../components/molecules/block-icon";
import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";

const RankCard = ({
  user,
  rank,
  onClick,
}: {
  user: User;
  rank: number;
  onClick?: MouseEventHandler;
}) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { profileImageUrl, name, rewardPoint, _id } = user;

  const convertedName = useMemo(() => {
    if (name?.substring(0, 2).toLocaleLowerCase() === "0x") {
      if (smUp)
        return StringHelper.getInstance().getMidEllipsisString(name, 10, 8);
      return StringHelper.getInstance().getMidEllipsisString(name);
    }
    return name;
  }, [name]);

  const renderRankBadge = (rank: number) => {
    if (rank > 3 || rank < 1) {
      return (
        <RemoveCircleOutlineIcon
          sx={{
            width: 32,
            height: 32,
            color: (theme) => theme.palette.neutral["500"],
          }}
        />
      );
    }
    if (rank === 1) {
      return <Typography variant={smUp ? "h4" : "h5"}>🥇</Typography>;
    } else if (rank === 2) {
      return <Typography variant={smUp ? "h4" : "h5"}>🥈</Typography>;
    } else if (rank === 3) {
      return <Typography variant={smUp ? "h4" : "h5"}>🥉</Typography>;
    }
    return null;
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        background: theme.palette.neutral[800],
        transform: "translateY(0%)",
        transition: "all 0.2s ease-out 0s",
        transitionDuration: "0.2s",
        transitionDelay: "0s",
        transitionTimingFunction: "ease-out",
        "&:hover": {
          borderColor: theme.palette.secondary.main,
          transform: "translate(0,-2px)",
          // boxShadow: "4px 4px 4px 2px rgba(128, 128, 128, .2)",
        },
        borderWidth: 3,
        borderColor: "#35333a",
        borderStyle: "solid",
        borderRadius: 2,
      }}
      onClick={onClick}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          padding: smUp ? 2 : 1,
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Box
            sx={{
              width: smUp ? 64 : 48,
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
                label={
                  <Typography variant={smUp ? "body2" : "caption"}>
                    {rank}
                  </Typography>
                }
              ></XpChip>
            ) : (
              renderRankBadge(rank)
            )}
          </Box>
          <Box sx={{ marginLeft: smUp ? 1 : "1px" }}>
            {profileImageUrl && (
              <LazyLoadImage
                width={smUp ? 52 : 38}
                height={smUp ? 52 : 38}
                src={profileImageUrl ?? DEFAULT_PROFILE_IMAGE_DATA_SRC}
                style={{
                  borderRadius: smUp ? 52 : 38,
                  objectFit: "cover",
                }}
                effect="blur"
                beforeLoad={() => {
                  return (
                    <Skeleton
                      width={smUp ? 52 : 38}
                      height={smUp ? 52 : 38}
                      animation={"wave"}
                      variant={"rounded"}
                    ></Skeleton>
                  );
                }}
              ></LazyLoadImage>
            )}
            {!profileImageUrl && _id && (
              <BlockIcon seed={_id} scale={smUp ? 6 : 5}></BlockIcon>
            )}
          </Box>
          <Stack
            direction={"column"}
            sx={{ marginLeft: 3, maxWidth: smUp ? "100%" : "50%" }}
          >
            {/*<Box sx={{ paddingRight: 2 }}>*/}
            <GradientTypography
              variant={smUp ? "body2" : "caption"}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {convertedName}
            </GradientTypography>
            {/*</Box>*/}
          </Stack>
        </Stack>
        <Box sx={{ marginRight: smUp ? 2 : 0 }}>
          <Stack
            direction={"column"}
            alignItems={"flex-end"}
            justifyContent={"center"}
          >
            <Typography
              variant={smUp ? "h6" : "caption"}
              sx={{ color: (theme) => theme.palette.info.main }}
            >{`Level ${Math.floor((rewardPoint ?? 0) / 100)}`}</Typography>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant={smUp ? "body2" : "caption"}>
                Total&nbsp;:&nbsp;
              </Typography>
              <Typography
                variant={smUp ? "body2" : "caption"}
                color={"white"}
                sx={{ fontWeight: "bold" }}
              >
                {rewardPoint ?? 0}
              </Typography>
              <Typography variant={smUp ? "body2" : "caption"}>
                &nbsp;{`Point`}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

const Leaderboard = () => {
  const router = useRouter();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { userData } = useSignedUserQuery();
  const { leaderUsersData, leaderUsersDataLoading } = useLeaderUsersQuery();
  const { userRank, loading: userRankLoading } = useLeaderUserRankQuery(
    userData._id
  );
  const { showLoading, closeLoading } = useLoading();

  const routeToUserProfile = async (user: User) => {
    showLoading();
    await router.push(`/profile/${user.name}`);
    closeLoading();
  };

  return (
    <>
      <Head>
        <title>3ridge : Bridge to Web3</title>
      </Head>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        spacing={5}
        sx={{ marginTop: 0, marginBottom: 12, background: "" }}
      >
        <Grid item sx={{ background: "" }}>
          <Box sx={{ minWidth: smUp ? 800 : 200, background: "" }}>
            <Stack direction={"column"}>
              <Typography variant={"h4"}>Leaderboard</Typography>
              {userData._id && (
                <Box sx={{ marginTop: 5 }}>
                  <Stack direction={"column"} spacing={2}>
                    <Box>
                      <Typography variant={"h6"}>Your ranking</Typography>
                    </Box>
                    {(userRankLoading || !userRank) && (
                      <Box>
                        <Skeleton
                          width={800}
                          height={86}
                          animation={"wave"}
                          variant={"rounded"}
                        ></Skeleton>
                      </Box>
                    )}
                    {!userRankLoading && userRank && (
                      <RankCard
                        onClick={async () => {
                          await routeToUserProfile(userData);
                        }}
                        user={userData}
                        rank={userRank}
                      ></RankCard>
                    )}
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
                    return (
                      <RankCard
                        onClick={async (event) => {
                          await routeToUserProfile(e);
                        }}
                        user={e}
                        rank={index + 1}
                        key={index}
                      />
                    );
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
