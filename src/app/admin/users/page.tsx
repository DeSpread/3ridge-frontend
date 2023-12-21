import { Metadata } from "next";

import AdminPageProvider from "@/app/admin/providers";
import UserList from "@/app/admin/userList";

export const metadata: Metadata = {
  title: "3ridge : 관리자 페이지",
};

export default function AdminUsersPage() {
  return (
    <AdminPageProvider>
      <UserList />
    </AdminPageProvider>
  );
}
