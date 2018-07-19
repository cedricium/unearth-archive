const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const fileExtensions = ['png', 'svg'];

module.exports = {
  entry: {
    'public/scripts/index': path.resolve(__dirname, 'src', 'public', 'scripts', 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src'), ignore: [ '.sass-cache/**/*', '*.scss', '*.css.map' ] }
    ]),
    new WriteFilePlugin()
  ]
};
