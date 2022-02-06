import React, { FC } from 'react';
import { useStoreMap } from 'effector-react';
import { RouteInstance, RouteParams } from 'atomic-router';

import { useRouter } from './router-provider';

type Props<Params extends RouteParams> = {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: FC;
};

export function Route<Params>({ route, view: Component }: Props<Params>) {
  const router = useRouter();
  /* eslint-disable */
  const isOpened = useStoreMap({
    store: router.$activeRoutes,
    keys: [route],
    fn: (activeRoutes, [route]) => {
      return Array.isArray(route)
        ? route.some(route => activeRoutes.includes(route))
        : activeRoutes.includes(route);
    },
  });

  if (isOpened) {
    return <Component />;
  }

  return null;
}
