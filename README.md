# Atomic-router-react

React bindings for [atomic-router](https://github.com/kelin2025/atomic-router)

[Example on StackBlitz](https://stackblitz.com/edit/react-fglswy)

## Installation

Install core and react bindings:

```bash
npm i atomic-router atomic-router-react
```

Don't forget about peer dependencies, if you haven't installed them yet:

```bash
npm i effector effector-react react
```

## Usage

### Component API

#### `RouterProvider` - provides router instance

Wrap your app into this:

```tsx
import { createHistoryRouter } from "atomic-router";
import { RouterProvider, Route } from "atomic-router-react";

import { HomePage } from "./routes";

const router = createHistoryRouter({ routes });

const App = () => {
  return (
    <RouterProvider router={router}>
      <Route route={homeRoute} view={HomePage} />
    </RouterProvider>
  );
};
```

#### `Link` - render a link

Simple usage:

```tsx
import { createRoute } from 'atomic-router'
import { Link } from 'atomic-router-react'

const homeRoute = createRoute()
const postRoute = createRoute<{postId:string}>()

<Link to={homeRoute}>Route link</Link>
<Link to={postRoute} params={{ postId:1 }}>Route link with params</Link>
<Link to="https://example.com">External link</Link>
```

All params:

```tsx
import { Link } from "atomic-router-react";

<Link
  to={route}
  params={{ foo: "bar" }}
  query={{ bar: "baz" }}
  activeClassName="font-semibold text-red-400"
  inactiveClassName="opacity-80"
/>;
```

#### `Route` - render route

```tsx
import { Route } from "atomic-router-react";

<Route route={homeRoute} view={HomePage} />;
```

### Declarative API



#### `createRouteView` - render view if route is opened

```tsx
import { createRoute } from "atomic-router";
import { createRouteView } from "atomic-router-react";
import { restore, createEffect } from "effector";

const homeRoute = createRoute();

const getPostsFx = createEffect(/* ... */);

const $posts = restore(getPostsFx, []);

const postsLoadedRoute = chainRoute({
  route,
  beforeOpen: getPostsFx,
});

const PostsList = createRouteView({
  route: postsLoadedRoute,
  view: () => {
    const posts = useStore($posts);

    return; /* ... */
  },
  otherwise: () => {
    return <div>Loading...</div>;
  },
});
```

You can also set only a part of `createRouteView` config on create and pass the rest of it via props.

#### `createRoutesView` - render routes

```tsx
import { createRouteView, RouterProvider } from "atomic-router-react";

// { route: RouteInstance<...>, view: FC<...> }
import * as Home from "@/pages/home";
import * as Post from "@/pages/post";

import { router } from "@/app/routing";

const RoutesView = createRoutesView({
  routes: [
    { route: Home.route, view: Home.Page },
    { route: Post.route, view: Post.Page },
  ],
  otherwise: () => {
    return <div>Page not found!</div>;
  },
});

const App = () => {
  return (
    <RouterProvider router={router}>
      <RoutesView />
    </RouterProvider>
  );
};
```

Like in `createRouteView`, you can set only a part of `createRoutesView` config on create and pass the rest of it via props:

```tsx
// Set specific otherwise view
const RoutesView = createRoutesView({
  otherwise: SpecificNotFound,
});

// Pass the routes as a prop
<RoutesView routes={routes} />;
```
