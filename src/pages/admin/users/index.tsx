import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import { ReactElement } from "react";

import AdminPageProvider from "@/app/admin/providers";
import UserList from "@/app/admin/userList";
import { useUsers } from "@/hooks/useUsers";
import MainLayout from "@/layouts/main-layout";

export default function AdminUsersPage() {
  const { users } = useUsers();

  return (
    <>
      <Head>
        <title>3ridge : 관리자 페이지</title>
      </Head>
      <AdminPageProvider>
        <UserList users={users} />
      </AdminPageProvider>
    </>
  );
}

AdminUsersPage.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);
