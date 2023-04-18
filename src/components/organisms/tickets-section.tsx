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
import { MouseEventWithParam, Ticket, TicketEventParam } from "../../type";
import { useTheme } from "@mui/material/styles";
import TicketCard from "../molecules/ticket-card";
import PrimaryButton from "../atoms/primary-button";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import Image from "next/image";

type TicketSectionProps = PropsWithChildren & {
  tickets?: Ticket[];
  loading?: boolean;
  onTicketClick?: MouseEventHandler;
  onTabClick?: (newValue: number) => void;
  onTab2Click?: (newValue: number) => void;
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
  color: "#646176",
  fontSize: "1.125rem",
  "&.Mui-selected": {
    color: "white",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const TabButtonGroup2 = (props: TabButtonGroupProps) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [selectedIdx, setSelectedIdx] = useState(0);
  const TITLES = [
    {
      title: "인기순",
      icon: (
        <LocalFireDepartmentIcon
          sx={{ color: "red" }}
        ></LocalFireDepartmentIcon>
      ),
    },
    {
      title: "최신순",
      icon: <QueryBuilderIcon sx={{ color: "white" }}></QueryBuilderIcon>,
    },
  ];

  return (
    <Grid container justifyContent={"space-between"} rowSpacing={2}>
      <Grid item>
        <Stack direction={"row"} spacing={smUp ? 2 : 1}>
          {TITLES.map((e, index) => {
            return (
              <TabButton
                key={index}
                sx={{
                  paddingLeft: 3,
                  paddingRight: 3,
                  width: smUp ? 128 : 128,
                  borderRadius: 1,
                }}
                index={index}
                onChange={(e) => {
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
  const [selectedIdx, setSelectedIdx] = useState(0);
  const TITLES = ["진행 중인 이벤트", "종료된 이벤트", "놓친 이벤트"];

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
          backgroundColor: "white",
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
  const { tickets, loading, onTicketClick, onTabClick, onTab2Click } = props;
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

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
          <TabButtonGroup2
            onChange={(e) => {
              onTab2Click?.(e);
            }}
          ></TabButtonGroup2>
        </Grid>
        <Grid item>
          <TabButtonGroup
            onChange={(e) => {
              onTabClick?.(e);
            }}
          ></TabButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 6 }}>
        <Grid container spacing={2} columns={30}>
          {loading &&
            [1, 2, 3, 4].map((e) => {
              return (
                <Grid key={e} item xs={30} sm={15} md={10} lg={6}>
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
                <Grid key={index} item xs={30} sm={15} md={10} lg={6}>
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
              <Image
                src={
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/empty-box_.svg"
                }
                alt={""}
                width={256}
                height={256}
                style={{}}
              ></Image>
              <Typography variant={"h5"}>Empty Contents</Typography>
            </Stack>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default TicketsSection;
