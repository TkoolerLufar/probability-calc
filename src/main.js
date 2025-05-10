import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'

(function(app) {
  app.use(vuetify)
  app.mount('#app')
})(createApp(App))
