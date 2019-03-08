module.exports = {
  mode: process.env.NODE_ENV,
  entry: `./src/js/index.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'app.js',
    // libraryTarget: 'commonjs2'
  }
}
