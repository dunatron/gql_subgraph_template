import { OrganizationAPI } from "./datasource/organization_api";

export type DataSourceContext = {
  dataSources: {
    organizationAPI: OrganizationAPI;
  };
};
