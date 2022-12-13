import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Events = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <>
      <Typography>aaa</Typography>
    </>
  );
};

export default Events;
