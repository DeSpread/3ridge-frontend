import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  TwitterAuthProvider,
} from "firebase/auth";
import { firebaseApp } from "../firebase-client";

const auth = getAuth(firebaseApp);
auth.languageCode = "it";

const twitterAuthProvider = new TwitterAuthProvider();

async function asyncJSTwitterSignInPopUp() {
  try {
    const res = await signInWithPopup(auth, twitterAuthProvider);
    return res.user["reloadUserInfo"]["screenName"];
  } catch (e) {
    console.log(e);
    const res = await signInWithRedirect(auth, twitterAuthProvider);
    return res.user["reloadUserInfo"]["screenName"];
  }
}

export { asyncJSTwitterSignInPopUp };
