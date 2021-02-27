module.exports = {
    devServer: {
        proxy: {
            '^/JSON_API': {
                target: 'http://localhost:5001',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/JSON_API': '/' }
            },
        }
    }
}