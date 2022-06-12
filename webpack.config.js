// @ts-check
const path = require("path");
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
  resolve: {
    extensions: [".js", ".ts", ".json"],
  }
});
