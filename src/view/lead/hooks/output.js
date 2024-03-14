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
            const worksheet = workbook.Sheets[workbook.SheetNames[4]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            const sumByName = sumByProperty(jsonData, '项目所属行业领域名称', '利润总额');
            state.statistics = Object.keys(sumByName).map(key => ({ name: key, value: sumByName[key].toFixed(2) }));
            const arr = jsonData.map(item => {
                return {
                    name: item['企业名称'],
                    profit: Number(item['净利润']),
                    revenue: Number(item['营业收入']),
                    equity: Number(item['所有者权益']),
                    profit_total: Number(item['利润总额']),
                    code: item['项目所属行业领域名称'],
                }
            }).filter(item => item.code == name)
            const resultList = sumByPropertyArr(arr, 'name', ['profit', 'revenue', 'equity', 'profit_total'])
            Object.keys(resultList).map(key => (state.list.push(resultList[key])))
            state.list = state.list.map(item => {
                let { name, profit, revenue, equity, profit_total, code } = item
                return {
                    name,
                    profit: formatNumber(profit),
                    revenue: formatNumber(revenue),
                    equity: formatNumber(equity),
                    profit_total: formatNumber(profit_total),
                    code,
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    const formatNumber = (num) => {
        if (Number.isInteger(num)) {
            return num.toString(); // 如果是整数，直接返回字符串表示
        } else {
            const fixedNum = num.toFixed(6); // 如果有小数，保留最多6位小数
            if (Number.isInteger(Number(fixedNum))) {
                return parseInt(fixedNum).toString(); // 如果处理后的结果为整数，转换为整型并返回字符串表示
            } else {
                return fixedNum; // 否则返回保留小数后的字符串表示
            }
        }
    }
    const sumByPropertyArr = (arr, prop1, props) => {
        return arr.reduce((result, obj) => {
            const key = obj[prop1];
            if (key in result) {
                for (let prop of props) {
                    if (prop in obj) {
                        result[key][prop] += Number(obj[prop]);
                    }
                }
            } else {
                result[key] = { ...obj };
            }
            return result;
        }, {});
    }

    const sumByProperty = (arr, prop1, prop2) => {
        return arr.reduce((result, obj) => {
            const key = obj[prop1];
            const value = Number(obj[prop2]);
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