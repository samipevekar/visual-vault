module.exports = {
    globDirectory: 'build/',
    globPatterns: [
      '**/*.{html,json,js,css,png,jpg}'
    ],
    swDest: 'build/service-worker.js',
    runtimeCaching: [{
      urlPattern: new RegExp('/'),
      handler: 'NetworkFirst'
    }]
  };
  
  