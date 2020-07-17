import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Icon from 'vue-awesome/components/Icon'
import App from './App.vue'

import 'vue-awesome/icons/brands/github-alt'
import 'vue-awesome/icons/brands/linkedin-in'
import 'vue-awesome/icons/envelope'
import 'vue-awesome/icons/phone'

import './assets/styles.scss'

import router from './router'
import store from './store'

Vue.component('v-icon', Icon)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

store.dispatch('FetchMe')
  .then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
