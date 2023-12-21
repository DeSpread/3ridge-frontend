import { Metadata } from "next";
import { PropsWithChildren } from "react";

import AdminPageProvider from "./providers";

export const metadata: Metadata = {
  title: "3ridge : 관리자 페이지",
};

export default function AdminLayout(props: PropsWithChildren) {
  return <AdminPageProvider>{props.children}</AdminPageProvider>;
}
