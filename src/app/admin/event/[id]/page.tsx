import React from "react";

import Client from "./Client";

export default function EventPage({ params }: { params: { id: string } }) {
  return <Client eventId={params.id} />;
}
