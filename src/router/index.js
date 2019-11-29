import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from "../views/Login";
import LayoutComponent from "../views/layout/LayoutComponent";
import User from "../views/User";
Vue.use(VueRouter);

const routes = [
  {
    path:'/login',
    component: Login
  },
  {
    path: '/',
    component: LayoutComponent,
    children:[
      {
        path: '',
        component: User
      }
    ]
  },
  {
    path: '*',
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router