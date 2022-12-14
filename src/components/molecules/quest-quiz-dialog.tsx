import * as React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText, FormControl, FormLabel, RadioGroup,
  Stack,
  Typography
} from "@mui/material";
import QuestQuizForm from "./quest-quiz-form";
import {maxWidth} from "@mui/system";

interface SimpleDialogProps {
  open: boolean;
  selectedValue?: string;
  onClose: (value: string) => void;
}

const QuestQuizDialog = (props: SimpleDialogProps) => {
  const {onClose, selectedValue, open} = props;

  const handleClose = () => {
    onClose('');
  };

  return (
      <>
        <Dialog
            fullWidth
            maxWidth={"sm"}
          onClose={handleClose} open={open}>
          <DialogTitle>
            <Stack direction={"column"} spacing={1}>
              <Typography variant={"body1"}>
                Question 1 of 2
              </Typography>
              <Typography variant={"h5"}>
                Swapping is
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <QuestQuizForm />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Next Question</Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default QuestQuizDialog;
