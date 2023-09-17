import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    organizations: (_, __, { dataSources }) =>
      dataSources.organizationAPI.getAllOrganizations(),
  },
};
