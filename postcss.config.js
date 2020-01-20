//  依赖 postcss-loader  autoprefixer  增加css兼容头部
module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                "> 1%",
                "last 3 versions",
                "iOS >= 8",
                "Android >= 4",
                "Chrome >= 40"
            ]
        })
    ]
}