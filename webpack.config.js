// @ts-check
const path = require("path");
const { BannerPlugin } = require("webpack");
require("dotenv").config();
module.exports = /** @type { import('webpack').Configuration } */ ({
  target: "node",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  mode: process.env.NODE_ENV || "production",
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".json"],
  }
});
