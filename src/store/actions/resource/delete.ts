import { AxiosError } from "axios";
import { useContext } from "react";
import { TResource, TService } from "../..";
import { AppContext } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";

export const useDeleteResource = () => {
  const [{ me }, dispatch] = useContext(AppContext);
  const errorHandler = useErrorHandler();

  return async (resource_uuid: string, onClose?: () => void) => {
    const service = ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    );
    const resource = service?.resources?.find(
      (resource) => resource.uuid === resource_uuid
    ) as TResource;
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "delete.resource" });

    try {
      const url = `/services/${service?.uuid}/resources/${resource_uuid}`;
      await client().delete(url);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Resource deleted successfully" },
      });
      dispatch({
        type: "DELETE_RESOURCE",
        payload: { ...resource, service_uuid: service?.uuid as string },
      });
      onClose?.();
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
