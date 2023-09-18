import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { OrganizationAPI } from "./datasource/organization_api";

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const port = 4001;
  const subgraphName = "organizations";

  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        const { cache } = server;
        return {
          dataSources: {
            organizationAPI: new OrganizationAPI({ cache }),
          },
        };
      },
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
