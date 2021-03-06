const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileListPlugin = require("./FileListPlugin");
const glob = require("glob");

//__dirname + "/**/*.js"
const getFiles = filePattern => {
  const files = glob.sync(filePattern);
  const entries = files.reduce((acc, f) => {
    acc[path.parse(f).name] = f;
    return acc;
  }, {});

  return entries;
};

const getConfig = options => {
  const config = {
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new FileListPlugin({ options: true }),
      new MiniCssExtractPlugin({
        filename: "css/styles.css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        },
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, "src")],
          loader: "babel-loader",
          options: {
            plugins: ["syntax-dynamic-import"],
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false
                }
              ]
            ]
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/
          }
        },
        chunks: "async",
        minChunks: 1,
        minSize: 30000,
        name: true
      }
    },
    devServer: {
      open: true,
      port: 9000
    }
  };

  return merge(config, options);
};

module.exports = {
  getConfig,
  getFiles,
  merge
};
