import Home from "../home";
import React from "react";
import Event from "./[id]";
import { Button } from "@mui/material";

const quizStrategy = (event: React.ComponentType<typeof Event>) => {
  console.log(event);
};

export default quizStrategy;
