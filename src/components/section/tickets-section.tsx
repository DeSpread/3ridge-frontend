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
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import { MouseEventWithParam, Ticket, TicketEventParam } from "../../types";
import { useTheme } from "@mui/material/styles";
import TicketCard from "../form/ticket-card";
import PrimaryButton from "../atomic/atoms/primary-button";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import Image from "next/image";
import { useDetectRef } from "../../hooks/util/use-detect-ref";

type TicketSectionProps = PropsWithChildren & {
  tickets?: Ticket[];
  loading?: boolean;
  isLastTicketData?: boolean;
  onTicketClick?: MouseEventHandler;
  onTabClick?: (newValue: number) => void;
  onTab2Click?: (newValue: number) => void;
  onListEnd?: () => void;
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
  const TITLES = ["전체", "진행 중", "종료됨"];

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
      {TITLES.map((e, index) => {
        return <AntTab label={e} key={index} {...a11yProps(index)} />;
      })}
      {/*<AntTab label={TITLES[0]} {...a11yProps(0)} />*/}
      {/*<AntTab label={TITLES[1]} {...a11yProps(1)} />*/}
      {/*<AntTab label={TITLES[2]} {...a11yProps(2)} />*/}
    </Tabs>
  );
};

const LoadMoreInner = (
  props: HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      className="flex justify-center items-center gap-2 my-2"
      ref={ref}
      {...props}
    >
      {/* spin with tailwindcss */}
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <label>새로운 이벤트 불러오는 중...</label>
    </div>
  );
};

const LoadMore = forwardRef(LoadMoreInner);

const TicketsSection = ({
  tickets,
  loading,
  isLastTicketData,
  onTicketClick,
  onTabClick,
  onTab2Click,
  onListEnd,
  ...props
}: TicketSectionProps) => {
  const loadMoreRef = useRef(null);

  useDetectRef(() => {
    onListEnd?.();
  }, loadMoreRef);

  const theme = useTheme();
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
            [1, 2, 3, 4, 5].map((e) => {
              return (
                <Grid key={e} item xs={30} sm={15} md={10} lg={6}>
                  <Skeleton
                    height={400}
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
                  />
                </Grid>
              );
            })}
          {!loading && !isLastTicketData && (
            <Grid item xs={30}>
              <LoadMore ref={loadMoreRef} />
            </Grid>
          )}
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
              <Typography variant={"h5"}>앗! 컨텐츠가 없어요 :(</Typography>
            </Stack>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default TicketsSection;
