// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer, gql } from "apollo-server-micro";

import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/db";
// import resolvers from "../../lib/graphql/resolvers";
// import { typeDefs } from "../../lib/graphql/typeDefs";

const rootTypeDef: any = gql`
  type Query {
    hello: String
  }
`;

const apolloServer = new ApolloServer({
  typeDefs: rootTypeDef,
  resolvers: {
    Query: {
      hello: () => {
        return "Hello world!";
      },
    },
  },
});

const startServer = apolloServer.start();

export default (async function handler(req: any, res: any) {
  connectDB();
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});
