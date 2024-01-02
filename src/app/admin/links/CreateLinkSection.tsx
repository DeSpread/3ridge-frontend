"use client";

import { Card, CardContent, Divider } from "@mui/material";

import CreateLinkForm from "./CreateLinkForm";

export default function CreateLinkSection() {
  return (
    <Card>
      <CardContent>
        <h6>링크 생성하기</h6>
        <Divider />
        <div className="mt-3">
          <CreateLinkForm />
        </div>
      </CardContent>
    </Card>
  );
}
