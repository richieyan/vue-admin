import 'babel-polyfill' //ES5.1支持

//库
import Vue from 'vue'
import Vuex from 'vuex' //状态管理库
import ElementUI from 'element-ui' //UI组件库
import VueRouter from 'vue-router' //跳转控制库
import 'element-ui/lib/theme-default/index.css' //组件的样式库
import 'font-awesome/css/font-awesome.min.css' //字体css

//应用
import store from './vuex/store' //应用的存储
import routes from './routes' //应用页面跳转
import App from './App' //应用入口
import Mock from './mock' //mock数据



//使用三大组件
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//启动mock数据层
//正式版本应该注释掉，但没有服务端，也只能一直mock了
Mock.bootstrap(); 

//NProgress.configure({ showSpinner: false });

//创建全局的routes
const router = new VueRouter({
  routes
})

//全局导航守卫
//监听所有跳转，如果url下，没有用户信息，全部跳转的login目录
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') { //要去登录页，把user删掉，比如登出操作
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') { //判断是否存在用户，不存在用户且不是登录页，跳转到登录页
    next({ path: '/login' })
  } else {
    next() //正常导航执行
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

//启动整个Vue应用
new Vue({ //一个dict，利用ES的参数传递: {a,b}->{a:a,b:b}的特性
  //el: '#app',
  //template: '<App/>',
  router, //等价于 router: router
  store, //等价于 store: store
  //components: { App }
  render: h => h(App) //渲染参数
}).$mount('#app') //挂载的DOM

