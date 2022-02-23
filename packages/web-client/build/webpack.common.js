const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { APP_ENV, defineEnv } = require('../config/defineEnv');

// antd的自定义主题 暂时不用
// const theme = require('../theme.js');

module.exports = {
    // 入口文件
    entry: {
        app: path.join(__dirname, '../src/index.tsx')
    },
    // 出口文件
    output: {
        filename: './static/js/[name].[hash].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: ['babel-loader'],
                include: path.join(__dirname, '../src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    APP_ENV === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    APP_ENV === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnable: true,
                            // modifyVars: theme
                        },
                    }
                ],
                include: path.resolve('../node_modules'),
            },
            {
                test: /\.scss$/,
                use: [
                    // 开发环境使用style-loader
                    APP_ENV === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // 解决ts引入css-module找不到的问题
                    '@teamsupercell/typings-for-css-modules-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            }
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [path.join(__dirname, '../src/styles')]
                            }
                        },
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //1024 == 1kb,小于10kb时打包成base64编码的图片否则单独打包成图片
                            limit: 10240,
                            name: path.join('/static/img/[name].[hash:7].[ext]')
                        }
                    }
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: path.join('font/[name].[hash:7].[ext]')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        }),
        new webpack.DefinePlugin(defineEnv)
    ],
    // 自动解析确定的扩展
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve('../src'),
            '@components': path.resolve('../src/components'),
            '@img': path.resolve('../src/assets/img'),
        }
    }
}