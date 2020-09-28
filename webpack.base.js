const { join, resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const root = resolve("./");

module.exports = {
  stats: {
    modules: false,
    reasons: false,
    chunks: false,
    chunkModules: false,
    hash: false,
    children: false,
  },
  entry: join(root, "/src/index.tsx"),
  output: {
    path: join(root, "/dist"),
    filename: "static/[name].[hash:5].js",
    chunkFilename: "static/[name].[hash:5].js",
    publicPath: ""
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": join(root, "/src"),
      "@public": join(root, "/public")
    }
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: { cacheDirectory: true },
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
              esModule: true
            },
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: {
                auto: /\.mod\.(le|c)ss$/i,
                localIdentName: process.env.NODE_ENV === "development" ?
                  "[path][name]__[local]--[hash:base64:5]" :
                  "[hash:base64:8]",
              },
              importLoaders: 2,
              localsConvention: "camelCaseOnly",
              esModule: true
            }
          },
          require.resolve("postcss-loader"),
          {
            loader: require.resolve("less-loader"),
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|woff2?|eot|ttf|otf)$/,
        loader: require.resolve("file-loader"),
        options: {
          outputPath: "assets"
        }
      }
    ]
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: join(root, "/src/index.html"),
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: "static/[name].[hash:5].css",
      chunkFilename: "static/[name].[hash:5].css",
      ignoreOrder: true,
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
};
