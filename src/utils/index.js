
import { pickBy, isNaN, isArray } from 'lodash-es'
import * as XLSX from "xlsx";
export function filteredObj(obj) {
    return pickBy(obj, value => {
        return !(value === null || value === "" || isNaN(value) ||
            (isArray(value) && value.length === 0));
    });
}

// 十六进制颜色转rgba
export function hexToRgb(hex, a = 1) {
    // 去除前缀#
    hex = hex.replace("#", "");
    // 提取R、G、B的十六进制值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // 返回RGB格式的颜色
    return `rgba(${r}, ${g}, ${b},${a})`;
};
/**
 * 
 * @param {*} arr 枚举数组
 * @param {*} id 传入id
 * @param {*} key id字段名
 * @param {*} label 需要显示的字段名
 * @returns 
 * 例子： getLabel(state.projectOpt, row.project_id, "project_id", "project_name") 
 */
export function getLabel(arr = [], id, key, label) {
    try {
        if (arr.length > 0) {
            return arr.find((item) => item[key] == id)[label];
        }
        return "-";
    } catch (error) {
        return "-";
    }
}


//  xlsx 导出方法
export function exportExcel(json, name, titleArr, sheetName) {
    var data = new Array();
    var keyArray = new Array();
    const getLength = function (obj) {
        var count = 0;
        for (var i in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, i)) {
                count++;
            }
        }
        return count;
    };
    for (const key1 in json) {
        if (Object.prototype.hasOwnProperty.call(json, key1)) {
            const element = json[key1];
            var rowDataArray = new Array();
            for (const key2 in element) {
                if (Object.prototype.hasOwnProperty.call(element, key2)) {
                    const element2 = element[key2];
                    rowDataArray.push(element2);
                    if (keyArray.length < getLength(element)) {
                        keyArray.push(key2);
                    }
                }
            }
            data.push(rowDataArray);
        }
    }
    data.splice(0, 0, keyArray, titleArr);
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    var wsrows = [{ hidden: true }];
    ws['!rows'] = wsrows;
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, name + '.xlsx');
}


// 数组转tree数据
export function arrToTree(arr, pid = 0, pkey, key) {
    const tree = [];
    for (const item of arr.filter((item) => item[pkey] === pid)) {
        const children = arrToTree(arr, item[key]);
        if (children.length) {
            item.children = children;
        }
        tree.push(item);
    }
    return tree;
}


