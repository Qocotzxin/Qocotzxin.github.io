const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
};
