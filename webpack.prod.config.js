const config = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    ...config,
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js?x$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: ['file-loader'],
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        ...config.plugins,
        new MiniCssExtractPlugin(),
        new CssMinimizerPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
}