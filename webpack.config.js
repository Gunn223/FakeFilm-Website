const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js', // Gantilah dengan entri utama Anda
    Detail: './src/detail.js', // Gantilah dengan entri halaman detail Anda
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'), // Gantilah dengan direktori output yang diinginkan
    // err saat melakukan multiple bundling 
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Gantilah dengan berkas HTML Anda
      chunks: ['index'],
      filename: 'index.html', // Nama berkas output
    }),
    new HtmlWebpackPlugin({
      template: './Detail.html', // Gantilah dengan berkas HTML Anda
      chunks: ['Detail'],
      filename: 'Detail.html', // Nama berkas output
    }),
  ],
};
