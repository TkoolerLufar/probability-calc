module.exports = {};

if (process.env.NODE_ENV === 'production') {
  Object.assign(module.exports, {
    "publicPath":"https://tkoolerlufar.github.io/probability-calc/",
    "outputDir": "docs"
  });
}
