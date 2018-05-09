const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: `${__dirname}/dist`,
        port: 9e3,
        hot: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {}
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader'
        }]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [new HtmlWebpackPlugin({template: 'src/index.html'})]
};