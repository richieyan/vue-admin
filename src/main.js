import 'babel-polyfill' //ES5.1支持

//库
import Vue from 'vue'
import Vuex from 'vuex' //状态管理库
import ElementUI from 'element-ui' //UI组件库
import VueRouter from 'vue-router' //跳转控制库
import 'element-ui/lib/theme-default/index.css' //组件的样式库

//应用
import store from './vuex/store' //应用的存储
import routes from './routes' //应用页面跳转
import App from './App' //应用入口
import Mock from './mock' //mock数据
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

