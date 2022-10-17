import { createRoot } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import { createBrowserHistory } from "history";
import { createRoute, createHistoryRouter } from "atomic-router";

import { Link, createRoutesView, RouterProvider } from "../src";

const foo = createRoute();
const bar = createRoute();
const barBaz = createRoute();

const Foo = ({ children }) => {
  return (
    <div>
      <h1>Foo layout</h1>
      {children}
    </div>
  );
};

const Bar = ({ children }) => {
  useEffect(() => {
    console.log("Rendererd");
  }, []);

  return (
    <div>
      <h1>Bar layout</h1>
      {children}
    </div>
  );
};

const routes = [
  { path: "/", route: foo, layout: Foo },
  { path: "/bar", route: bar, layout: Bar },
  { path: "/bar-baz", route: barBaz, layout: Bar },
];

const router = createHistoryRouter({
  routes,
});

router.setHistory(createBrowserHistory());

const Routes = createRoutesView({
  routes: [
    { route: foo, view: () => <div>Foo</div>, layout: Foo },
    { route: bar, view: () => <div>Bar</div>, layout: Bar },
    { route: barBaz, view: () => <div>BarBaz</div>, layout: Bar },
  ],
});

const TestLink = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    console.log("ref", ref.current);
  });

  return <Link ref={ref} {...props} />;
};

const App = () => {
  return (
    <RouterProvider router={router}>
      <div>
        <nav>
          <TestLink to={foo}>Foo</TestLink>
          <Link to={bar}>Bar</Link>
          <Link to={barBaz}>BarBaz</Link>
        </nav>
        <Routes />
      </div>
    </RouterProvider>
  );
};

const root = createRoot(document.getElementById("app")!);

root.render(<App />);
