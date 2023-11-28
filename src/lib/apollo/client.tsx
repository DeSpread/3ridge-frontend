import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

console.log(
  "NEXT_PUBLIC_APOLLO_CLIENT_URI",
  process.env["NEXT_PUBLIC_APOLLO_CLIENT_URI"],
);

const httpLink = createHttpLink({
  uri: process.env["NEXT_PUBLIC_APOLLO_CLIENT_URI"],
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export { client };
