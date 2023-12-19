import React from "react";
import { RouteInstance, RouteParams } from "atomic-router";

import { useIsOpened } from "./use-is-opened";

export interface RouteViewConfig<Props, Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: React.ComponentType<Props>;
  otherwise?: React.ComponentType<Props>;
}

export function createRouteView<
  Props,
  Params extends RouteParams
>(config: RouteViewConfig<Props, Params>) {
  return (props: Props & Omit<RouteViewConfig<Props, Params>, keyof typeof config>) => {
    const mergedConfig = { ...config, ...props } as RouteViewConfig<Props, Params>;
    const isOpened = useIsOpened(mergedConfig.route);

    if (isOpened) {
      const View = mergedConfig.view;

      return <View {...props} />;
    }

    if (mergedConfig.otherwise) {
      const Otherwise = mergedConfig.otherwise;

      return <Otherwise {...props} />;
    }

    return null;
  };
}
