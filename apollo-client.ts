import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://movie-app-api-huxd.onrender.com/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
