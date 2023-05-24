import { useRecoilValue, useSetRecoilState } from "recoil";
import { showProfileEditDialogState } from "../lib/recoil";
import { useMemo } from "react";

export function useProfileEditDialog() {
  const showProfileEditDialog = useRecoilValue(showProfileEditDialogState);
  const _setShowProfileEditDialog = useSetRecoilState(
    showProfileEditDialogState
  );

  const isProfileEditDialogOpen = useMemo(() => {
    return showProfileEditDialog;
  }, [showProfileEditDialog]);

  const setShowProfileEditDialog = (open: boolean) => {
    _setShowProfileEditDialog(open);
  };

  return { isProfileEditDialogOpen, setShowProfileEditDialog };
}
