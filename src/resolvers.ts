import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    // get a list of organizations
    organizations: (_, __, { dataSources }) =>
      dataSources.organizationAPI.getAllOrganizations(),
    // get a single organization by ID
    organization: (_, { id }, { dataSources }) =>
      dataSources.organizationAPI.getOrganization(id),
  },
  Mutation: {
    // create a new organization
    createOrganization: (_, args, { dataSources }) =>
      dataSources.organizationAPI.createOrganization(args.input.data),
    // update an organization
    updateOrganization: (_, args, { dataSources }) =>
      dataSources.organizationAPI.updateOrganization(args.input),
  },
};
