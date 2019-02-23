const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [['@quickbaseoss/babel-plugin-styled-components-css-namespace', { ecuyle: 'reservation' }], 'babel-plugin-styled-components'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
