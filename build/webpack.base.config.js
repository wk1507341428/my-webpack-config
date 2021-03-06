const utils = require("./utils")
const path = require('path')
// 拆分CSS 和 压缩css
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 查看 webpack 打包后所有组件与组件间的依赖关系，针对多余的包文件过大，
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackBaseConfig = {
    entry: {
        home: path.resolve(__dirname,'../src/index.js'),    // 入口文件
        other: path.resolve(__dirname,'../src/index2.js'),    // 入口文件
    },
    output: {
        filename: utils.assetsPath("js/[name].[hash:8].js"),
        publicPath: "/", // 打包后的资源的访问路径前缀
        path: path.resolve(__dirname, '../dist')
    },
    module:{
        rules:[
            // 看也看得出来这是配置css的loader
            { test: /\.css/, use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader'] },
            // babel配置
            {
                test: /\.js$/,
                exclude: /node_modules/, //不需要对第三方模块进行转换，耗费性能
                loader: "babel-loader" ,
                include: [path.join(__dirname, '../src')]
            },
            // 图片配置
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: utils.assetsPath("imgs/[name].[hash:8].[ext]"),
                    publicPath: '/',
                }
            },
        ]
    },
    plugins: [
        // 拆分css
        new MiniCssExtractPlugin({
            filename: utils.assetsPath("css/[name].[hash:8].css"),
            chunkFilename: '[id].[hash].css',
        })
    ],
    optimization:{
        // CommonsChunkPlugin在webpack4中已经被移除了，现在是使用optimization.splitChunks代替。
        splitChunks: {
            chunks: "all",  // 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
            minSize: 10000,     // 表示在压缩前的最小模块大小，默认为30000
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
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -5,
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