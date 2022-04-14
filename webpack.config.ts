import path from "path"
import { Configuration, EnvironmentPlugin, HotModuleReplacementPlugin } from "webpack"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import 'webpack-dev-server'


const config: Configuration = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    }
                }, {
                    loader: '@linaria/webpack-loader',
                    options: {
                        sourceMap: process.env.NODE_ENV !== 'production',
                    },
                }],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production',
                        },
                    },
                ],
            },
            {
                test: /\.(png|mp4|svg|jpe?g|tiff)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    experiments: {
        topLevelAwait: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "application.js",
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: process.env['CON_NAME']
        }),
        new MiniCssExtractPlugin({}),
        new HotModuleReplacementPlugin(),
        new EnvironmentPlugin(['NODE_ENV'])
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        historyApiFallback: { index: '/' },
    }
}

export default config
