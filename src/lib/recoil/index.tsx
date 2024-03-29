import { atom, selector } from "recoil";
import { v1 } from "uuid";

import { User } from "../../types";

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

export const isMobileState = atom({
  key: `isMobileState/${v1()}`,
  default: false,
});

export const backDirectionPathState = atom({
  key: `backDirectionPathState/${v1()}`,
  default: "",
});

export const kakaoRequestState = atom({
  key: `kakaoRequestState/${v1()}`,
  default: "",
});
