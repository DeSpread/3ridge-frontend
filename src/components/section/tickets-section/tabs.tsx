import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import {
  type ButtonProps,
  styled,
  Tab,
  useTheme,
  Tabs,
  useMediaQuery,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";

import PrimaryButton from "../../atomic/atoms/primary-button";

interface StyledTabProps {
  label: string;
}

interface TabButtonGroupProps {
  onTabChange: (index: number) => void;
}

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

export const TabButton = ({ sx, size, ...rest }: ButtonProps) => {
  const theme = useTheme();
  return (
    <PrimaryButton
      {...rest}
      sx={{
        ":disabled": {
          backgroundColor: theme.palette.neutral[900],
          color: theme.palette.neutral[100],
          borderColor: theme.palette.neutral[100],
        },
        background: "transparent",
        borderColor: "transparent",
        color: theme.palette.neutral[100],
        ...sx,
      }}
      size={size}
    />
  );
};

const TAB_GROUP_1 = ["전체", "진행 중", "종료됨"];

export const Tabs1 = ({ onTabChange }: TabButtonGroupProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Tabs
      value={selectedIdx}
      aria-label="Events"
      TabIndicatorProps={{ style: { backgroundColor: "white" } }}
      sx={{ background: "" }}
    >
      {TAB_GROUP_1.map((label, index) => (
        <AntTab
          key={index}
          label={label}
          {...a11yProps(index)}
          onClick={() => {
            setSelectedIdx(index);
            onTabChange(index);
          }}
        />
      ))}
    </Tabs>
  );
};

const TAB_GROUP_2 = [
  {
    title: "인기순",
    icon: <LocalFireDepartmentIcon sx={{ color: "red" }} />,
  },
  {
    title: "최신순",
    icon: <QueryBuilderIcon sx={{ color: "white" }} />,
  },
];

export const Tabs2 = ({ onTabChange }: TabButtonGroupProps) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedIdx(index);
    onTabChange(index);
  };

  return (
    <Grid container justifyContent={"space-between"} rowSpacing={2}>
      <Grid item>
        <Stack direction={"row"} spacing={smUp ? 2 : 1}>
          {TAB_GROUP_2.map(({ icon, title }, index) => (
            <TabButton
              key={index}
              sx={{
                paddingLeft: 3,
                paddingRight: 3,
                width: smUp ? 128 : 128,
                borderRadius: 1,
              }}
              onClick={() => handleTabChange(index)}
              disabled={selectedIdx === index}
              size={"small"}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"4px"}>
                {icon}
                <Typography className={"MuiTypography"} fontSize={"1.125rem"}>
                  {title}
                </Typography>
              </Stack>
            </TabButton>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};
