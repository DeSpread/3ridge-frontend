import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type ConfirmRef = {
  title?: string;
  contents?: ReactNode;
  okLabel?: string;
  cancelLabel?: string;
  onClickOk?(): void;
  onClickCancel?(): void;
};
type OpenConfirmFunctionArgs = ConfirmRef;
type OpenConfirmFunction = (args: OpenConfirmFunctionArgs) => void;

interface ConfirmContextValue {
  openConfirm: OpenConfirmFunction;
  closeConfirm(): void;
}

interface ConfirmProviderProps extends PropsWithChildren {}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export default function ConfirmProvider(props: ConfirmProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const confirmRef = useRef<ConfirmRef>();

  const providerValue: ConfirmContextValue = {
    openConfirm(value) {
      confirmRef.current = value;
      setIsOpen(true);
    },
    closeConfirm() {
      setIsOpen(false);
    },
  };

  function onClickCancel() {
    confirmRef.current?.onClickCancel?.();
    setIsOpen(false);
  }

  function onClickOk() {
    confirmRef.current?.onClickOk?.();
    setIsOpen(false);
  }

  return (
    <ConfirmContext.Provider value={providerValue}>
      <Dialog open={isOpen}>
        <DialogTitle>{confirmRef.current?.title ?? "확인"}</DialogTitle>
        <DialogContent dividers className="whitespace-pre-wrap">
          {confirmRef.current?.contents}
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="outlined" onClick={onClickCancel}>
            {confirmRef.current?.cancelLabel ?? "Cancel"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ background: "tomato" }}
            onClick={onClickOk}
          >
            {confirmRef.current?.okLabel ?? "OK"}
          </Button>
        </DialogActions>
      </Dialog>
      {props.children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const confirmContext = useContext(ConfirmContext);

  if (!confirmContext) throw new Error("confirmContext is undefined");

  return confirmContext;
}
