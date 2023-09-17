import { RESTDataSource } from "@apollo/datasource-rest";
import { OrganizationModel } from "../models";

export class OrganizationAPI extends RESTDataSource {
  baseURL = "ToDo";

  getAllOrganizations() {
    return this.get<OrganizationModel[]>("organizations");
  }
}
