// webpack v4
const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    plugins: [
      new CleanWebpackPlugin('dist', {}),
      new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: 'index.html',
            template: './src/index.html'
        }),
//    new ExtractTextPlugin({filename: 'style.[hash].css', disable: false, allChunks: true}
//    ),
    new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),

    new WebpackMd5Hash(),
    new SpriteLoaderPlugin({
            plainSprite: true
        })
  ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
      },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
            {
                test: /\.(jpg|png|svg|gif|otf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: './images'
                    }
                }
        },
            {
                test: /icons\/.*\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: './public/dist/img/icons.svg',
                    runtimeCompat: true
                }
    }

//      {
//        test: /\.scss$/,
//        use: ExtractTextPlugin.extract(
//          {
//            fallback: 'style-loader',
//            use: ['css-loader', 'sass-loader']
//          })
//      }
    ]
    }
};