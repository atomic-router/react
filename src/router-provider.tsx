import { createHistoryRouter } from "atomic-router";
import { createContext, ReactNode, useContext } from "react";

type Router = ReturnType<typeof createHistoryRouter>;

export const RouterContext: React.Context<Router | null> = createContext<Router | null>(null);

export function RouterProvider({ router, children }: { router: Router; children: ReactNode }) {
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

export function useRouter(): Router {
  const router = useContext(RouterContext);

  if (router === null) {
    throw new Error("useRouter must be used within a <RouterProvider>");
  }

  return router;
}
