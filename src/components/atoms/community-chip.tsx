import { Chip, Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

type BountyCollectionCardProps = PropsWithChildren & {
  name: string;
  thumbnailUrl?: string;
};

const CommunityChip = ({ thumbnailUrl, name }: BountyCollectionCardProps) => {
  return (
    <Chip
      label={
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              style={{
                borderRadius: 30,
              }}
              width="100%"
              height="100%"
            />
          )}
          <Typography sx={{ fontSize: "0.85rem" }}>{name}</Typography>
        </Stack>
      }
    />
  );
};

export default CommunityChip;
