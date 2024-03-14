// 产权管理-行业分布情况
import { reactive, toRefs } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useList() {
    const state = reactive({
        list: []
    })
    const getList = async (name) => {
        try {
            const response = await axios.get('./产权行业分布情况.xlsx', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.list = jsonData.map(item => {
                return {
                    name: item['企业名称'],
                    type: item['企业类型'],
                    code: item['产业代码'],
                    paid: item['实缴资本合计'],
                    subscription: item['认缴资本合计'],
                }
            }).filter(item => item.code == name)
        } catch (error) {
            console.error(error);
        }
    }
    return {
        ...toRefs(state),
        getList
    }
}