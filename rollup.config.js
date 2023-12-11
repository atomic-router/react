import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";
import { minifyConfig } from "./build/minifications";

const extensions = [".ts", ".tsx", ".js"];

const resolverPlugin = resolve({ extensions });

const babelPlugin = babel({
  babelHelpers: "bundled",
  sourceMaps: true,
  extensions,
  exclude: /node_modules.*/,
});

const babelPluginScope = babel({
  babelHelpers: "bundled",
  sourceMaps: true,
  extensions,
  exclude: /node_modules.*/,
  overrides: [
    {
      test: () => true,
      plugins: [["effector/babel-plugin", { reactSsr: true, noDefaults: true }, "scoped"]],
    },
  ],
});

const createTerser = ({ inline }) =>
  terser(
    minifyConfig({
      beautify: Boolean(process.env.BUILD_PRETTY),
      inline,
    })
  );

const input = "src/index.tsx";
const external = [
  ...Object.keys(pkg.devDependencies),
  ...Object.keys(pkg.peerDependencies),
  "effector-react/scope",
  "react/jsx-runtime",
];

function createConfigs({ scope }) {
  return [
    {
      input,
      external,
      output: [
        {
          file: scope ? pkg.exports["./scope"].require : pkg.exports["."].require,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: scope ? pkg.exports["./scope"].import : pkg.exports["."].import,
          format: "es",
          sourcemap: true,
        },
      ],
      plugins: [
        scope ? babelPluginScope : babelPlugin,
        resolverPlugin,
        commonjs(),
        // createTerser({ inline: true }),
      ],
    },
  ];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input,
    external: ["effector", "atomic-router", "effector-react", "react"],
    output: {
      name: "atomicRouter",
      file: pkg.unpkg,
      format: "umd",
      sourcemap: true,
      globals: {
        effector: "effector",
        "effector-react": "effectorReact",
        "atomic-router": "atomicRouter",
        react: "React",
      },
    },
    plugins: [
      babelPlugin,
      resolverPlugin,
      commonjs(),
      // createTerser({ inline: false }),
    ],
  },
  ...createConfigs({ scope: false }),
  ...createConfigs({ scope: true }),
  {
    input,
    external,
    output: [
      {
        file: pkg.types,
        format: "es",
      },
      {
        file: pkg.types.replace(".d.ts", ".d.mts"),
        format: "es",
      },
    ],
    plugins: [resolverPlugin, dts()],
  },
];
