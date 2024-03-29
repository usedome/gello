import { TAppState } from "../../../contexts";
import {
  createResource,
  deleteResource,
  getResource,
  getResources,
  updateResource,
} from "./helpers";
import { TResourceAction } from "./types";

export * from "./types";

export const resourceReducer = (state: TAppState, action: TResourceAction) => {
  switch (action.type) {
    case "CREATE_RESOURCE":
      return createResource(state, action.payload);
    case "GET_RESOURCE":
      return getResource(state, action.payload);
    case "UPDATE_RESOURCE":
      return updateResource(state, action.payload);
    case "DELETE_RESOURCE":
      return deleteResource(state, action.payload);
    case "GET_RESOURCES":
      return getResources(state, action.payload);
    default:
      return state;
  }
};
