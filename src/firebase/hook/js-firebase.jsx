import {
  signInWithPopup,
  signInWithRedirect,
  TwitterAuthProvider,
} from "firebase/auth";

const twitterAuthProvider = new TwitterAuthProvider();

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
