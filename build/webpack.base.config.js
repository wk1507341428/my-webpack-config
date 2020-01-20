const path = require('path')
// 拆分CSS 和 压缩css
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 查看 webpack 打包后所有组件与组件间的依赖关系，针对多余的包文件过大，
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackBaseConfig = {
    entry: path.resolve(__dirname,'../src/index.js'),    // 入口文件
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module:{
        rules:[
            // 看也看得出来这是配置css的loader
            { test: /\.css/, use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader'] },
        ]
    },
    plugins: [
        // 拆分css
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        })
    ],
    optimization:{
        // CommonsChunkPlugin在webpack4中已经被移除了，现在是使用optimization.splitChunks代替。
        splitChunks: {
            chunks: "all",  // 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
            minSize: 30000,     // 表示在压缩前的最小模块大小，默认为30000
            minChunks: 1,       // minChunks: 表示被引用次数，默认为1
            maxAsyncRequests: 5,    // 按需加载时候最大的并行请求数，默认为5
            maxInitialRequests: 5,      // 一个入口最大的并行请求数，默认为3
            automaticNameDelimiter: '~',    // 命名连接符
            name: true,      // 拆分出来块的名字，默认由块名和hash值自动生成
            // 默认的配置
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,     // 用于控制哪些模块被这个缓存组匹配到
                    priority: -10       // 缓存组打包的先后优先级
                },
                default: {
                    minChunks: 2, // 引用超过两次的模块 -> default
                    priority: -20,
                    reuseExistingChunk: true
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            },
        },
    }

}

// npm run dev --report
if(process.env.npm_config_report){
    webpackBaseConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports  = webpackBaseConfig