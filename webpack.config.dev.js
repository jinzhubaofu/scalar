/**
 * @file webpack 开发时配置
 * @author leon<ludafa@kavout.com>
 */

const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const config = {
    entry: [
        'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
        './src/web/index'
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        }, {
            test: /\.png|\.svg$/,
            loaders: ['file-loader']
        }]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: 'http://localhost:9000/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: '#cheap-module-eval-source-map'
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
