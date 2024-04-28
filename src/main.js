import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: true,
  },
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
