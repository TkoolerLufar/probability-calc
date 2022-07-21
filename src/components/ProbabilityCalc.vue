<template>
  <v-container>
    <v-layout
      text-xs-start
      wrap
    >
      <v-flex xs7 sm4>
        <div class="font-weight-regular">
          1回あたり
        </div>
      </v-flex>

      <v-flex xs5 sm8>
        <v-text-field
          v-model="probabilityPerTry"
          type="number"
          min="0"
          max="100"
          step="0.5"
          hint="成功率"
          suffix="%"
        />
      </v-flex>

      <v-flex xs7 sm4>
        <div class="font-weight-regular">
          の確率で成功する試行を
        </div>
      </v-flex>

      <v-flex xs5 sm8>
        <v-text-field
          v-model="numTries"
          type="number"
          min="1"
          v-bind:max="Number.MAX_SAFE_INTEGER"
          step="1"
          hint="試行回数"
          suffix="回"
        />
      </v-flex>

      <v-flex xs7 sm4>
        <div class="font-weight-regular">
          繰り返して、少なくとも
        </div>
      </v-flex>

      <v-flex xs5 sm8>
        <v-text-field
          v-model="numExpectedSuccesses"
          type="number"
          min="0"
          v-bind:max="Number.MAX_SAFE_INTEGER"
          step="1"
          hint="期待する成功回数"
          suffix="回"
        />
      </v-flex>

      <v-flex xs12>
        <div class="font-weight-regular">
          成功する確率は
          <span class="font-weight-bold">
            {{ gachaWinningRate }}%
          </span>
          くらいです。
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/**
   * 累乗
   *
   * y がある程度大きい時、単純なループより速いです。
   *
   * @returns {number} 冪
   * @param {number} x 仮数
   * @param {number} y 指数（自然数）
   */
  function exponentiate(x, y) {
    var result = 1;
    while (y) {
      if (y%2) {
        result *= x;
        y--;
      }
      x *= x;
      y *= 0.5;
    }
    return result;
  }

  /**
   * ガチャ確率計算
   * @returns {number} 勝率
   * @param {number} probabilityPerTry 単発の出現確率
   * @param {number} numTries 連発数（確定枠除く）
   * @param {number} numExpectedSuccesses 目玉が欲しい数（確定枠除く）
   */
  function calcGacha(probabilityPerTry, numTries, numExpectedSuccesses) {
    // 成功率100%なら計算するまでもない
    if(probabilityPerTry == 1)
      return 1;

    // 期待する成功数が試行回数の半分超なら逆の事象を計算した方が速い
    if(numExpectedSuccesses * 2 > numTries + 1) {
      return 1 - calcGacha(
        1 - probabilityPerTry,
        numTries,
        numTries - numExpectedSuccesses + 1
      );
    }
    /**
     * @type {number} 所要時間のしきい値。ミリ秒。
     * これ以内に計算できないと NaN を返します。
     * (ハングアップ対策)
     */
    var CALC_TIME_THRESHOLD = 100;

    var p = 1;
    // 1周ごとに「最初のi回だけ成功する確率」を足していく
    var pn = exponentiate(1-probabilityPerTry, numTries);
    var combination = 1;
    // CALC_TIME_THRESHOLD 以内に求まらなければ失敗
    var t0 = new Date().getTime();
    for (var i = 0; i < numExpectedSuccesses;) {
      if(new Date().getTime() - t0 >= CALC_TIME_THRESHOLD) {
        return NaN;
      }
      // ちょうどi回だけ成功する確率を引く
      p -= combination * pn;
      // increment
      ++i;
      // 組み合わせと「最初のi回だけ成功する確率」の再計算
      // なお自己代入演算子は計算順序の都合で精度が落ちるため使わない
      combination = combination * (numTries-i+1) / i;
      pn = pn / (1-probabilityPerTry) * probabilityPerTry;
    }
    return p;
  }
  export default {
    data: () => ({
      // 抽選率 (%)
      "probabilityPerTry":1,
      // 連発数
      "numTries":90,
      // 欲しい数
      "numExpectedSuccesses":1
    }),
    computed: {
      gachaWinningRate: function() {
        var
          p = Number(this.probabilityPerTry)/100,
          N = Number(this.numTries),
          n = Number(this.numExpectedSuccesses);
        // p, N, n はそれぞれ順に実数、整数、整数
        if(!isFinite(p) || ![N, n].reduce(
          (result, x) => result && Number.isSafeInteger(x),
          true
        )) {
          return '????';
        }
        if(p<0)return '????';  // 負の確率は NaN
        if(p>1)return '????';  // 100%超の確率は NaN
        if(N<1)return '????';  // 1回未満の試行では NaN
        if(N<n)return '????';  // 試行回数以上の成功を求めれば NaN
        if(n<0)return '????';  // 0回未満の成功を期待すれば NaN
        var result = calcGacha(
          this.probabilityPerTry/100,
          this.numTries,
          this.numExpectedSuccesses
        );
        return Number.isFinite(result) ? result*100 : result;
      }
    }
  }
</script>

<style>

</style>
