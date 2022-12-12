import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env["NEXT_PUBLIC_APOLLO_CLIENT_URI"],
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export { client };
