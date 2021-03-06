const path = require('path');

module.exports = {
  entry: './examples/index.ts',
  mode: 'none',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist', 'examples')
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
