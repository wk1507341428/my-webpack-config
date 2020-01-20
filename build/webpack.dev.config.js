const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require('path')

module.exports = webpackMerge(baseWebpackConfig,{
    // 指定构建环境  
    mode:"development",
    devServer:{
        port: "8089",
        hotOnly: false
    },
    plugins:[
        // 动态生成html
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        })
    ]
});