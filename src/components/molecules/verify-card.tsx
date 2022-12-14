import {Box, Card, CardContent, Grid, Stack, Typography,} from "@mui/material";
import React, {CSSProperties, PropsWithChildren} from "react";
import CommunityChip from "../atoms/community-chip";
import SecondaryButton from "../atoms/secondary-button";
import PrimaryButton from "../atoms/primary-button";
import QuestQuizDialog from "./quest-quiz-dialog";

type VerifyCardProps = PropsWithChildren & {
  sx?: CSSProperties;
  title?: string;
  summary?: string;
  community?: {
    name: string;
    thumbnailUrl?: string;
  };
};

const VerifyCard = (props: VerifyCardProps) => {
  const [questDialogOpen, setQuestDialogOpen] = React.useState(false);

  const handleQuestDialogClickOpen = () => {
    setQuestDialogOpen(true);
  };

  const handleQuestDialogClose = (value: string) => {
    setQuestDialogOpen(false);
  };

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
              minWidth: 552,
              height: "110px",
              ...props.sx,
            }}
        >
          <Card
              className={"bountyCard"}
              variant="outlined"
          >
            <CardContent>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={9}>
                  <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"}
                         spacing={4}>
                    <Stack direction={"row"} alignItems={"center"}>
                      {props.community && (
                          <CommunityChip
                              name={props.community.name}
                              thumbnailUrl={props.community.thumbnailUrl}
                          />
                      )}
                    </Stack>
                    <Stack
                        direction={"column"}
                        sx={{background: ""}}
                        spacing={2}
                    >
                      <Typography variant={"h6"}>{props.title}</Typography>
                      {props.summary && (
                          <Stack direction={"row"}>
                            <Typography
                                variant={"body2"}
                                sx={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: "2",
                                  WebkitBoxOrient: "vertical",
                                }}
                            >
                              {props.summary}
                            </Typography>
                          </Stack>
                      )}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack direction={"row"} spacing={2}>
                    <PrimaryButton size={"medium"} style={{marginTop: 16}}>
                      Verify
                    </PrimaryButton>
                    <SecondaryButton size={"medium"} style={{marginTop: 16}}
                                     onClick={() => setQuestDialogOpen(true)}>
                      Start
                    </SecondaryButton>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        <QuestQuizDialog open={questDialogOpen} onClose={handleQuestDialogClose}/>
      </>
  );
};

export default VerifyCard;
