const baseWebpackConfig = require("./webpack.base.config")
const webpackMerge = require("webpack-merge")
const rimraf = require("rimraf")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require('path')
const webpack = require('webpack')

// 删除 dist 目录
rimraf.sync("dist")

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env')
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
console.log(env,"env")

module.exports = webpackMerge(baseWebpackConfig,{
    mode,
    plugins: [
        // 动态生成html
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env': env
        }),
    ],
})