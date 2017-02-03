import path from 'path';
import webpack from 'webpack';

process.env.BABEL_ENV = 'browser';

const isProduction = process.env.NODE_ENV === 'production';

console.log(
  isProduction
  ? 'Production mode'
  : 'Development mode'
);

export default {
  devtool: isProduction ? false : 'source-map',
  entry: './app/index.js',
  target: 'web',
  output: {
    path: path.join(__dirname, './app/build/'),
    filename: 'bundle.js',
  },
  externals: {
    whs: 'WHS',
    three: 'THREE'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: isProduction
  ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      minimize: true
    }),
  ]
  : [],
  devServer: {
    contentBase: './app/',
    publicPath: '/build/'
  }
}
