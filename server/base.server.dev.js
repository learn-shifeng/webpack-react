/**
 * @param {object} opts {devMode: 'dev' | 'prod'}
 * @param {function} callback app
 */

var serverStarter = function(opts, callback) {
	opts = opts || {}

	var webpack = require('webpack')
	var express = require('express')
	var webpackDevMiddleware = require('webpack-dev-middleware')
	var webpackHotMiddleware = require('webpack-hot-middleware')

	var config = require('../config/config.js')
	var webpackConfig = require('../config/webpack.base.config.js')

	// 热加载
	webpackConfig.entry.app.unshift('webpack-hot-middleware/client')// plugin中启用HMR, dev模式下需要加入这个入口实现热更新

	var app = express()

	// TODO bird 相关
	

	// TODO 得到 webpack 的config之后, 通过计算得到entry列表
	
	
	var compiler = webpack(webpackConfig)

	console.log('Running local server---------------------------------')
	callback && callback({
		app: app,
		devMode: 'dev'
	})

	console.log('Setting up webpack middleware------------------------')
	app.use(webpackDevMiddleware(compiler, {
	    publicPath: webpackConfig.output.publicPath,
	    noInfo: false,
	    quiet: false,
	    stats: {
	    	colors: true
	    }
	}))
	app.use(webpackHotMiddleware(compiler))

	app.use('/', express.static(config.srcPath))

	app.listen(config.devServerPort, function (err) {
		if (err) {
			console.log(err)
		}
		else {
			console.info('Server run on http://localhost:%s', config.devServerPort)
		}
	})
}

module.exports = serverStarter