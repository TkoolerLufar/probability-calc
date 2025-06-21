import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {ja} from 'vuetify/locale'
import {default as colors} from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      "light": {
        colors: {
          // テーマ色。 Android だとステータスバーとかに使う。 Vuetify より暗め
          primary: colors.blue.darken4,
        },
      },
      "dark": {
        colors: {
          // ダークテーマでの色。分けることもできそうだが一旦同じで
          primary: colors.blue.darken4,
        },
      },
    },
  },
  lang: {
    locales: { ja },
    current: 'ja'
  },
})
