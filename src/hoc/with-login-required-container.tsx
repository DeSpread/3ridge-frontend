import { Card, CardContent, Stack, Typography } from "@mui/material";
import { InjectedConnector as EvmInjectedConnector } from "@wagmi/connectors/injected";
import React, { PropsWithChildren } from "react";
import { useAccount, useConnect as useEvmConnect } from "wagmi";

import { useSignedUserQuery } from "@/hooks/signed-user-query-hook";
import MainLayout from "@/layouts/main-layout";

export default function WithLoginRequiredContainer<T extends PropsWithChildren>(
  WrappedComponent: React.ComponentType<T>,
) {
  const ComponentWith = (props: T & {}) => {
    const { userData } = useSignedUserQuery();
    if (userData?._id) {
      return (
        <MainLayout>
          <WrappedComponent {...(props as T)} />;
        </MainLayout>
      );
    }
    return (
      <>
        <MainLayout>
          <Stack sx={{ width: "100%" }}>
            <Card
              sx={{
                maxWidth: 800,
                minWidth: 400,
                marginTop: 4,
                marginLeft: 4,
              }}
            >
              <CardContent>
                <Typography>로그인 해주시기 바랍니다</Typography>
              </CardContent>
            </Card>
          </Stack>
        </MainLayout>
      </>
    );
  };

  return ComponentWith;
}
