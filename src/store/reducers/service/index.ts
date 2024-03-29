import { TAppState } from "../../../contexts";
import { deleteService, updateService } from "./helpers";
import { TServiceAction } from "./types";

export * from "./types";

export const serviceReducer = (state: TAppState, action: TServiceAction) => {
  switch (action.type) {
    case "CREATE_SERVICE":
      return {
        ...state,
        me: {
          ...state.me,
          default_service:
            (state?.me?.services ?? []).length > 0
              ? state?.me?.default_service
              : action.payload._id,
          services:
            state?.me?.services && state?.me?.services.length > 0
              ? [...state.me.services, action.payload]
              : [action.payload],
        },
      };
    case "UPDATE_SERVICE":
      return updateService(state, action.payload);
    case "DELETE_SERVICE":
      return deleteService(state, action.payload);
    default:
      return state;
  }
};
