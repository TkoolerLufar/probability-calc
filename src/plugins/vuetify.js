import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { ja } from 'vuetify/locale'
import colors from 'vuetify/lib/util/colors'

// Vue 3.2 移行のため Vue.use の呼び出しを削除

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'ja',
    messages: { ja },
  },
  // テーマ色。 Android だとステータスバーとかに使う。 Vuetify より暗め
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken4,
      },
      dark: {
        primary: colors.blue.darken4,
      },
    },
    defaultTheme: 'light',
  },
})
