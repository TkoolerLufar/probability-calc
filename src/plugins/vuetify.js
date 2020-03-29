import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import ja from 'vuetify/es5/locale/ja'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  lang: {
    locales: { ja },
    current: 'ja'
  },
})
