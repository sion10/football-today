module.exports = {
    stripPrefix: 'build/',
    staticFileGlobs: [
        'build/index.html',
        'build/logo.png',
        'build/manifest.json',
        'build/static/**/!(*map*)'
    ],
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    swFilePath: 'build/service-worker.js',
    directoryIndex: 'index.html',
    dynamicUrlToDependencies: {
        '/': [
            './build/index.ejs',
            './build/index.html'
        ]
    },
    navigateFallback: '/',
    runtimeCaching: [{
        urlPattern: /this\\.is\\.a\\.regex/,
        handler: 'networkFirst'
    }]
};  