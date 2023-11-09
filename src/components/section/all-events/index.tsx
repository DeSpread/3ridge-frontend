import { Stack, Typography } from "@mui/material";

import TicketsSection from "../tickets-section/index";

export const AllEvents = () => {
  return (
    <Stack direction={"column"}>
      <div className="mt-8">
        <Typography variant={"h4"}>전체 이벤트</Typography>
      </div>
      <section className="mt-4">
        <TicketsSection />
      </section>
    </Stack>
  );
};
