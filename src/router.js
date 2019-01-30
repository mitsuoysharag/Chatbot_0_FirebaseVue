import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Chatbot from './views/Chatbot.vue'
import Tasks from './views/Tasks.vue'
import Websites from './views/Websites.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/chatbot',
      name: 'chatbot',
      component: Chatbot
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/websites',
      name: 'websites',
      component: Websites
    }
  ]
})
