import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { MouseEventHandler } from "react";
import { QuizQuestContext, Z_INDEX_OFFSET } from "../../type";
import { useTheme } from "@mui/material/styles";

type QuestDiscordDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
};

const SimpleDialog = (props: QuestDiscordDialogProps) => {
  const { ...rest } = props;
  const theme = useTheme();

  return (
    <>
      <Dialog
        {...rest}
        fullWidth
        maxWidth={"xs"}
        sx={{
          backdropFilter: "blur(2px)",
          zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG,
        }}
        PaperProps={{
          style: {
            borderRadius: 16,
            borderWidth: 3,
            borderColor: theme.palette.neutral[700],
            borderStyle: "solid",
            padding: 8,
          },
        }}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </>
  );
};

export default SimpleDialog;
