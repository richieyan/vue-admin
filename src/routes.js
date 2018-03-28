import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

//参考: https://router.vuejs.org/zh-cn/api/options.html#routes
//除了必备的属性，还可以自定义各种属性，在Home.vue中使用了这些自定义的属性
let routes = [
    { //一个route对象，包含路径，线上组件，名称，是否隐藏
        path: '/login', //路径
        component: Login, //线上组件
        name: '', //命名路由
        hidden: true //应用自定义属性
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true //应用自定义属性
    },
    //{ path: '/main', component: Main },
    { //当跳转到/table时，由于table是/的子路径，所有的/下的route都会生效
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class，应用自定义属性
        children: [ //嵌套路由
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' }, //登录后默认跳转到这里
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    { //登录成功后，此导航二也会显示
        path: '/', //同一根下,新的嵌套路由
        component: Home, //主页面
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' }, //如果当前route是/table，不会显示这些子路由
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/', //登录后同样会显示
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;