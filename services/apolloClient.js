import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const GRAPHQL = "https://wpwpengineatla.wpengine.com/graphql";

const link = createHttpLink({
  uri: GRAPHQL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
