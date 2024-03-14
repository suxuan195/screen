import { reactive, toRefs } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useList() {
    const state = reactive({
        list: []
    })
    const getList = async (name) => {
        try {
            const response = await axios.get('./一带一路页面项目分布.xlsx', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.list = jsonData.map(item => {
                return {
                    institutionName: item['机构名称'],
                    entryName: item['项目名称'],
                    projectType: item['项目类型'],
                    IndustrySector: item['项目所属行业领域名称'],
                    projectCountry: item['项目所在国家地区及城市'],
                    totalInvestment: item['投资总额(万元)'],
                    approvedAmount: item['国资委批复金额(万)'],
                    permanentPerson: item['常驻负责人'],
                    projectInvestor: item['项目投资方'],
                    projectPartner: item['项目合作方']
                }
            }).filter(item => item.IndustrySector == name)
        } catch (error) {
            console.error(error);
        }
    }
    return {
        ...toRefs(state),
        getList
    }
}