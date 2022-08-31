import React, { FC } from 'react';
import { RouteInstance, RouteParams } from 'atomic-router';

import { useIsOpened } from './use-is-opened';

type Props<Params extends RouteParams> = {
  route: RouteInstance<Params> | RouteInstance<Params>[];
  view: FC;
};

export function Route<Params>({ route, view: Component }: Props<Params>) {
  const isOpened = useIsOpened(route);

  if (isOpened) {
    return <Component />;
  }

  return null;
}
