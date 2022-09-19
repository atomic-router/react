import { buildPath, RouteInstance, RouteParams, RouteQuery } from "atomic-router";
import { useRouter } from "./router-provider";

export function useLink<Params extends RouteParams>(
  route: RouteInstance<Params>,
  params: Params,
  query: RouteQuery = {}
): string {
  const router = useRouter();
  const routeObj = router.routes.find((routeObj) => routeObj.route === route);

  if (!routeObj) {
    throw new Error(`[useLink] Route not found. Maybe it is not passed into createHistoryRouter`);
  }

  return buildPath({
    pathCreator: routeObj.path,
    params: params,
    query: query,
  });
}
