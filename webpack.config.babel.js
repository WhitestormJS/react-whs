import {resolve} from 'path';
import {
  DefinePlugin,
  LoaderOptionsPlugin,
  optimize,
} from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';

const {
  UglifyJsPlugin,
} = optimize;

const src = 'src';
const dest = 'build';
const clean = [dest];

function config({dev = false} = {}) {
  if (dev) {
    process.env.BABEL_ENV = 'development';
  }

  return {
    devtool: dev ? 'eval-source-map' : 'hidden-source-map',
    entry: `./${src}`,
    output: {
      path: resolve(__dirname, dest),
      filename: 'react-whs.js',
      library: 'WHSReact',
      libTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: resolve(__dirname, src),
          loader: 'babel-loader',
          options: {
            cacheDirectory: dev,
          },
        },
      ],
    },
    plugins: [
      new CleanPlugin(clean),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new UglifyJsPlugin({
        sourceMap: true,
        comments: false,
      }),
      new LoaderOptionsPlugin({
        minimize: !dev,
        debug: dev,
        options: {
          context: __dirname,
        },
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
}

export {
  config as default,
};
