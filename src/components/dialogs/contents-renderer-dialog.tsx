import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Z_INDEX_OFFSET } from "../../type";
import { MouseEventHandler } from "react";
import PrimaryButton from "../atoms/primary-button";

type ContentsRendererDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
};

const ContentsRendererDialog = (props: ContentsRendererDialogProps) => {
  const { ...rest } = props;
  const theme = useTheme();

  let codes =
    "<!DOCTYPE html>\n" +
    '<html lang="en">\n' +
    "<head>\n" +
    '  <meta charset="UTF-8">\n' +
    '  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    "  <title>Document</title>\n" +
    "  <style>\n" +
    "    .container {\n" +
    '      width: "100%";\n' +
    "      height: 100vh;\n" +
    "      background-color: #19151d;\n" +
    "    }\n" +
    "    .center {\n" +
    "      position: absolute;\n" +
    "      top: 50%;\n" +
    "      left: 50%;\n" +
    "      transform: translate(-50%, -50%);\n" +
    "      color: green;\n" +
    "    }\n" +
    "    .h5 {\n" +
    "      color: white;\n" +
    "    }\n" +
    "    .h4 {\n" +
    "      text-align: center;\n" +
    "      color: #bcc1c8\n" +
    "    }\n" +
    "    .btn {\n" +
    "      border-radius: 16px;\n" +
    "      background-color: #434956;\n" +
    "      border-width: 0px;\n" +
    "      color: white;\n" +
    "      padding: 16px;\n" +
    "    }\n" +
    "  </style>\n" +
    "</head>\n" +
    "<body>\n" +
    '  <div class="container">\n' +
    '    <div class="center">\n' +
    '      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">\n' +
    '        <img style="width:300px; height:100px;" src="https://imgp.layer3cdn.com/cdn-cgi/image/fit=scale-down,width=588,anim=false,format=auto/ipfs/QmcNBG5oGTDHp349GLJf4bmwfkU61hoRcbxHLPSPrAByMj"/>\n' +
    '        <h3 class="h5">\n' +
    "          Get some MATIC on Polygon\n" +
    "        </h3>\n" +
    '        <h5 class="h4" style="margin-top: -3px;">\n' +
    "          MATIC is Polygon's native currency. You'll need it in your wallet to participate in Polygon Quests. \n" +
    "        </h5>\n" +
    '        <button class="btn">\n' +
    "          Open Uniswap\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</body>\n" +
    "</html>";

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
        <DialogTitle>ABC</DialogTitle>
        <DialogContent>
          <div style={{ width: "100%" }}>
            <div dangerouslySetInnerHTML={{ __html: codes }}></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentsRendererDialog;
