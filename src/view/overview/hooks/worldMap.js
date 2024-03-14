// 产权管理-行业分布情况
import { reactive, toRefs, } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
export function useList() {
    const state = reactive({
        list: [],
    })
    const getList = async () => {
        try {
            const response = await axios.get('./产权管理20231009.xls', { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, { type: 'array' });
            // 读取第一个工作表的数据
            const worksheet = workbook.Sheets[workbook.SheetNames[12]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            const arr = jsonData.map(item => {
                return {
                    name: item['公司名称'],
                    longitude: item['经度'],
                    latitude: item['纬度'],
                }
            })
            state.list = processCoordinates(arr)
        } catch (error) {
            console.error(error);
        }
    }

    const processCoordinates = (data) => {
        // 创建一个 Map 对象用于存储结果
        const result = new Map();

        // 遍历数组元素
        data.forEach(item => {
            // 获取当前元素的 name、longitude 和 latitude 属性值
            const name = item.name;
            const longitude = item.longitude;
            const latitude = item.latitude;

            // 生成一个唯一的键值，使用经纬度拼接而成
            const key = `${longitude},${latitude}`;

            // 判断 Map 中是否已存在该键值
            if (!result.has(key)) {
                // 如果不存在，则初始化为一个对象
                result.set(key, { name: [name], value: [longitude, latitude] });
            } else {
                // 如果已存在，则更新对应的 value
                const existingValue = result.get(key);
                existingValue.name.push(name);
            }
        });

        // 将 Map 转换为一个数组并返回结果
        return Array.from(result.values());
    }

    return {
        ...toRefs(state),
        getList
    }
}