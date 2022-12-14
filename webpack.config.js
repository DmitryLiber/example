const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  autoprefixer = require('autoprefixer'),
  CssoWebpackPlugin = require('csso-webpack-plugin').default,
  CopyPlugin = require('copy-webpack-plugin'),
  empty = () => {}

let mode = 'development',
  pages = fs
    .readdirSync(path.join(__dirname, './src/pages'))
    .filter((fileName) => fileName.endsWith('.pug'))

if (process.env.NODE_ENV === 'production') mode = 'production'

module.exports = {
  mode,
  target: 'web',
  stats: { errorDetails: true },
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'assets/js/index.[contenthash:7].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/assets/scss'),
      fonts: path.resolve(__dirname, 'src/assets/fonts'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },
  plugins: [
    mode === 'production' ? new CleanWebpackPlugin() : empty,
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `./src/pages/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
          minify: false,
        })
    ),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.[contenthash:7].css',
      chunkFilename: '[id].css',
    }),
    autoprefixer,
    new CssoWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss|css$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
    ],
  },
}
