module.exports = {
    stripPrefix: 'build/',
    staticFileGlobs: [
        'build/index.html',
        'build/logo.png',
        'build/manifest.json',
        'build/static/**/!(*map*)'
    ],
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    swFilePath: 'build/service-worker.js'
};