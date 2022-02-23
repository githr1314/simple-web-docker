const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const prodConfig = {
    mode: 'production',
    // devtool: 'source-map',
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 2
                }
            }
        },
        minimizer: [
            new TerserPlugin({                              //  压缩js
                cache: true,
                parallel: require('os').cpus().length - 1,  // cpu内核数
                terserOptions: {
                    compress: {
                        warnings: true,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log']     // 移除console
                    }
                },
                sourceMap: false
            }),
            new OptimizeCssAssetsWebpackPlugin({        // 压缩css
                cssProcessor: require('cssnano'),       // 使用 cssnano 压缩器
                cssProcessorOptions: {
                    reduceIdents: false,
                    autoprefixer: false,
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css',
            chunkFilename: 'static/css/[name].[id].[contenthash].css'
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, '../dll/vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true,
            minify: {
                removeComments: true,                   // 移除注释
                collapseWhitespace: true,               // 移除空格
            }
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/dll.vendor.js'),
        }),
        new WebpackBuildNotifierPlugin({
            title: "simple-api-platform",
            suppressSuccess: true
        }),
        new BundleAnalyzerPlugin()                      // npm run build:test --report 分析代码结构和大小
    ]
}

module.exports = merge(baseConfig, prodConfig);