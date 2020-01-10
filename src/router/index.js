import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import home from '@/components/home/home'
import User from '@/components/users/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
    },
    {
      name:'home',
      path: '/',
      component:home,
      children:[{
        name:'user',
        path:'/user',
        component:User
      }]
    },
    
  ]
})
