import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const GRAPHQL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

const link = createHttpLink({
  uri: GRAPHQL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
