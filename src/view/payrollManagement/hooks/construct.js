import { reactive, toRefs } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useList() {
    const state = reactive({
        list: []
    })
    // 自定义日期解析函数
    function parseDate(serial) {
        const utcDays = Math.floor(serial - 25569);
        const utcValue = utcDays * 86400;
        const dateInfo = new Date(utcValue * 1000);
        const year = dateInfo.getFullYear();
        const month = dateInfo.getUTCMonth() + 1;
        const day = dateInfo.getUTCDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
    const getList = async (name) => {
        try {
            const response = await axios.get('./企业负责人薪酬与企业经营状况关联图.xlsx', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array', cellDates: true, dateNF: "yyyy-MM-dd HH:mm" });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // 将日期格式设置为 'yyyy-mm-dd'
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'm/d/yyyy', cellDates: true, dateParse: parseDate });
            state.list = jsonData.map(item => {
                return {
                    institutionName: item['负责人薪酬增长率'],
                    entryName: item['盈余能力综合值'],
                    projectType: item['资产质量综合值'],
                    projectDominName: item['债务风险综合值'],
                    projectCountry: item['经营增长综合值'],
                    qymc:item['企业名称']
                }
            })
            // .filter(item => item.qymc == name)
        } catch (error) {
            console.error(error);
        }
    }
    return {
        ...toRefs(state),
        getList
    }
}