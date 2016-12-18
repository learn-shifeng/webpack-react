var npath = require('path')
var _ = require('lodash')
// var utils = require('./utils')

var config = {
    root: npath.normalize(__dirname + '/../'),

    devServerPort: 4448,
    preProdServerPort: 4449,

    apiContext: '/api'
}

_.extend(config, {
    buildPath: npath.resolve(config.root + '/build/'),
    srcPath: npath.resolve(config.root + '/src/')
})

_.extend(config, {
    srcAssetPath: npath.resolve(config.srcPath + '/asset/')
})

module.exports = config