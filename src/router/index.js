import Vue from 'vue'
import Router from 'vue-router'
import Books from '@/pages/Books'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Books',
      component: Books
    }
  ]
})
