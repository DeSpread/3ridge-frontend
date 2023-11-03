import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
