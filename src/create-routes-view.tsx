import { combine } from 'effector';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { RouteInstance } from 'atomic-router';
import { createRouteView } from './create-route-view';

export const createRoutesView = (config: {
  routes: { route: RouteInstance<any> | RouteInstance<any>[]; view: FC<any> }[];
  notFound?: FC<any>;
}) => {
  const views = config.routes.map(({ route, view }) =>
    createRouteView(route, view)
  );
  const $isSomeOpened = combine(
    ...config.routes
      .map(({ route }) => route)
      .flat()
      .map((route) => route.$isOpened),
    // @ts-expect-error
    (...isOpened) => isOpened.some(Boolean)
  );

  const NotFound = config.notFound;

  return () => {
    const isSomeOpened = useStore($isSomeOpened);

    if (!isSomeOpened && NotFound) {
      return <NotFound />;
    }
    return (
      <>
        {views.map((View, idx) => (
          <View key={idx} />
        ))}
      </>
    );
  };
};
