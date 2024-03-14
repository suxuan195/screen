// 行业资本量TOP10
import { reactive, toRefs } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useList() {
    const state = reactive({
        list: [],
        statistics: [],
    })
    const getList = async (name) => {
        try {
            const response = await axios.get('./一带一路页面.xlsx', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[3]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            const sumByName = sumByProperty(jsonData, '项目所属行业领域名称', '投资总额(万元)');
            state.statistics = Object.keys(sumByName).map(key => ({ name: key, value: sumByName[key].toFixed(2) }));
            state.list = jsonData.map(item => {
                return {
                    name: item['项目名称'],
                    type: item['项目类型'],
                    code: item['项目所属行业领域名称'],
                    price: item['投资总额(万元)'],
                    approval_price: item['国资委批复金额(万)'],
                }
            }).filter(item => item.code == name)

        } catch (error) {
            console.error(error);
        }
    }

    const sumByProperty = (arr, prop1, prop2) => {
        return arr.reduce((result, obj) => {
            const key = obj[prop1];
            const value = obj[prop2];
            if (key in result) {
                result[key] += value;
            } else {
                result[key] = value;
            }
            return result;
        }, {});
    }

    return {
        ...toRefs(state),
        getList,
    }
}