import router from '../router/index'
import store from "../store/store";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from "./auth";

const whiteList = [
  '/login',
];

router.beforeEach((to, from, next) => {
  NProgress.start();

  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    }  else {
      store.dispatch('getUser')
        .then((response) => {
          next();
          NProgress.done()
        })
        .catch(() => {
          next('/login')
        })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});
