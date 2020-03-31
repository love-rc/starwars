//webpack.config.js
//引入插件
var path = require('path');
const isDev = process.env.NODE_ENV === 'development';
console.log(isDev,'sss')
const config = require('./public/config.js')[isDev ? 'dev' : 'build'];
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist2'),//必须是绝对路径
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    mode: isDev ? "development" : 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除node_modules 目录
            },
            {
                test: /\.(le|c)ss$/,
                use: ['style-loader','css-loader',{
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')({
                                    "overrideBrowserslist": [
                                        ">0.25%",
                                        "not dead"
                                    ]
                                })
                            ]
                        }
                    }
                },'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10140,
                        esModule: false,
                        name: '[name]_[hash:6].[ext]'
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false,//是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            config: config.template,
            hash: true //是否加上hash,默认false
        })
    ],
    devServer: {
        port: '3001',// 配置端口
        quiet: false,//
        inline: true,
        stats: 'errors-only',
        overlay: true,//默认false，当初错时，会浏览器全屏输出错误
        clientLogLevel: 'silent',//日志等级
        compress: true //是否启用gzip
    },
    devtool: 'cheap-module-eva-source-map',//开发 环境下定位源码
}