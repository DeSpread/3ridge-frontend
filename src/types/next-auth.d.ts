import { BuiltInProviderType, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    provider: BuiltInProviderType;
    expires: ISODateString;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    provider: BuiltInProviderType;
    accessToken: string;
  }
}
