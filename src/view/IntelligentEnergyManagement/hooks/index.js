import { reactive, toRefs, onMounted } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useIndex() {
    const state = reactive({
        // 读取首页总数据
        list: [],
        // 当年累计发电量
        countList: [],
        // 当年累计煤炭产量
        countList1: [],
        // 总装机容量
        countList2: [],
        // 当年累计上网电量
        countList3: [],
        // 能源企业户数
        enterpriseList: [],
    })
    // 读取文件名称
    const xlsxUrl = './能源安全智能化.xlsx'
    const xlsxUrl2 = './能源数据2.xlsx'
    onMounted(() => {
        getList()
        getEnterpriseList()
    })
    const getList = async () => {
        try {
            const response = await axios.get(xlsxUrl, { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            let arr = jsonData.map(item => {
                const fmtTotal = item['单位'] !== '户数' ? (item['数量'].toFixed(2)).toLocaleString('en-US') : item['数量'].toLocaleString('en-US');
                const danwei = item['单位'] !== '户数' ? item['单位'] : '户'
                return {
                    name: item['标题'],
                    total: item['数量'],
                    // unit: item['单位'],
                    unit: danwei,
                    type: item['类型'],
                    percent: item['占比'],
                    // fmtTotal: item['数量'].toLocaleString('en-US')
                    fmtTotal: fmtTotal
                }
            })
            state.list = arr
            state.countList = arr.filter(item => item.type == '汇总')
        } catch (error) {
            console.error(error);
        }
    }
    const getEnterpriseList = async () => {
        try {
            const enterpriseList = await getResult(0, xlsxUrl2)
            const map = []
            enterpriseList.forEach((item, index) => {
                map.push({
                    number: index + 1,
                    name: item['企业名称']
                })
            })
            state.enterpriseList = map
        } catch (e) {
            console.error(e);
        }
    }
    /**
     *
     * @param {*} sheetIndex 读取xlsx 文件 sheet 的索引
     * @param {*} url 读取文件第地址
     * @returns 返回文件读取结果
     */
    const getResult = async (sheetIndex = 0, url = xlsxUrl) => {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            return jsonData
        } catch (error) {
            console.error(error);
            return []
        }
    }
    const getResult2 = (index, url = xlsxUrl2) => {
        return getResult(index, url)
    }
    return {
        ...toRefs(state),
        getList,
        getResult,
        getResult2,
        getEnterpriseList
    }
}
