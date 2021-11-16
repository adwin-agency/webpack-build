const path = require('path');
require("@babel/polyfill");
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const TerserWpPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
            usedExports: false,
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCss,
            new TerserWpPlugin
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'app/src'),
    mode: 'development',
    entry: {
        main: ["@babel/polyfill", './index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'app/dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'app/src'),
            '@': path.resolve(__dirname, 'app/src'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        open: true,
        client: {
            overlay: true,
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },

            {
                test: /\.(png|jpg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        exclude: path.resolve(__dirname, 'app/src/img/bg/'),
                        use: 'svg-inline-loader'
                    },
                    {
                        include: path.resolve(__dirname, 'app/src/img/bg/'),
                        type: 'asset/resource'
                    },
                ]
            },

        ],
    }
}