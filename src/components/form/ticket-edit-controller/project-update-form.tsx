import React, { PropsWithChildren, useEffect, useState } from "react";
import Container from "../../atomic/atoms/container";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Project } from "../../../__generated__/graphql";
import { Ticket } from "../../../types";

const ProjectUpdateForm = (
  props: PropsWithChildren & {
    targetTicket?: Ticket;
    projects?: Project[];
    onChange?: (projectId: string) => void;
  }
) => {
  const { targetTicket } = props;

  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    console.log("targetTicket", targetTicket);
    if (targetTicket && targetTicket?.project && targetTicket?.project?._id) {
      setProjectId(targetTicket?.project?._id);
    }
  }, [targetTicket?.project?._id]);

  const { projects, onChange } = props;

  return (
    <Container>
      <Stack spacing={1}>
        <Typography variant={"h6"}>프로젝트 설정</Typography>
        <Divider></Divider>
        <FormControl>
          <Select
            value={projectId}
            onChange={(e) => {
              const { value } = e.target;
              setProjectId(value);
              onChange?.(value);
            }}
            sx={{ minWidth: 120, background: "" }}
          >
            {projects?.map((e, i) => {
              return (
                <MenuItem key={i} value={e._id?.toString()}>
                  {e.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </Container>
  );
};

export default ProjectUpdateForm;
