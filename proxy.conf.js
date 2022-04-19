const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/region",
            "/customer",
            "/security/api",
        ],
        target: 'https://ventas-qa.mqconnect.com.do/api' ,
        secure: false,
        changeOrigin: true

    }
]

module.exports = PROXY_CONFIG;