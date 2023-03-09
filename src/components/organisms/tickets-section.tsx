import {
  Box,
  ButtonProps,
  Grid,
  Skeleton,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from "react";
import { useLoading } from "../../provider/loading/loading-provider";
import { MouseEventWithParam, Ticket, TicketEventParam } from "../../type";
import { useTheme } from "@mui/material/styles";
import TicketCard from "../molecules/ticket-card";
import PrimaryButton from "../atoms/primary-button";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

type TicketSectionProps = PropsWithChildren & {
  tickets?: Ticket[];
  loading?: boolean;
  onTicketClick?: MouseEventHandler;
  onTabClick?: (newValue: number) => void;
  sx?: CSSProperties;
};

type TabButtonGroupProps = PropsWithChildren & {
  onChange?: (newValue: number) => void;
};

interface StyledTabProps {
  label: string;
}

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
          backgroundColor: theme.palette.neutral[900],
          color: theme.palette.neutral[100],
          borderColor: theme.palette.neutral[100],
        },
        background: "transparent",
        borderColor: "transparent",
        color: theme.palette.neutral[100],
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

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  // textTransform: "none",
  // marginRight: theme.spacing(1),
  color: "#646176",
  fontSize: "1.125rem",
  "&.Mui-selected": {
    color: "white",
    fontWeight: theme.typography.fontWeightMedium,
  },
  // marginLeft: "auto",
}));

const TabButtonGroup2 = (props: TabButtonGroupProps) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [selectedIdx, setSelectedIdx] = useState(0);
  const TITLES = [
    {
      title: "Trending",
      icon: (
        <LocalFireDepartmentIcon
          sx={{ color: "red" }}
        ></LocalFireDepartmentIcon>
      ),
    },
    {
      title: "Newest",
      icon: <QueryBuilderIcon sx={{ color: "#62cbff" }}></QueryBuilderIcon>,
    },
  ];
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
                  // const myEvent = e as MouseEventWithParam<{ index: number }>;
                  setSelectedIdx(index);
                  props?.onChange?.(index);
                }}
                disabled={selectedIdx === index}
                size={"small"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={"4px"}>
                  {e.icon}
                  <Typography className={"MuiTypography"} fontSize={"1.125rem"}>
                    {e.title}
                  </Typography>
                </Stack>
              </TabButton>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
};

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

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Tabs
      value={selectedIdx}
      onChange={(event: React.SyntheticEvent, newValue: number) => {
        setSelectedIdx(newValue);
        props?.onChange?.(newValue);
      }}
      aria-label="Events"
      TabIndicatorProps={{
        style: {
          backgroundColor: "white", //theme.palette.primary.main,
        },
      }}
      sx={{ background: "" }}
    >
      <AntTab label={TITLES[0]} {...a11yProps(0)} />
      <AntTab label={TITLES[1]} {...a11yProps(1)} />
      <AntTab label={TITLES[2]} {...a11yProps(2)} />
    </Tabs>
  );
};

const TicketsSection = (props: TicketSectionProps) => {
  const [tabValue, setTabValue] = useState(0);
  const { showLoading, closeLoading } = useLoading();
  const { tickets, loading, onTicketClick, onTabClick } = props;
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

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
      <Grid
        container
        sx={{ background: "" }}
        direction={smUp ? "row" : "column"}
        justifyContent={"space-between"}
        columnSpacing={1}
        alignItems={smUp ? "center" : "flex-start"}
      >
        <Grid item>
          <TabButtonGroup2></TabButtonGroup2>
          {/*<Stack direction={"row"} alignItems={"center"} spacing={1}>*/}
          {/*  {[{ title: "Trending" }, { title: "Newest" }].map((e, index) => {*/}
          {/*    return (*/}
          {/*      <PrimaryButton sx={{ borderRadius: "8px" }} key={index}>*/}
          {/*        <Stack direction={"row"} spacing={"4px"}>*/}
          {/*          <LocalFireDepartmentIcon*/}
          {/*            sx={{ color: "red" }}*/}
          {/*          ></LocalFireDepartmentIcon>*/}
          {/*          <Typography*/}
          {/*            className={"MuiTypography"}*/}
          {/*            sx={{ color: "black" }}*/}
          {/*          >*/}
          {/*            Trending*/}
          {/*          </Typography>*/}
          {/*        </Stack>*/}
          {/*      </PrimaryButton>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</Stack>*/}
        </Grid>
        <Grid item>
          <TabButtonGroup
            onChange={(e) => {
              // const myEvent = e as MouseEventWithParam<{ index: number }>;
              setTabValue(e);
              onTabClick?.(e);
            }}
          ></TabButtonGroup>
        </Grid>
      </Grid>
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
                minHeight: 300,
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
