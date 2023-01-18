import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { SignedUser } from "../type";

export const showSignInDialogState = atom({
  key: `showSignInDialogState/${v1()}`,
  default: false,
});

export const userDataState = atom<SignedUser>({
  key: `userDataState/${v1()}`,
  default: {},
});
//  const [userData, setUserData] = useState<SignedUser>({});
// _id?: string;
// walletAddress?: string;
// name?: string;
// email?: string;
// profileImageUrl?: string;
