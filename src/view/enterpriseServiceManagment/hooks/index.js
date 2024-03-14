import { reactive, toRefs, onMounted } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
// 热门咨询阅读TOP5
export function useRead() {
    const state = reactive({
        list: [],
        detailText: ''
    })
    const getList = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.list = jsonData.map(item => item['热门阅读TOP5'])
        } catch (error) {
            console.error(error);
        }
    }
    const getDetail = async (name) => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[1]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.detailText = jsonData.find(item => item['内容'].includes(name))['内容']

        } catch (error) {
            console.error(error);
        }
    }
    onMounted(() => {
        getList()
    })
    return {
        ...toRefs(state),
        getList,
        getDetail
    }
}

// 热门知识下载量TOP5
export function useDown() {
    const state = reactive({
        list: [],
        tableData: []
    })
    const getList = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[2]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.list = jsonData.map(item => item['热门知识下载量TOP5'])
        } catch (error) {
            console.error(error);
        }
    }
    const getTableData = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[3]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.tableData = jsonData.map((item, index) => {
                return {
                    name: item['知识名称'],
                    value: item['下载量']
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    onMounted(() => {
        getList()
    })
    return {
        ...toRefs(state),
        getList,
        getTableData,
    }
}

// 企业使用量TOP5
export function useList() {
    const state = reactive({
        list: [],
        tableData: []
    })
    const getList = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[5]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.list = jsonData.map((item, index) => item['企业使用量top5']).filter((item, index) => index < 5)
        } catch (error) {
            console.error(error);
        }
    }
    const getTableData = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[11]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.tableData = jsonData.map((item, index) => {
                return {
                    name: item['企业名称'],
                    value: item['使用量']
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {
        getList()
    })
    return {
        ...toRefs(state),
        getList,
        getTableData
    }
}

// 累计用户总数
export function useCount() {
    const state = reactive({
        num1: '',
        num2: '',
        num3: '',
    })
    const getList = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[4]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.num1 = jsonData[0]['累计用户']
            state.num2 = jsonData[0]['30日内活跃用户']
            state.num3 = jsonData[0]['30日用户活跃率']
        } catch (error) {
            console.error(error);
        }
    }
    onMounted(() => {
        getList()
    })
    return {
        ...toRefs(state),
        getList
    }
}

// 企业领导人培训情况
export function useLearn() {
    const state = reactive({
        list: []
    })
    const getList = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[6]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.list = jsonData.map(item => {
                return {
                    name: item['企业名称'],
                    leader: item['领导班子学习时长'],
                    cadres: item['中层干部学习时长'],
                    low: item['中层及以下干部学习时长'],
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    onMounted(() => {
        getList()
    })
    return {
        ...toRefs(state),
        getList
    }
}

// 用户行为
export function useEvent() {
    const state = reactive({
        list: [],
        tableData: []
    })
    const getList = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[7]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.list = jsonData.map(item => {
                return {
                    name: item['用户行为'],
                    percentage: `${item['占比'] * 100}%`,
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    const getTableData = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[10]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.tableData = jsonData.map((item, index) => {
                return {
                    name: item['名称'],
                    total: item['总量'],
                    item1: item['培训管理'],
                    item2: item['查看资讯'],
                    item3: item['知识检索'],
                    item4: item['知识图谱'],
                    item5: item['智能问答'],
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    onMounted(() => {
        getList()
    })
    return {
        ...toRefs(state),
        getList,
        getTableData
    }
}

// 智能问答关键词云
export function useKeywords() {
    const state = reactive({
        list: []
    })
    const getList = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[8]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            state.list = jsonData.map(item => item['关键词'])
        } catch (error) {
            console.error(error);
        }
    }
    onMounted(() => {
        getList()
    })
    return {
        ...toRefs(state),
        getList
    }
}

// 用户平均活跃
export function useActivation() {
    const state = reactive({
        list: [],
        xData: []
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
    const getList = async () => {
        try {
            const response = await axios.get('./企业服务平台监测.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[9]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'm/d/yyyy', cellDates: true, dateParse: parseDate });
            state.xData = jsonData.map(item => item["日期"])
            state.list = jsonData.map(item => +item["活跃度"].replace(/%/g, ''))
        } catch (error) {
            console.error(error);
        }
    }
    onMounted(() => {
        getList()
    })
    return {
        ...toRefs(state),
        getList
    }
}

