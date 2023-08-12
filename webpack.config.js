const path = require('path');

module.exports = {
  entry: './src/main.js',
  mode: 'production',
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, './'),
  },
};


// npx webpack --config webpack.config.js
