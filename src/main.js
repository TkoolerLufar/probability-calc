import {configureCompat, createApp} from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'

configureCompat({
    "COMPONENT_ASYNC": false,
    "COMPONENT_V_MODEL": false
})

createApp(App).use(vuetify).mount('#app')
