import { RESTDataSource } from "@apollo/datasource-rest";
import {
  OrganizationModel,
  OrganizationCreateModel,
  OrganizationUpdateModel,
  OrganizationUpdateArgsModel,
} from "../models";

import { organizations } from "./organizations_data";

let organizationData = organizations;

export class OrganizationAPI extends RESTDataSource {
  baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

  getAllOrganizations(): OrganizationModel[] {
    return organizationData;
    // return this.get<OrganizationModel[]>("organizations");
  }

  getOrganization(id: string): OrganizationModel {
    return organizationData.find((org) => org.id === id);
  }

  createOrganization(organization: OrganizationCreateModel) {
    const newOrganization = {
      id: `org-${organizations.length + 1}`,
      ...organization,
    };
    organizationData = [...organizationData, newOrganization];
    return newOrganization;
  }

  updateOrganization(args: OrganizationUpdateArgsModel) {
    const { where, data } = args;
    const orgIndex = organizationData.findIndex((org) => org.id === where.id);

    if (orgIndex === -1) {
      // Organization not found, handle the error or return null/undefined
      return null;
    }

    const updatedOrg = { ...organizationData[orgIndex], ...data };

    // Update the organizationData array with the updated organization
    organizationData = [
      ...organizationData.slice(0, orgIndex),
      updatedOrg,
      ...organizationData.slice(orgIndex + 1),
    ];

    return updatedOrg;
  }
}
