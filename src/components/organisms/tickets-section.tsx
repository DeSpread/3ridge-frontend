import {
  Box,
  ButtonProps,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import { useLoading } from "../../provider/loading/loading-provider";
import { MouseEventWithParam, Ticket, TicketEventParam } from "../../type";
import PrimaryButton from "../atoms/primary-button";
import { useTheme } from "@mui/material/styles";
import TicketCard from "../molecules/ticket-card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { motion } from "framer-motion";

type StyledMenuProps = PropsWithChildren & {
  open: boolean;
  anchorEl?: Element;
};

const StyledMenu = ({ open, anchorEl, children }: StyledMenuProps) => {
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          marginTop: 2,
          minWidth: 180,
          borderWidth: 1,
          // background: "#19151e",
          "& .MuiMenu-list": {
            padding: "8px 4px",
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};
type TicketSectionProps = PropsWithChildren & {
  tickets?: Ticket[];
  loading?: boolean;
  onTicketClick?: MouseEventHandler;
  onTabClick?: MouseEventHandler;
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
          borderColor: theme.palette.secondary.main,
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

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  ":focus": {
    backgroundColor: "transparent",
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 8,
  },
})) as typeof MenuItem;

const TabButtonGroup = (props: TabButtonGroupProps) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [selectedIdx, setSelectedIdx] = useState(0);
  const TITLES = ["Available", "Complete", "Missed"];
  const [anchorEl, setAnchorEl] = useState<Element>();
  const [open, setOpen] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const MENU_ITEMS = ["Recently", "Popular"];
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (index?: number) => {
    setAnchorEl(undefined);
    setOpen(false);
    if (index !== undefined) {
      console.log(index);
      setSelectedMenuIndex(index);
    }
  };

  return (
    <Grid
      container
      justifyContent={"space-between"}
      rowSpacing={2}
      onClick={() => {
        if (anchorEl) {
          setAnchorEl(undefined);
          setOpen(false);
        }
      }}
    >
      <Grid item>
        <Stack direction={"row"} spacing={smUp ? 2 : 1}>
          {TITLES.map((e, index) => {
            return (
              <TabButton
                key={index}
                sx={{
                  paddingLeft: 3,
                  paddingRight: 3,
                  width: smUp ? 128 : 100,
                  borderRadius: 1,
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
      </Grid>
      {/*{smUp && (*/}
      {/*  <Grid item>*/}
      {/*    <PrimaryButton onClick={handleClick}>*/}
      {/*      <Stack*/}
      {/*        direction={"row"}*/}
      {/*        alignItems={"center"}*/}
      {/*        sx={{ width: 110 }}*/}
      {/*        justifyContent={"space-evenly"}*/}
      {/*      >*/}
      {/*        <Typography*/}
      {/*          className={"MuiTypography"}*/}
      {/*          variant={"body2"}*/}
      {/*          sx={{ color: theme.palette.neutral["900"] }}*/}
      {/*        >*/}
      {/*          {MENU_ITEMS[selectedMenuIndex]}*/}
      {/*        </Typography>*/}
      {/*        <Box*/}
      {/*          sx={{*/}
      {/*            alignItems: "center",*/}
      {/*            display: "flex",*/}
      {/*            justifyContent: "center",*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon>*/}
      {/*        </Box>*/}
      {/*      </Stack>*/}
      {/*    </PrimaryButton>*/}
      {/*    <StyledMenu anchorEl={anchorEl} open={open}>*/}
      {/*      <StyledMenuItem*/}
      {/*        onClick={() => {*/}
      {/*          handleClose(0);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <Typography variant={"body2"}>{MENU_ITEMS[0]}</Typography>*/}
      {/*      </StyledMenuItem>*/}
      {/*      <StyledMenuItem*/}
      {/*        onClick={() => {*/}
      {/*          handleClose(1);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <Typography variant={"body2"}>{MENU_ITEMS[1]}</Typography>*/}
      {/*      </StyledMenuItem>*/}
      {/*    </StyledMenu>*/}
      {/*  </Grid>*/}
      {/*)}*/}
    </Grid>
  );
};

const TicketsSection = (props: TicketSectionProps) => {
  const [tabValue, setTabValue] = useState(0);
  const { showLoading, closeLoading } = useLoading();
  const { tickets, loading, onTicketClick, onTabClick } = props;

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
          onTabClick?.(myEvent);
        }}
      ></TabButtonGroup>
      <Box sx={{ marginTop: 6 }}>
        <Grid container spacing={2}>
          {loading &&
            [1, 2, 3, 4].map((e) => {
              return (
                <Grid key={e} item xs={12} sm={6} md={4} lg={3}>
                  <Skeleton
                    height={500}
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
          {!loading && (tickets?.length === 0 || !tickets) && (
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                marginTop: 4,
                background: "",
                width: "100%",
                minHeight: 500,
              }}
            >
              <Typography variant={"h5"} color={"neutral.500"}>
                ⛔ EMPTY
              </Typography>
            </Stack>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default TicketsSection;
