const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../server/public/js'),
    filename: 'boo.[name].js',
  },
  stats: {
    colors: true,
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'cheap-source-map'
      : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.m?js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
