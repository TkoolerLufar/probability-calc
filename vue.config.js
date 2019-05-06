var it = {};

if (process.env.NODE_ENV === 'production') {
  Object.assign(it, {
    "publicPath":"https://tkoolerlufar.github.io/probability-calc/",
    "outputDir": "docs"
  });
}

module.exports = it;
