const PROX_CONFIG = [
  {
    content: ['/api'],
    target: 'http://localhost:8000/',
    secure: false, // https SSL
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {'^/api': ''}
  }
];

module.exports = PROX_CONFIG;
