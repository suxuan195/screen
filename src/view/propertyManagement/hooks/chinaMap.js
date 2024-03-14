// 产权管理-行业分布情况
import { reactive, toRefs, } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useList() {
    const state = reactive({
        list: [],
        mapCount: []
    })
    const getList = async (name) => {
        try {
            const response = await axios.get('./产权管理20231009.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[11]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            const result = jsonData.map(item => {
                return {
                    name: item['公司名称'],
                    city: item['市县'],
                    address: item['详细地址'],
                    value: [item['经度'], item['纬度']],
                }
            })
            state.mapCount = countElementsByProperty(result, 'city')
            state.mapCount.forEach(item => {
                item.value = result.find(v => v.city == item.name).value
            })
            state.list = result.filter(item => item.city == name)
        } catch (error) {
            console.error(error);
        }
    }

    const countElementsByProperty = (arr, property) => {
        // 创建一个对象用于统计属性值及其出现次数
        const counts = {};

        // 遍历数组元素
        arr.forEach(item => {
            // 获取当前元素的属性值
            const value = item[property];

            // 判断属性值在 counts 对象中是否存在
            if (!counts.hasOwnProperty(value)) {
                // 如果不存在，则初始化为 1
                counts[value] = 1;
            } else {
                // 如果已存在，则递增计数
                counts[value]++;
            }
        });
        // 返回统计结果
        return Object.keys(counts).map(key => ({ name: key, count: counts[key] }));;
    }
    return {
        ...toRefs(state),
        getList
    }
}