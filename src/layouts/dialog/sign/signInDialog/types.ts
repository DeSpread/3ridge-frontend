export type SignInType = "email" | "wallet";

export interface EmailWithAuthCode {
  email: string;
  code: string;
}
