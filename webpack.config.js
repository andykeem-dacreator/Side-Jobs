const Dotenv = require("dotenv-webpack");

module.exports = {
  devtool: "source-map",
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
