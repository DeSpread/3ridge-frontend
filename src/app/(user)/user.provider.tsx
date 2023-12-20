"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

import { UserItemFragment } from "@/__generated__/graphql";

type UserContextValue = {
  userState: ReturnType<typeof useState<UserItemFragment>>;
};

export const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider(props: PropsWithChildren) {
  const userState = useState<UserItemFragment>();

  return (
    <UserContext.Provider
      value={{
        userState,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("userContext is null");
  }

  return userContext;
}
