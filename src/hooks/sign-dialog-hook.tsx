import { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { showSignInDialogState } from "../lib/recoil";

export function useSignDialog() {
  const showSignInDialog = useRecoilValue(showSignInDialogState);
  const _setShowSignInDialog = useSetRecoilState(showSignInDialogState);

  const isSignDialogOpen = useMemo(() => {
    return showSignInDialog;
  }, [showSignInDialog]);

  const setShowSignInDialog = (open: boolean) => {
    _setShowSignInDialog(open);
  };

  return { isSignDialogOpen, setShowSignInDialog };
}
