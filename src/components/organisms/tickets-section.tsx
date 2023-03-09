import {
  Box,
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

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  marginRight: theme.spacing(1),
  color: "#646176",
  "&.Mui-selected": {
    color: "white",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

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
          >
            <AntTab label={TITLES[0]} {...a11yProps(0)} />
            <AntTab label={TITLES[1]} {...a11yProps(1)} />
            <AntTab label={TITLES[2]} {...a11yProps(2)} />
          </Tabs>
        </Stack>
      </Grid>
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
          // const myEvent = e as MouseEventWithParam<{ index: number }>;
          setTabValue(e);
          onTabClick?.(e);
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
