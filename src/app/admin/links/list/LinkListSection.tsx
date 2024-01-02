import { Card, CardContent } from "@mui/material";
import { Suspense } from "react";

import LinkTable, { LinkTableLoading } from "./LinkTable";

interface LinkListSectionProps {
  className?: string;
}

export default function LinkListSection(props: LinkListSectionProps) {
  return (
    <Card className={props.className}>
      <CardContent>
        <h6>링크 목록</h6>
        <Suspense fallback={<LinkTableLoading />}>
          <LinkTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}
