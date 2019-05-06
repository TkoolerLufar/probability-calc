// デフォルトの設定
var it = {
  "pwa":{
    // 略称。アイコン名に使う。全角5字くらいまで
    "name":"あれの確率",
    "manifestOptions":{
      // 正式名称。起動時のスプラッシュに使う
      "name":"例のあれがああなる確率計算機"
    }
  }
};

// 環境で出し分ける設定 //
if (process.env.NODE_ENV === 'production') {
  Object.assign(it, {
    // ルート URI
    "publicPath":"https://tkoolerlufar.github.io/probability-calc/",
    // ビルド結果の出力先。本番では GitHub Pages に合わせる
    "outputDir": "docs"
  });
}
else {
  // 本番とその他を区別しやすく
  it.pwa.name = "[dev] " + it.pwa.name;
}

module.exports = it;
