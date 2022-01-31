const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stats: {
    chunks: true,
    chunkModules: true,
    colors: true,
  },

  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, './src/index.js')],
  },

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'static/js/[name].[fullhash].js',
    chunkFilename: 'static/js/[name].[fullhash].js',
  },

  devServer: {
    hot: true,
    port: 3000,
    open: true,
    watchContentBase: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
      chunksSortMode: 'auto',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[fullhash].css',
      chunkFilename: 'static/css/[name].[fullhash].css',
    }),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
    },
  },

  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      store: path.resolve(__dirname, './src/store'),
      utils: path.resolve(__dirname, './src/utils'),
      pages: path.resolve(__dirname, './src/pages'),
      services: path.resolve(__dirname, './src/services'),
      components: path.resolve(__dirname, './src/components'),
    },
  },
};
