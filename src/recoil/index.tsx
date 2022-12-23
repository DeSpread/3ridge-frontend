import { atom, selector } from "recoil";
import { v1 } from "uuid";

export const showSignInDialogState = atom({
  key: `showSignInDialogState/${v1()}`,
  default: false,
});
