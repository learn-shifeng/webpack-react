var path = require('path')
var webpack = require('webpack')

var config = require('./config.js')

module.exports = {
    // entry: {app: config.srcAssetPath + "/app.js"},
    entry: {
        app: [config.srcAssetPath + "/app.js"]
    },
    output: {
        path: config.buildPath,
        publicPath: "/build/",              // npm run dev时文件在内存中的目录
        filename: "[name].bundle.js"        // 多入口时, entry的key值会替换掉[name]
        // filename: "app.bundle.js"        // 单个入口时可直接指定
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/, // 加入react-hot后, 把这个加上, 不然会报错...
            loaders: [ 
                'react-hot', // fixed: [HMR] The following modules couldn't be hot updated: (Full reload needed)
                'babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-2']})
            ]
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.less$/,
            // loader: 'style-loader!css-loader!less-loader',// use ! to chain loaders
            loaders: ['style', 'css', 'less'],
            include: config.srcPath
        }, {
            test: /\.(jpeg|jpg|png|gif)$/,
            loader: 'url?limit=10240' //图片文件使用 url-loader 来处理，小于40000字节的直接转为base64
        }]
    },
    resolve: {
        // root: [
        //     SRC_PATH + '/asset/'
        // ],
        extensions: ['', '.js', '.json'], //自动扩展(补全)文件后缀名，意味着我们require模块可以省略不写后缀名
        // fallback: [path.join(__dirname, '../node_modules')], // 找不到相关modules，去哪个文件夹下找modules
        alias: {
            // src: path.resolve(__dirname, '/src'),
            // asset: path.resolve(__dirname, '/src/asset'),
            global: path.resolve(__dirname, '../src/asset/global'),
            common: path.resolve(__dirname, '../src/asset/common')
        }
    },
    devServer: {
        // hot: true, //热加载模式
        // inline: true //inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中)
    },
    // devtool: '#source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.NoErrorsPlugin(), //用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        // new webpack.optimize.CommonsChunkPlugin('common.js'),// (多页时)分析模块的共用代码, 单独打一个包出来
        new webpack.HotModuleReplacementPlugin() //全局开启代码热替换
    ]
};