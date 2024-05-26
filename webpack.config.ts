import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = "development" | "production";

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    mode: env.mode ?? "development",
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack 5",
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new webpack.ProgressPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
      port: env.port ?? 3000,
      open: true,
    } 
  };
  return config;
};
