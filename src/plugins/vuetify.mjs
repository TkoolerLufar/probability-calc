import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'
import 'vuetify/dist/vuetify.min.css'
import {ja} from 'vuetify/locale'
import {default as colors} from 'vuetify/lib/util/colors';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
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
