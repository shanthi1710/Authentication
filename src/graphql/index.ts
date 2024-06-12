import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
        ${User.typeDef}
            type Query {
                ${User.queries}
                getContext: String
            }
            type Mutation {
                ${User.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        getContext: (_: any, __: any, context: any) => {
          console.log("context", context);
          return context.myName;
        },
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
