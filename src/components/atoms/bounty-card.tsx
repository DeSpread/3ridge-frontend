import { Box, Card, CardContent } from "@mui/material";
import {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

const BountyCard = (props: PropsWithChildren) => {
  const cardRef = useRef<HTMLInputElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (cardRef && cardRef?.current)
      setCardWidth(cardRef?.current?.clientWidth);
  }, []);

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
          flex: 1,
          // ...props.style
        }}
      >
        <Card
          className={"bountyCard"}
          variant="outlined"
          sx={{
            width: cardWidth,
            position: "absolute",
            marginTop: "-4px",
            marginLeft: "-4px",
          }}
        >
          <CardContent>{props.children}</CardContent>
        </Card>
        <Card className={"bountyCard"} variant="outlined" ref={cardRef}>
          <CardContent>{props.children}</CardContent>
        </Card>
      </Box>
    </>
  );
};

export default BountyCard;
