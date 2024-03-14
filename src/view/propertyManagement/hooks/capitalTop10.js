// 行业资本量TOP10
import { reactive, toRefs } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useList() {
    const state = reactive({
        list: [],
        tagArr: [],
        pageCount: 0
    })
    const getList = async (name) => {
        try {
            const response = await axios.get('./产权管理20231009.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[7]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.tagArr = Array.from(new Set(jsonData.map(item => {
                return item['行业']
            })))
            state.list = jsonData.map(item => {
                return {
                    industry: item['行业'],
                    name: item['公司'],
                    price: item['注册资本（万元）'],
                }
            }).filter(item => item.industry == name)
        } catch (error) {
            console.error(error);
        }
    }
    const getTagArr = (page = 1, size = 15) => {
        state.pageCount = Math.ceil(state.tagArr.length / size); // 计算总页数
        const result = []
        for (let i = 0; i < state.tagArr.length; i += size) {
            const chunk = state.tagArr.slice(i, i + size);
            result.push(chunk);
        }
        return result[page - 1];
    }
    return {
        ...toRefs(state),
        getList,
        getTagArr
    }
}