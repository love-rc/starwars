//public/config.js 除了以下的配置外，这里面还可以有许多其他配置，例如publicPath的路径等
module.exports = {
    dev: {
        template: {
            title: '你好',
            header: false,
            footer: false
        }
    },
    build: {
        template:{
            title: '你好才怪',
            header: false,
            footer: false
        }
    }
}