// 导入router所需的方法
import { createRouter, createWebHashHistory } from 'vue-router'

// 导入路由页面的配置
import routes from './routes.js'
import Cookies from 'js-cookie'
// 导入具有路由的权限数组


// 路由参数配置
const router = createRouter({
    // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes: routes,
})

// routeBeforEach
// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, from, next) => {
    // const isAuthenticated = Cookies.get('token')
    // if (to.name !== "login" && !isAuthenticated) {
    //     next({ name: "login" });
    // }
    // else {
    //     next();
    // }
    next()
})

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to) => {
    const _title = to.meta.title
    if (_title) {
        window.document.title = _title
    }
})

// 导出默认值
export default router
