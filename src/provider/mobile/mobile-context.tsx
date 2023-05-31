import React, { createContext, useContext } from "react";

const MobileContext = createContext<{
  isMobile: boolean;
}>({
  isMobile: false,
});

export const useMobile = () => useContext(MobileContext);
export { MobileContext };
