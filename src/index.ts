import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { OrganizationAPI } from "./datasource/organization_api";

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          organizationAPI: new OrganizationAPI({ cache }),
        },
      };
    },
  });
  console.log(`
    🚀  Organizations subgraph is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
