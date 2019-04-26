<template>
  <v-container>
    <v-layout
      text-xs-start
      wrap
    >
      <v-flex xs12>
        <div class="font-weight-regular">
          1回あたり
        </div>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          v-model="probabilityPerTry"
          suffix="%"
        />
      </v-flex>

      <v-flex xs12>
        <div class="font-weight-regular">
          の確率で成功する試行を
        </div>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          v-model="numTries"
          suffix="回"
        />
      </v-flex>

      <v-flex xs12>
        <div class="font-weight-regular">
          繰り返して、少なくとも
        </div>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          v-model="numExpectedSuccesses"
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
   * @returns {number} 冪
   * @param {number} x 仮数
   * @param {number} y 指数（自然数）
   */
  function exponentiate(x, y) {
    var result = 1;
    while (y) {
      if (y&1) {
        result *= x;
      }
      x *= x;
      y >>= 1;
    }
    return result;
  }

  /**
   * ガチャ確率計算
   * @returns {number} 勝率
   * @param {number} probabilityPerTry 単発の出現確率
   * @param {number} numTries 連発数（確定枠除く）
   * @param {number} numExpectedSuccesses 目玉が欲しい数
   */
  function calcGacha(probabilityPerTry, numTries, numExpectedSuccesses) {
    var p = 1;
    var combination = 1;
    for (var i = 0; i < numExpectedSuccesses; i++) {
      if (i) {
        combination = combination *
        (numTries-i+1) / i;
      }
      p -= combination *
        exponentiate(probabilityPerTry, i) *
        exponentiate(1-probabilityPerTry, numTries-i);
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
        if(!isFinite(p) || ![N, n].reduce(
          (result, x) => result && Number.isSafeInteger(x),
          true
        )) {
          return '????';
        }
        if(p<0)return NaN;
        if(p>1)return NaN;
        if(N<1)return NaN;
        if(N<n)return NaN;
        if(n<0)return NaN;
        if(n>9999)return '????';
        return calcGacha(
          this.probabilityPerTry/100,
          this.numTries,
          this.numExpectedSuccesses
        ) * 100;
      }
    }
  }
</script>

<style>

</style>
