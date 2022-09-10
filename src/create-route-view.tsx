import React from "react";
import { RouteInstance } from "atomic-router";

import { useIsOpened } from "./use-is-opened";

export type RouteViewConfig<Props, Params> = {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: React.ComponentType<Props>;
  otherwise?: React.ComponentType<Props>;
};

export const createRouteView = <
  Props,
  Params,
  Config extends {
    [key in keyof RouteViewConfig<Props, Params>]?: RouteViewConfig<Props, Params>[key];
  }
>(
  config: Config
) => {
  return (props: Props & Omit<RouteViewConfig<Props, Params>, keyof Config>) => {
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
};
