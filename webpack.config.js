const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpackObfuscator = require('webpack-obfuscator');

module.exports = {
  mode: "production",
  entry: {
    main: './build/index.js',
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app-build.js'
  },
  externals: [nodeExternals()],
  plugins: [
    new webpackObfuscator ({
        rotateStringArray: true
    }, [path.join(path.join(__dirname, 'dist'), 'app-build.js')])
  ]
};
