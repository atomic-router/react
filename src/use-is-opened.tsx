import { useStore } from "effector-react";
import { RouteInstance } from "atomic-router";

export const useIsOpened = (route: RouteInstance<any> | RouteInstance<any>[]) => {
  return Array.isArray(route)
    ? route.map((route) => useStore(route.$isOpened)).some(Boolean)
    : useStore(route.$isOpened);
};
