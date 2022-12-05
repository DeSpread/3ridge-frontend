import { Box, Card, CardContent } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

const BountyCard = (props: PropsWithChildren) => {
  return (
    <>
      <Box
        sx={{
          "&:hover": {
            "& .bountyCard": {
              transition: "box-shadow 0.1s ease-out 0s",
              boxShadow:
                "inset 1px 1px 1px #35333a, inset -1px -1px 1px #35333a",
              transitionDuration: "0.1s",
              transitionDelay: "0s",
              transitionTimingFunction: "ease-out",
              transitionProperty: "box-shadow",
            },
          },
        }}
      >
        <Card
          className={"bountyCard"}
          variant="outlined"
          sx={{
            minWidth: 580,
            position: "absolute",
            marginTop: "-4px",
            marginLeft: "-4px",
          }}
        >
          <CardContent>{props.children}</CardContent>
        </Card>
        <Card
          className={"bountyCard"}
          variant="outlined"
          sx={{ minWidth: 580 }}
        >
          <CardContent>{props.children}</CardContent>
        </Card>
      </Box>
    </>
  );
};

export default BountyCard;
