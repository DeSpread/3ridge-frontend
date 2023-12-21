import { Metadata } from "next";
import Link from "next/link";
import { PropsWithChildren } from "react";

import AdminPageProvider from "./providers";

export const metadata: Metadata = {
  title: "3ridge : 관리자 페이지",
};

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <AdminPageProvider>
      <nav>
        <ul>
          <li>
            <Link href="/admin">이벤트 / 프로젝트</Link>
          </li>
          <li>
            <Link href="/admin/users">유저</Link>
          </li>
          <li>
            <Link href="/admin/links">링크</Link>
          </li>
        </ul>
      </nav>
      {props.children}
    </AdminPageProvider>
  );
}
