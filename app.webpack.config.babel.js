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
  entry: ['react-hot-loader/patch', './app/index.js'],
  target: 'web',
  output: {
    path: path.join(__dirname, './app/build/'),
    filename: 'bundle.js',
    publicPath: '/build/'
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
  : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: './app/',
    publicPath: '/build/',
    hot: true
  }
}
