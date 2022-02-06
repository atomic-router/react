import { createHistoryRouter } from 'atomic-router';
import React, { createContext, ReactNode, useContext } from 'react';

type Router = ReturnType<typeof createHistoryRouter>;

export const RouterContext = createContext<Router | null>(null);

export function RouterProvider({
  router,
  children,
}: {
  router: Router;
  children: ReactNode;
}) {
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext) as Router;
}
