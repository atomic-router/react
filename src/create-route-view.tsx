import React from 'react';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { RouteInstance } from 'atomic-router';

export const createRouteView = <Props,>(
  route: RouteInstance<any> | RouteInstance<any>[],
  View: React.FC<Props>
) => {
  const $isOpened = Array.isArray(route)
    ? combine(combine(route.map((r) => r.$isOpened)), (isOpened) =>
        isOpened.includes(true)
      )
    : route.$isOpened;

  return (props: Props) => {
    const isOpened = useStore($isOpened);

    if (isOpened) {
      return <View {...props} />;
    }

    return null;
  };
};
