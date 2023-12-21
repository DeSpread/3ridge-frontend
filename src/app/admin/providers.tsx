"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { useUser } from "@/hooks/user/useUser";

export default function AdminPageProvider(props: PropsWithChildren) {
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (user === null) {
      router.replace("/404");
    }

    if (user && user?.type !== "admin") {
      router.replace("/404");
    }
  }, [user, router]);

  if (user === undefined) {
    return null;
  }

  return <>{props.children}</>;
}
