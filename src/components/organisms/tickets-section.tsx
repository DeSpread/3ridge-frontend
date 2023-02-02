import {
  Box,
  ButtonProps,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import StyledTabs from "../atoms/styled/styled-tabs";
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  SyntheticEvent,
  useState,
} from "react";
import StyledTab from "../atoms/styled/styled-tab";
import EventCollectionCard from "../molecules/event-collection-card";
import { useLoading } from "../../provider/loading/loading-provider";
import { MouseEventWithParam, Ticket, TicketEventParam } from "../../type";
import PrimaryButton from "../atoms/primary-button";
import { useTheme } from "@mui/material/styles";
import TicketCard from "../molecules/ticket-card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { motion } from "framer-motion";
import { UpDownAnimatedComponentProps } from "../atoms/animation/up-down-animated-component";
import StyledMenu from "../atoms/styled/styled-menu";

type TicketSectionProps = PropsWithChildren & {
  tickets?: Ticket[];
  loading?: boolean;
  onTicketClick?: MouseEventHandler;
  sx?: CSSProperties;
};

type TabButtonProps = ButtonProps & {
  index: number;
  onChange?: MouseEventHandler;
};

const TabButton = (props: TabButtonProps) => {
  const theme = useTheme();
  return (
    <PrimaryButton
      {...props}
      sx={{
        ":disabled": {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.neutral[900],
        },
        ...props.sx,
      }}
      onClick={(e) => {
        const myEvent = {} as MouseEventWithParam<{ index: number }>;
        myEvent.params = {
          index: props.index,
        };
        props.onChange?.(myEvent);
      }}
      size={props.size}
    ></PrimaryButton>
  );
};

type TabButtonGroupProps = PropsWithChildren & {
  onChange?: MouseEventHandler;
};

const RotateAnimatedComponent = (props: {
  style?: CSSProperties;
  duration?: number;
  children?: ReactNode | undefined;
  up?: boolean;
}) => {
  return (
    <motion.div
      animate={{
        rotateZ: props.up ? [0, 180] : [180, 360],
        // translateY: ["0px", `${yDist}`, "0px"],
      }}
      transition={{
        duration: props?.duration,
        ease: "easeInOut",
        times: [0, 1],
        // repeat: Infinity,
      }}
      style={{ ...props.style }}
    >
      {props.children}
    </motion.div>
  );
};

const TabButtonGroup = (props: TabButtonGroupProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const TITLES = ["Available", "Complete", "Missed"];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const MENU_ITEMS = ["Recently", "Popular"];
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (index?: number) => {
    setAnchorEl(null);
    if (index !== undefined) {
      console.log(index);
      setSelectedMenuIndex(index);
    }
  };

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"row"} spacing={2}>
        {TITLES.map((e, index) => {
          return (
            <TabButton
              key={index}
              sx={{
                paddingLeft: 3,
                paddingRight: 3,
                width: 128,
              }}
              index={index}
              onChange={(e) => {
                const myEvent = e as MouseEventWithParam<{ index: number }>;
                setSelectedIdx(myEvent.params.index);
                props?.onChange?.(myEvent);
              }}
              disabled={selectedIdx === index}
              size={"small"}
            >
              {e}
            </TabButton>
          );
        })}
      </Stack>
      <>
        <PrimaryButton onClick={handleClick}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ width: 110 }}
            justifyContent={"space-evenly"}
          >
            <Typography className={"MuiTypography"} variant={"body2"}>
              {MENU_ITEMS[selectedMenuIndex]}
            </Typography>
            <RotateAnimatedComponent duration={1}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon>
              </Box>
            </RotateAnimatedComponent>
          </Stack>
        </PrimaryButton>
        <StyledMenu
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            handleClose(undefined);
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose(0);
            }}
          >
            <Typography variant={"body2"}>{MENU_ITEMS[0]}</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose(1);
            }}
          >
            <Typography variant={"body2"}>{MENU_ITEMS[1]}</Typography>
          </MenuItem>
        </StyledMenu>
      </>
    </Stack>
  );
};

const TicketsSection = (props: TicketSectionProps) => {
  const [tabValue, setTabValue] = useState(0);
  const { showLoading, closeLoading } = useLoading();
  const { tickets, loading, onTicketClick } = props;

  const onTicketCardClick = (ticket: Ticket) => {
    const myEvent = {} as MouseEventWithParam<TicketEventParam>;
    myEvent.params = {
      ticket,
    };
    onTicketClick?.(myEvent);
  };

  return (
    <Box
      sx={{
        ...props.sx,
      }}
    >
      <TabButtonGroup
        onChange={(e) => {
          const myEvent = e as MouseEventWithParam<{ index: number }>;
          setTabValue(myEvent.params.index);
        }}
      ></TabButtonGroup>
      <Box sx={{ marginTop: 6 }}>
        <Grid container spacing={2}>
          {loading &&
            [1, 2, 3, 4].map((e) => {
              return (
                <Grid key={e} item xs={12} sm={6} md={4} lg={3}>
                  <Skeleton
                    // width={"552px"}
                    height={"480px"}
                    variant={"rounded"}
                    animation={"wave"}
                  />
                </Grid>
              );
            })}
          {!loading &&
            tickets?.map((ticket, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <TicketCard
                    ticket={ticket}
                    onClick={(e) => {
                      onTicketCardClick(ticket);
                    }}
                  ></TicketCard>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default TicketsSection;
