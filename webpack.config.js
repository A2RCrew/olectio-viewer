// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = [
  {
    entry: './dist/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'web/js'),
      filename: 'olectio-viewer.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
  },
  {
    entry: './dist/testApi/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'web/js'),
      filename: 'olectio-test-api.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
  }
];