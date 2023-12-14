"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { PropsWithChildren, useEffect } from "react";

export default function AmplitudeProvider(props: PropsWithChildren) {
  useEffect(() => {
    if (!process.env["NEXT_PUBLIC_AMPLITUDE_API_KEY"]) {
      throw new Error("NEXT_PUBLIC_AMPLITUDE_API_KEY is undefined");
    }
    amplitude.init(process.env["NEXT_PUBLIC_AMPLITUDE_API_KEY"]);
  }, []);

  return <>{props.children}</>;
}
