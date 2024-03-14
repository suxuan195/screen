// 行业资本量TOP10
import { reactive, toRefs } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useList() {
    const state = reactive({
        data: [
            {
                name: '国药控股股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '01'
            },
            {
                name: '碧桂园控股有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '02'

            },
            {
                name: '物产中大集团股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '03'
            },
            {
                name: '中国农业银行股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '04'
            },
            {
                name: '绿地控股集团股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '05'
            },
            {
                name: '中国建筑股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '06'
            },
            {
                name: '珠海格力电器股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '07'

            },
            {
                name: '交通银行股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '01'
            },
            {
                name: '中国建材股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '01'
            },
            {
                name: '中国中信股份有限公司',
                price: '154.3396',
                date: '2022-07-28 11:15:49',
                code: '01'
            },
        ],
        list: [
        ],
        tagArr: [],
        pageCount: 0,
        total: 10
    })
    const getList = async (params) => {
        try {
            // const response = await axios.get('./产权管理20231009.xls', { responseType: 'arraybuffer' });
            // const data = new Uint8Array(response.data);
            // const workbook = XLSX.read(data, { type: 'array' });
            // // 读取第一个工作表的数据
            // const worksheet = workbook.Sheets[workbook.SheetNames[7]];
            // const jsonData = XLSX.utils.sheet_to_json(worksheet);
            // state.tagArr = Array.from(new Set(jsonData.map(item => {
            //     return item['行业']
            // })))
            // state.list = jsonData.map(item => {
            //     return {
            //         industry: item['行业'],
            //         name: item['公司'],
            //         price: item['注册资本（万元）'],
            //     }
            // }).filter(item => item.industry == name)
            const obj = objectFilterAttr(params)
            state.list = state.data.filter(item => {
                for (let key in obj) {
                    if (item[key] !== obj[key]) {
                        return false;
                    }
                }
                return true;
            })
        } catch (error) {
            console.error(error);
        }
    }
    const objectFilterAttr = (obj) => {
        return Object.keys(obj).filter(key => {
            return obj[key] != null && obj[key] !== '';
        }).reduce((newObj, key) => {
            newObj[key] = obj[key];
            return newObj;
        }, {});
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