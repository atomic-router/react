import type { RouteInstance, RouteParams } from "atomic-router";
import { type ComponentType } from "react";

import { useIsOpened } from "./use-is-opened";

export interface RouteViewConfig<Props, Params extends RouteParams> {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: ComponentType<Props>;
  otherwise?: ComponentType<Props>;
}

export function createRouteView<
  Props,
  Params extends RouteParams,
  Config extends {
    [key in keyof RouteViewConfig<Props, Params>]?: RouteViewConfig<Props, Params>[key];
  },
>(config: Config) {
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
}
