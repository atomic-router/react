import type { HistoryRouter } from "atomic-router";
import React, { type ReactNode, createContext, useContext } from "react";

export const RouterContext = createContext<HistoryRouter | null>(null);

export interface RouterProviderProps {
  router: HistoryRouter;
  children: ReactNode;
}

export function RouterProvider({ router, children }: RouterProviderProps) {
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

export function useRouter(): HistoryRouter {
  const router = useContext(RouterContext);

  if (!router) {
    throw new Error("[Atomic-Router-React] useRouter must be used within a RouterProvider");
  }

  return router;
}
