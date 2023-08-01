import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  SvgIconProps,
  Typography,
} from "@mui/material";
import XpChip from "../atoms/styled/xp-chip";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../../const";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { User } from "../../../type";
import WithOverlapChildren from "../../../hoc/with-overlap-children";
import No1Icon from "../atoms/svg/no1-icon";
import No2Icon from "../atoms/svg/no2-icon";
import No3Icon from "../atoms/svg/no3-icon";

const InnerAbleNo1Icon = WithOverlapChildren(No1Icon);
const InnerAbleNo2Icon = WithOverlapChildren(No2Icon);
const InnerAbleNo3Icon = WithOverlapChildren(No3Icon);

const LeaderRankCard = (props: { user: User }) => {
  const { user } = props;
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
    <Card>
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
            {/*{rank > 3 ? (*/}
            {/*  <XpChip*/}
            {/*    sx={{*/}
            {/*      minWidth: 28,*/}
            {/*      height: 28,*/}
            {/*      borderRadius: 14,*/}
            {/*    }}*/}
            {/*    label={<Typography variant={"body2"}>{rank}</Typography>}*/}
            {/*  ></XpChip>*/}
            {/*) : (*/}
            {/*  renderRankBadge(rank)*/}
            {/*)}*/}
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Avatar sx={{ width: 52, height: 52 }} src={""}></Avatar>
          </Box>
          <Stack direction={"column"} sx={{ marginLeft: 3 }}>
            <Typography variant={"body2"}>{"despread"}</Typography>
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
              Total 330
            </Typography>
            <Typography variant={"body2"}>&nbsp;{`Point`}</Typography>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default LeaderRankCard;
