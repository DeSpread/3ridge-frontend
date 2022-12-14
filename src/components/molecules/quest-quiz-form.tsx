import * as React from "react";
import {PropsWithChildren} from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack} from "@mui/material";

type QuestQuizFormProps = PropsWithChildren & {}

const QuestQuizForm = (props: QuestQuizFormProps) => {
  return (
      <>
        <Stack direction={"column"}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Stack>
      </>
  );
};

export default QuestQuizForm;
