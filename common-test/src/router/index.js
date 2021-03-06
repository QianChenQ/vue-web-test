import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  }, {
    path: "/swagger/home",
    name: "ExtendSwaggerHome",
    component: () => import("../views/ExtendSwaggerHome.vue")
  }, {
    path: "/encrypt",
    name: "Encrypt",
    component: () =>import("../views/Encrypt.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
