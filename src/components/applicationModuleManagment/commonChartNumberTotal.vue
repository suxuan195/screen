<template>
    <div class="totalNumberChart">
        <topTitle @tabClick="tabClick" :title="props.title" :is-date-show="isDateShow" />
        <my-chart :title="title" :width="550" :height="230" :option="state.option" :more="true" :tag="`leftBottomChart`"
            :click="true" @clickCallBack="clickCallBack" :params="_params"></my-chart>
        <OsituationDialog ref="OsituationDialogRef" />
        <totalDataDialog ref="totalDataDialogRef" />
        <activationDialog ref="activationDialogRef" />
    </div>
</template>
    
<script setup>
import OsituationDialog from './OsituationDialog.vue';
import totalDataDialog from './totalDataDialog.vue';
import activationDialog from './activationDialog.vue';
import topTitle from './topTitle.vue';
import { reactive, onMounted, ref } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null);
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: '默认'
    },
    isDateShow: {
        type: Boolean,
        default: true
    },
    yNameShow: {
        type: Boolean,
        default: true
    },
    colorList: {
        type: Array,
        default: () => {
            return []
        }
    },
    dataList: {
        type: Array,
        default: () => {
            return []
        }
    },
    titleList: {
        type: Array,
        default: () => {
            return []
        }
    }
})
const OsituationDialogRef = ref(null);
const totalDataDialogRef = ref(null);
const activationDialogRef = ref(null);
const state = reactive({
    option: {},
    dateIndex: 2
});
const clickCallBack = () => {
    console.log(props.type);
    if (props.type === 'left') {
        OsituationDialogRef.value.showModel = true
    } else if (props.type === 'centerLeft') {
        totalDataDialogRef.value.showModel = true
    } else {
        activationDialogRef.value.showModel = true
    }
}
const tabClick = (index) => {
    state.dateIndex = index
    switch (index) {
        case 0:
            labels = []
            labels = getPastYears(5)
            init()
            break;
        case 1:
            labels = []
            labels = getPastMonths(6)
            init()
            break;
        default:
            labels = []
            getHour(30, 2)
            init()
            break;
    }
}
// 获取当前时间
var time = new Date();
// 生成最近 4 秒（时分秒）的刻度标签
var labels = [];
// // 获取当前时间及前 n 分钟的时间数据，每隔 m 分钟一个刻度
// function getHour(n, m) {
//     var currentTime = new Date(); // 获取当前时间
//     var minutes = [];
//     for (var i = 0; i <= n; i += m) {
//         var pastTime = new Date(currentTime.getTime() - i * 60000); // 计算前 n 分钟的时间
//         var minute = formatTime(pastTime); // 格式化时间为 hh:mm 的字符串
//         labels.unshift(minute); // 将时间添加到数组的开头，使其按照时间顺序排列
//     }
//     return minutes;
// }
function getHour() {
    for (var day = 1; day <= 15; day++) {
        var label = day + '日';
        labels.push(label);
    }
    return labels
}
// 将时间对象格式化为 hh:mm 的字符串
function formatTime(time) {
    var hour = time.getHours();
    var minute = time.getMinutes();

    if (hour < 10) {
        hour = "0" + hour; // 小于 10 的小时数前面补零
    }
    if (minute < 10) {
        minute = "0" + minute; // 小于 10 的分钟数前面补零
    }

    return hour + ":" + minute;
}
function getPastMonths(n) {
    for (var day = 1; day <= 11; day++) {
        var label = day + '月';
        labels.push(label);
    }
    return labels
}
// 获取前 n 年的年份数据
function getPastYears(n) {
    // var currentYear = new Date().getFullYear(); // 获取当前年份
    // var years = [];
    // for (var i = 0; i <= n; i++) {
    //     var year = currentYear - i;
    //     years.unshift(year + '年'); // 将年份添加到数组的开头，使其按照时间顺序排列
    // }
    return ['2023年'];
}
const init = () => {
    state.option = {
        grid: {
            left: "45",
            right: "180",
            top: "41",
            bottom: "20",
        },
        tooltip: {
            backgroundColor: "rgba(255,255,255,.1)",
            textStyle: {
                color: "#fff", // 设置文本颜色，可根据需要调整
            },
            borderColor: "transparent",
            extraCssText: "backdrop-filter: blur(8px);",
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                crossStyle: {
                    color: "#999",
                },
            },
            formatter: function (p) {
                _params.value = p;
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${props.colorList[item.dataIndex % 2]
                        };margin-right:6px;display:inline-block;"></span>${item.data
                        } </div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
            },
        },
        xAxis: [
            {
                type: "category",
                data: labels,
                boundaryGap: false,
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                },
                axisLine: {
                    // 设置x轴的颜色
                    lineStyle: {
                        color: "#4CB3F3",
                    },
                },
            },
        ],
        yAxis: [
            {
                name: props.yNameShow ? 'Byte' : '',
                type: "value",
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        opacity: 0.3,
                        color: ["#4CB3F3"],
                    },
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                },
                nameTextStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
            },
        ],
        series: [],
    };
    state.option.series = [];
    props.titleList.forEach((item, index) => {
        state.option.series.push({
            name: item,
            type: "line",
            smooth: true,
            lineStyle: {
                color: props.colorList[index],
            },
            symbol: "circle", // 圆点的形状
            symbolSize: 6, // 圆点的大小
            itemStyle: {
                color: props.colorList[index], // 圆点的颜色
                shadowColor: "#fff", // 阴影颜色
                shadowBlur: 4, // 阴影模糊程度
            },
            emphasis: {
                itemStyle: {
                    borderColor: "#fff", // 圆点边框颜色
                    borderWidth: 2, // 圆点边框宽度
                },
            },
            data: props.dataList[state.dateIndex][index],
            areaStyle: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                        {
                            offset: 0,
                            color: hexToRgb(props.colorList[index], 0.3),
                        },
                        {
                            offset: 1,
                            color: hexToRgb(props.colorList[index], 0),
                        },
                    ],
                    false
                ),
                shadowColor: hexToRgb(props.colorList[index], 0.9), //阴影颜色
                shadowBlur: 20,
            },
        });
    });
    console.log(state.option.series);
};
onMounted(() => {
    getHour(30, 2)
    init();
});
</script>
    
<style lang="scss" scoped>
.totalNumberChart {
    padding: 16px;
    box-sizing: border-box;
    width: 432px;
    height: 280px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;
}
</style>