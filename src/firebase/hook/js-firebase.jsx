import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, twitterAuthProvider } from "../firebase-client";

async function asyncJSTwitterSignInPopUp() {
  try {
    const res = await signInWithPopup(auth, twitterAuthProvider);
    return res.user["reloadUserInfo"]["screenName"];
  } catch (e) {
    const res = await signInWithRedirect(auth, twitterAuthProvider);
    return res.user["reloadUserInfo"]["screenName"];
  }
}

export { asyncJSTwitterSignInPopUp };
