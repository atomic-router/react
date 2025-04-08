module.exports = {
  plugins: [
    [
      "effector/babel-plugin",
      { factories: ["./src/create-route-view", "./src/create-routes-view"] },
    ],
    ["@babel/plugin-transform-class-properties", { loose: true }],
    "@babel/plugin-transform-object-rest-spread",
    "@babel/plugin-transform-optional-chaining",
    "@babel/plugin-transform-nullish-coalescing-operator",
  ],
  presets: [
    ["@babel/preset-env", { loose: true }],
    ["@babel/preset-typescript"],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
