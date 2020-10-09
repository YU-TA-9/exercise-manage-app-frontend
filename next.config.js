const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    HOST_URL: isProd ? 'http://18.183.184.39' : 'http://localhost:8080',
    TOKEN: '-VqMj-rRSseUYlU5Rl_aQA',
  },
  webpack(config, options) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};
