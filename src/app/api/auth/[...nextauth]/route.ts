import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

if (!process.env.DISCORD_CLIENT_ID) {
  throw new Error("need discord client id for next-auth");
}

if (!process.env.DISCORD_CLIENT_SECRET) {
  throw new Error("need discord client secret for next-auth");
}

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: { scope: "identify guilds" },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.provider = token.provider;
      session.accessToken = token.accessToken;

      return session;
    },

    async jwt({ token, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
