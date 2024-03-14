import axios from 'axios';
import { ElLoading } from 'element-plus';
import $ElMessage from "@/utils/resetMessage.js";
import Cookies from "js-cookie";
// 创建axios实例
const service = axios.create({
    // 服务接口请求
    baseURL: import.meta.env.VITE_APP_DEV_URL,
    // 超时设置
    timeout: 1000 * 10,
    // headers:{'Content-Type':'application/json;charset=utf-8'}
})
let loading;
//正在请求的数量
let requestCount = 0
//显示loading
const showLoading = () => {
    if (requestCount === 0 && !loading) {
        loading = ElLoading.service({
            text: "拼命加载中，请稍后...",
            background: 'rgba(0, 0, 0, 0.7)',
            spinner: 'el-icon-loading',
        })
    }
    requestCount++;
}
//隐藏loading
const hideLoading = () => {
    requestCount--
    if (requestCount == 0) {
        loading.close()
    }
}
service.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false;
    if (Cookies.get("token") && !isToken) {
        config.headers["token"] = Cookies.get("token");
    }
    showLoading()
    return config
}, error => {
    Promise.reject(error)
})
service.interceptors.response.use(res => {
    hideLoading()
    return Promise.resolve(res.data)
}, error => {
    hideLoading()
    if (error.message == "timeout of 10000ms exceeded" || error.message == "Network Error") {
        $ElMessage.error("请求超时！")
        return Promise.reject(error)
    }
    if (error.response.status == 404) {
        $ElMessage.error("找不到请求接口")
        return Promise.reject(error)
    }
})

export default service