import {Configuration} from "webpack";
import {resolve} from "path";
import TerserPlugin from "terser-webpack-plugin";

const config: Configuration = {
  mode: "production",
  entry: {
    bundle: "./index.ts",
  },
  target: "node",
  // externals: [nodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolves these file extensions.
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Remove todos os comentários.
          },
        },
        extractComments: false, // Desativa a geração do arquivo LICENSE.txt.
      }),
    ],
  },
  output: {
    chunkFormat: 'commonjs',
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
  devtool: false,
};
export default config;