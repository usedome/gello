import {
  TMultipleResourcePayload,
  TResourceAction,
  TSingleResourcePayload,
} from ".";
import { TResource } from "../..";
import { TAppState } from "../../../contexts";

export const getResources = (
  state: TAppState,
  payload: TResourceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const { hasMoreResources, resources } = payload as TMultipleResourcePayload;
  const idx = services.findIndex(
    (service) => service.uuid === (payload.service_uuid as string)
  );

  if (idx === -1) return state;
  const service = services[idx];
  service.resources = (parseResources(service?.resources) ?? []).concat(
    resources
  );
  service.hasMoreResources = hasMoreResources;
  services[idx] = service;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

const parseResources = (resources?: TResource[]) => {
  if (!resources) return [];

  if (resources.length === 1 && resources[0]?.isSingle) return [];

  return resources;
};

export const getResource = (
  state: TAppState,
  payload: TResourceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const { service_uuid, ...resource } = payload as TSingleResourcePayload;
  const idx = services.findIndex(
    (service) => service.uuid === (service_uuid as string)
  );

  if (idx === -1) return state;

  const service = services[idx];
  service.resources = service.resources as TResource[];
  service.resources = [
    ...(service.resources ?? []),
    { ...resource, isSingle: true },
  ];

  services[idx] = service;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

export const createResource = (
  state: TAppState,
  payload: TResourceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const { service_uuid, ...createdResource } =
    payload as TSingleResourcePayload;
  const idx = services.findIndex(
    (service) => service.uuid === (service_uuid as string)
  );

  if (idx === -1) return state;
  const service = services[idx];
  (service.resources ?? []).unshift(createdResource);

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

export const updateResource = (
  state: TAppState,
  payload: TResourceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const { service_uuid, ...updatedResource } =
    payload as TSingleResourcePayload;
  const idx = services.findIndex(
    (service) => service.uuid === (service_uuid as string)
  );

  if (idx === -1) return state;
  const service = services[idx];
  const resources = service?.resources as TResource[];
  const resourceIdx = resources.findIndex(
    (resource) => resource._id === updatedResource._id
  );

  if (resourceIdx === -1) return state;

  resources[resourceIdx] = updatedResource;
  service.resources = resources;
  services[idx] = service;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

export const deleteResource = (
  state: TAppState,
  payload: TResourceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const { service_uuid, ...deletedResource } =
    payload as TSingleResourcePayload;

  const idx = services.findIndex((service) => service.uuid === service_uuid);

  if (idx === -1) return state;

  let resources = services[idx]?.resources as TResource[];
  resources = resources.filter(
    (resource) => resource.uuid !== deletedResource.uuid
  );
  services[idx].resources = resources;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};
