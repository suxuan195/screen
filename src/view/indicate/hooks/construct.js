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
            const response = await axios.get('./一带一路页面项目建设.xlsx', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array', cellDates: true, dateNF: "yyyy-MM-dd HH:mm" });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // 将日期格式设置为 'yyyy-mm-dd'
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'm/d/yyyy', cellDates: true, dateParse: parseDate });
            state.list = jsonData.map(item => {
                return {
                    institutionName: item['机构名称'],
                    entryName: item['项目名称'],
                    projectType: item['项目类型'],
                    projectDominName: item['项目所属行业领域名称'],
                    projectCountry: item['项目所在国家地区及城市'],
                    duration: item['工期(月)'],
                    totalInvestment: item['投资总额(万元)'],
                    approvedAmount: item['国资委批复金额(万)'],
                    commencementDate: item['项目开工日期'],
                    productionDate: item['项目投产日期']
                }
            }).filter(item => item.projectType == name)
        } catch (error) {
            console.error(error);
        }
    }
    return {
        ...toRefs(state),
        getList
    }
}