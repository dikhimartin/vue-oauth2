const webpack = require('webpack')
const express = require('express')
const path = require('path')

module.exports = {
    outputDir: path.resolve(__dirname, process.env.BUILD_DIR || '../backend/public'),
    publicPath: process.env.BASE_URL ? process.env.BASE_URL : '',
    pages: {
        index: {
            entry: 'src/main.js',
            title: process.env.VUE_APP_NAME,
        }
    },
    devServer: {
        before: (app) => app.use('/admin-lte', express.static('node_modules/admin-lte'))
    },
    productionSourceMap: false,
    filenameHashing: false,
    runtimeCompiler: true,
    configureWebpack: config => {
        config.performance = config.performance || {}
        config.performance.hints = process.env.NODE_ENV == 'production' ? false : (config.performance.hints || 'warning')
        config.plugins.push(new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            jQuery: 'jquery',
            moment: 'moment',
            adminlte: 'admin-lte/dist/js/adminlte.js'
        }))
        config.externals = {
            ...config.externals,
            '$': 'jquery',
            'jQuery': 'jquery'
        }
        config.resolve.alias['@app'] = __dirname + '/src'
        config.resolve.alias['@components'] = __dirname + '/src/components'
        config.resolve.alias['@services'] = __dirname + '/src/services'
        config.resolve.alias['@pages'] = __dirname + '/src/pages'
        config.resolve.alias['@config'] = __dirname + '/src/config'
        config.resolve.alias['@assets'] = __dirname + '/src/assets'
        config.resolve.alias['vue-router$'] = 'vue-router/dist/vue-router.esm.js'
    }
}
