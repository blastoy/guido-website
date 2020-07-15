import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Skills from './views/Skills.vue'
import Experience from './views/Experience.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/skills',
      name: 'skills',
      component: Skills
    },
    {
      path: '/experience',
      name: 'experience',
      component: Experience
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
