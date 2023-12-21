import { Metadata } from "next";
import React from "react";

import Client from "./Client";

import AdminPageProvider from "@/app/admin/providers";

export const metadata: Metadata = {
  title: "3ridge : 관리자 페이지",
};

export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <AdminPageProvider>
      <Client eventId={params.id} />
    </AdminPageProvider>
  );
}
