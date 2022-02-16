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

### `RouterProvider` - provides router instance

Wrap your app into this:

```tsx
import { createHistoryRouter } from 'atomic-router'
import { RouterProvider, Route } from 'atomic-router-react'

import { HomePage } from './routes'

const router = createHistoryRouter({ routes });

const App = () => {
  return (
    <RouterProvider router={router}>
      <Route route={homeRoute} view={HomePage} />
    </RouterProvider>
  );
};
```

### `Link` - render a link

Simple usage:

```tsx
import { createRoute } from 'atomic-router'
import { Link } from 'atomic-router-react'

const homeRoute = createRoute<{postId:string}>()
const postRoute = createRoute<{postId:string}>()

<Link to={homeRoute}>Route link</Link>
<Link to={postRoute} params={{ postId:1 }}>Route link with params</Link>
<Link to="https://example.com">External link</Link>
```

All params:

```tsx
import { Link } from 'atomic-router-react'

<Link
  to={route}
  params={{ foo: 'bar' }}
  query={{ bar: 'baz' }}
  activeClassName="font-semibold text-red-400"
  inactiveClassName="opacity-80"
/>
```

### `Route` - render route

```tsx
import { Route } from 'atomic-router-react'

<Route route={homeRoute} view={HomePage} />
```
