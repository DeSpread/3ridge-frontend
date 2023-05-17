import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { User } from "../type";

export const showSignInDialogState = atom({
  key: `showSignInDialogState/${v1()}`,
  default: false,
});

export const showProfileEditDialogState = atom({
  key: `showProfileEditDialogState/${v1()}`,
  default: false,
});

export const userDataState = atom<User>({
  key: `userDataState/${v1()}`,
  default: {},
});
