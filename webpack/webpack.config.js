const path = require("path");
const webpack = require("webpack");

const config = (env, argv) => {
  console.log("argv.mode:", argv.mode);
  const backendUrl =
    argv.mode === "production"
      ? "https://notes2023.fly.dev/api/notes"
      : "http://localhost:3001/notes";
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
    },
    devServer: {
      static: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          // exclude: /node_modules/,
          loader: "babel-loader",
          options: { presets: ["@babel/preset-react", "@babel/preset-env"] },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({ BACKEND_URL: JSON.stringify(backendUrl) }),
    ],
  };
};

module.exports = config;
