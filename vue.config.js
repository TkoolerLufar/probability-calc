// デフォルトの設定
var it = {
  "pwa":{
    // 略称。アイコン名に使う。全角5字くらいまで
    "name":"あれの確率",
    "manifestOptions":{
      // 正式名称。起動時のスプラッシュに使う
      "name":"例のあれがああなる確率計算機",
      // 日本語しか提供しません
      "lang":"ja"
    },
    // iOS に昔から提供されてる「ホーム画面に追加」との互換性。
    // 懸念事項読んだところ single-view app なら問題なさそうなのでON
    "appleMobileWebAppCapable":"yes",
    // Service Worker を部分的にカスタマイズしたい場合は InjectManifest
    // このプロジェクトでは GenerateSW して全自動で作ってもらいます。
    "workboxPluginMode":"GenerateSW"
  },
  "chainWebpack": (config) => {
    config.resolve.alias.set('vue', '@vue/compat');
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        "compilerOptions": {
          "compatConfig": {
            "MODE": 2
          }
        }
      }));
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
  it.devServer = {
    // PWA テストのため自分にしかホスティングしない
    "host":"localhost"
  }
}

module.exports = it;
