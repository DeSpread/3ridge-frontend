import { auth } from "../firebase-client";
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AppError, getErrorMessage } from "../../error/my-error";
import { MAIL_VERIFY, MailVerified } from "../../type";

const useFirebaseAuth = () => {
  const asyncSignInEmailWithVerify = async (
    email: string,
    password: string
  ) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user.emailVerified
        ? MAIL_VERIFY.VERIFIED
        : MAIL_VERIFY.NOT_VERIFIED;
    } catch (e) {
      const message = getErrorMessage(e);
      if (message.includes("auth/user-not-found")) {
        return MAIL_VERIFY.USER_NOT_FOUND;
      }
      if (message.includes("auth/wrong-password")) {
        return MAIL_VERIFY.PASSWORD_WRONG;
      }
      throw e;
    }
  };

  const asyncResendEmailVerify = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user.emailVerified) {
        throw new AppError(MAIL_VERIFY.VERIFIED);
      }
      await sendEmailVerification(res.user);
      return true;
    } catch (e) {
      const message = getErrorMessage(e);
      throw new AppError(message);
    }
  };

  const asyncVerifyUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<MailVerified> => {
    try {
      const verified = await asyncSignInEmailWithVerify(email, password);
      if (
        verified === MAIL_VERIFY.VERIFIED ||
        verified === MAIL_VERIFY.NOT_VERIFIED ||
        verified === MAIL_VERIFY.PASSWORD_WRONG
      ) {
        return verified;
      }
      const res = await firebaseCreateUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!res.user.emailVerified) {
        await sendEmailVerification(res.user);
      }
      return MAIL_VERIFY.SEND_VERIFICATION;
    } catch (err) {
      throw new AppError(getErrorMessage(err));
    }
  };

  return {
    asyncVerifyUserWithEmailAndPassword,
    asyncSignInEmailWithVerify,
    asyncResendEmailVerify,
  };
};

export { useFirebaseAuth };
