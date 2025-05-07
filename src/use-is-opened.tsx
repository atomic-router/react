import type { RouteInstance } from "atomic-router";
import { useUnit } from "effector-react";

export function useIsOpened(route: RouteInstance<any> | RouteInstance<any>[]) {
  return Array.isArray(route)
    ? useUnit(route.map((route) => route.$isOpened)).some(Boolean)
    : useUnit(route.$isOpened);
}
