import { TApiKeyAction } from ".";
import { TAppState } from "../../../contexts";

export const createApiKey = (
  state: TAppState,
  payload: TApiKeyAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const idx = services.findIndex(
    (service) => service._id.toString() === (me?.default_service as string)
  );

  if (idx === -1) return state;

  const defaultService = services[idx];
  defaultService.auth.api_keys = [
    ...(defaultService.auth.api_keys ?? []),
    payload,
  ];
  services[idx] = defaultService;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

export const deleteApiKey = (
  state: TAppState,
  payload: TApiKeyAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const idx = services.findIndex(
    (service) => service._id.toString() === (me?.default_service as string)
  );

  if (idx === -1) return state;

  const defaultService = services[idx];
  defaultService.auth.api_keys = (defaultService.auth.api_keys ?? []).filter(
    (key) => key.uuid !== payload.uuid
  );
  services[idx] = defaultService;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};
