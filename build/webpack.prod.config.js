const baseWebpackConfig = require("./webpack.base.config")
const webpackMerge = require("webpack-merge")
// 用来删除文件
const rimraf = require("rimraf")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require('path')
const webpack = require('webpack')
// 压缩css
const OptimizeCSSAssetsPlugin  = require("optimize-css-assets-webpack-plugin")
// This module requires a minimum of Node v6.9.0 and Webpack v4.0.0. 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 删除 dist 目录
rimraf.sync("dist")

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env')
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
console.log(env,"env",mode)

let webpackProdConfig = webpackMerge(baseWebpackConfig,{
    mode,
    plugins: [
        // 动态生成html
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'),
            filename: 'index.html',
            chunks: ['home','vendors~home','chunk-common']
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index2.html'),
            filename: 'index2.html',
            chunks: ['other','vendors~other','chunk-common']
        }),
        // 设置前端环境变量
        new webpack.DefinePlugin({
            'process.env': env
        })
    ],
    optimization:{
        // 这里需要注意的是本来mode=production 的时候，是会自己压缩js的，但是启用了这个配置，将不会自己压缩js了
        minimizer: [
            // new OptimizeCSSAssetsPlugin({
            //     cssProcessorOptions: { 
            //         discardComments: { removeAll: true } // 移除注释
            //     } 
            // }),
            // 压缩js
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,  //使用多进程并行运行来提高构建速度
            })
        ]
    }
})

module.exports = webpackProdConfig