"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

import { useUser } from "@/hooks/useUser";

export default function AdminPageProvider(props: PropsWithChildren) {
  const router = useRouter();

  useUser({
    onCompleted(user) {
      if (user?.type !== "admin") {
        router.replace("/404");
      }
    },
  });

  return <>{props.children}</>;
}
