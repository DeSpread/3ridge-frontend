import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

console.log(
  "NEXT_PUBLIC_APOLLO_CLIENT_URI",
  process.env["NEXT_PUBLIC_APOLLO_CLIENT_URI"]
);

const httpLink = createHttpLink({
  uri: process.env["NEXT_PUBLIC_APOLLO_CLIENT_URI"],
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export { client };
