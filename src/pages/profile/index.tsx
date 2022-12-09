import {ReactElement, useEffect} from "react";
import MainLayout from "../../components/layouts/main-layout";
import {AppProps} from "next/app";
import Head from "next/head";
import {Avatar, Box, Chip, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import {Twitter} from "@mui/icons-material";
import ProfileTab from "../../components/atoms/profile-tab";
import TwitterIcon from '@mui/icons-material/Twitter';
import EthIcon from "../../components/atoms/icon/eth-icon";
import KakaoIcon from "../../components/atoms/icon/kakao-icon";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Profile = (props: AppProps) => {
  useEffect(() => {
  }, []);

  return (
      <>
        <Head>
          <title>Profile</title>
        </Head>

        <Box pl={8} pr={8} pt={8} pb={12} style={{flex: 1, background: ""}}>
          <Stack
              direction={"column"}
              alignItems={"left"}
              sx={{background: ""}}
              spacing={4}>
            <Avatar alt=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAABSdJREFUeF7tnbFtVmEQBP+fyJELQK6AGgipAUISCqEJREJCCBk9GQpw5AjIIZy1vPp2yO/8bm5ueUg8+fr6x6s/l+I/N/cP0ad7vLuN9ks3W5v3qoBphVg/BWT84tVrC1mb1wSMnwxrqICMX7x6bSFr85qA8ZNhDRWQ8YtXry1kbV4TMH4yrKECMn7x6rWFrM1rAsZPhjVUQMYvXr22kLV5TcD4ybCGCsj4xavXFrI2rwkYPxnWUAEZv3j12kLW5jUB4yfDGiog4xevXlvI2rwmYPxkWEMFZPzi1WsLWZvXBIyfDGuogIxfvHptIWvzmoDxk2ENFZDxi1evLWRtXhMwfjKsoQIyfvHqtYWszWsCxk+GNVRAxi9evbaQtXlNwPjJsIYKyPjFq9cWsjavCRg/GdZQARm/ePXaQtbmNQHjJ8MaKiDjF69eW8javCZg/GRYQwVk/OLVawtZm9cEjJ8Ma6iAjF+8em0ha/OagPGTYQ0VkPGLV68tZG1eEzB+MqzhnIA/P3+s/j0h715+Zxsdr/726201gasCVu8HP5wCQoQmIAOogIzfRQEZQAVk/BQQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGsF7AN5/uqr8JYfitbidwVcD2FZ39fAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gPW/qCaNv/0jnbWPsBQwbTjsp4AQYHu5Cdi1IROwax9zH+IroAI+KwEFfFb8//9w3wHLFpJ+HN8B00RZPxOQ8YtXm4BxpF0NTcCufZiAXfvwX8Fl+4g/jgkYR4oamoAIX77Yd8A806qOJmDVOi4mYNc+fAcs20f8cUzAOFLU0ARE+PLFvgPmmVZ1NAGr1uE7YNc6Lr4Dti0k/TwmYJoo6+c7IOMXr/YdMI6UNby5f2AN/ql+vLuN9ks3W5u3PgHXFrI2rwKmIwz2U0AIMF2+tpC1eU3A9MXAfgoIAabL1xayNq8JmL4Y2E8BIcB0+dpC1uY1AdMXA/spIASYLl9byNq8JmD6YmA/BYQA0+VrC1mb1wRMXwzsp4AQYLp8bSFr85qA6YuB/RQQAkyXry1kbV4TMH0xsJ8CQoDp8rWFrM1rAqYvBvZTQAgwXb62kLV54wmY/uos/ZFOesHpg0t/s9K+DwVMGwT7KSAE2H5xJiBbcPpvJBOQ7SNebQJCpCYgA6iAjN9FARlABWT8FBDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8bu0/4/jry8+wAmftvz97y9P+wNg9/SBxP9HtAKyDSsg42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAzgmoB/AUkZadkjtJSBAAAAAElFTkSuQmCC"
                    sx={{
                      width: 100,
                      height: 100
                    }}/>
          </Stack>
          <Stack
              direction={"column"}
              alignItems={"left"}
              sx={{background: ""}}
              spacing={2}
              width={300}>
            <Stack
                direction={"row"}
                alignItems={"left"}
                sx={{background: ""}}
                pt={5}
                spacing={4}>
              <Typography variant="h6">
                Level 1
              </Typography>
              <Typography variant="subtitle1">
                85 XP until next level
              </Typography>
            </Stack>
            <BorderLinearProgress variant="determinate" value={50}/>
          </Stack>
          <Stack
              direction={"column"}
              alignItems={"left"}
              sx={{flex: 1, background: ""}}
              pt={5}
              spacing={4}>
            <Typography variant="h4">
              0x6e2B...4f05
            </Typography>
            <Stack
                direction={"row"}
                alignItems={"left"}
                sx={{background: ""}}
                spacing={2}
            >
              <Chip
                  icon={<EthIcon/>}
                  label={"0x6e2B...4f05"}
              ></Chip>
              <Chip
                  icon={<TwitterIcon/>}
                  label={"Twitter"}
              ></Chip>
              <Chip
                  icon={<KakaoIcon/>}
                  label={"Kakao"}
              ></Chip>
              <Chip
                  icon={<MarkEmailReadIcon/>}
                  label={"test@gmail.com"}
              ></Chip>
            </Stack>
          </Stack>
          <Stack
              direction={"column"}
              alignItems={"left"}
              sx={{flex: 1, background: ""}}
              pt={5}
              spacing={4}>
            <ProfileTab headerTitle={"Achievements"}/>
            <ProfileTab headerTitle={"Quest Achievements"}/>
          </Stack>
        </Box>
      </>
  );
};

Profile.getLayout = (page: ReactElement | ReactElement[]) => (
    <MainLayout>{page}</MainLayout>
);

export default Profile;
