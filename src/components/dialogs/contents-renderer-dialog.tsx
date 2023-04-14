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
    "    body {\n" +
    "      background-color: #19151d;\n" +
    "    }\n" +
    "    .root {\n" +
    '      width: "100%";\n' +
    "      height: 50vh;\n" +
    "    }\n" +
    "    .container-center {\n" +
    "      position: absolute;\n" +
    "      top: 50%;\n" +
    "      left: 50%;\n" +
    "      transform: translate(-50%, -50%);\n" +
    "      color: green;\n" +
    "    }\n" +
    "    h3 {\n" +
    "      color: white;\n" +
    "    }\n" +
    "    h5 {\n" +
    "      text-align: center;\n" +
    "      color: #bcc1c8\n" +
    "    }\n" +
    "    button {\n" +
    "      border-radius: 16px;\n" +
    "      background-color: #434956;\n" +
    "      border-width: 0px;\n" +
    "      color: white;\n" +
    "      padding: 16px;\n" +
    "      box-shadow: 0px 8px 15px rgba(1, 1, 1, 0.1);\n" +
    "      transform: translateY(0px);\n" +
    "      transition: all 0.1s;\n" +
    "      transition-timing-function: ease-out;\n" +
    "    }\n" +
    "    button:hover {\n" +
    "      background-color: #2EE59D;\n" +
    "      box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);\n" +
    "      color: #fff;\n" +
    "      transform: translateY(-2px);\n" +
    "      transition-delay: 0s;\n" +
    "    }\n" +
    "  </style>\n" +
    "</head>\n" +
    "<body>\n" +
    '  <div class="root">\n' +
    '    <div class="container-center">\n' +
    '      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">\n' +
    '        <img style="width:300px; height:100px;" src="https://imgp.layer3cdn.com/cdn-cgi/image/fit=scale-down,width=588,anim=false,format=auto/ipfs/QmcNBG5oGTDHp349GLJf4bmwfkU61hoRcbxHLPSPrAByMj"/>\n' +
    "        <h3>\n" +
    "          Get some MATIC on Polygon\n" +
    "        </h3>\n" +
    '        <h5 style="margin-top: -3px;">\n' +
    "          MATIC is Polygon's native currency. You'll need it in your wallet to participate in Polygon Quests. \n" +
    "        </h5>\n" +
    "        <button>\n" +
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
