import type { RouteInstance, RouteParams } from "atomic-router";
import { type ComponentType } from "react";

import { useIsOpened } from "./use-is-opened";

export interface RouteProps<Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: ComponentType;
}

export function Route<Params extends RouteParams>({ route, view: Component }: RouteProps<Params>) {
  const isOpened = useIsOpened(route);

  if (isOpened) {
    return <Component />;
  }

  return null;
}
