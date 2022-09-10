import React from "react";
import { RouteInstance } from "atomic-router";

import { useIsOpened } from "./use-is-opened";

type RouteRecord<Props, Params> = {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: React.ComponentType<Props>;
};

export type RoutesViewConfig = {
  routes: RouteRecord<any, any>[];
  otherwise?: React.ComponentType<any>;
};

export const createRoutesView = <Config extends RoutesViewConfig>(config: Config) => {
  return (props: Omit<Config, keyof Config>) => {
    const mergedConfig = { ...config, ...props };
    const routes = mergedConfig.routes.map((routeRecord) => {
      const isOpened = useIsOpened(routeRecord.route);
      return { ...routeRecord, isOpened };
    });

    for (const route of routes) {
      if (route.isOpened) {
        const View = route.view;

        return <View />;
      }
    }

    if (mergedConfig.otherwise) {
      const Otherwise = mergedConfig.otherwise;

      return <Otherwise />;
    }

    return null;
  };
};
