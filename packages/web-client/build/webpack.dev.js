const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
    mode: 'development',
    // 映射源码与打包后的代码,快速定位问题
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        overlay: {
            errors: true
        },
        inline: true,
        hot: true,
        // 配置代理
        // proxy: {
        //     '/api/' : {
        //         target: 'http//localhost:3001/',
        //         ws: true,
        //         changeOrigin: true,
        //     }
        // }
    }
}

module.exports = merge(baseConfig, devConfig);