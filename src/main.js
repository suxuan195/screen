import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)

// 导入上面新建的路由文件
import router from './router/index'
app.use(router)



import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus, {
  locale: zhCn,
})

import CustomTableWrap from '@/components/CustomTableWrap/index.vue'
app.component('CustomTableWrap', CustomTableWrap)

import MyChart from '@/components/Chart/MyChart.vue'
app.component('my-chart', MyChart)

import customTable from '@/components/customTable/customTable.vue'
app.component('customTable', customTable)
import { createPinia } from 'pinia'
// 数据持久化
import piniaPersit from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersit)
app.use(pinia)
// import 'nprogress/nprogress.css'
// import 'default-passive-events';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
// watchError(app)
