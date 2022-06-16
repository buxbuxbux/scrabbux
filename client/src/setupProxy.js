/* eslint @typescript-eslint/no-var-requires: "off" */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware(
        '/api',
        {
            target: 'http://localhost:5111/',
            changeOrigin: true,
        })
    )
    app.use(
        createProxyMiddleware('/live', {
            target: 'ws://localhost:5111/',
            ws: true,
            changeOrigin: true,
        })
    )
}