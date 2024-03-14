<template>
    <div class="physicalUsage">
        <div class="top">
            <h2 class="ttf">应用服务器使用情况</h2>
            <ul class="tab">
                <li :class="currentIndex === index ? 'active' : ''" @click="tabClick(index)"
                    v-for="(item, index) in  ['年', '月', '日']" :key="index">{{ item }}</li>
            </ul>
        </div>
        <div class="bottom">
            <my-chart :width="260" :height="240" :option="state.option"></my-chart>
            <div class="rightChart">
                <my-chart :width="130" :height="120" :option="state.option1" :highlight="true" :length="5" :clickA="true"
                    @clickACallBack="clickCallBack" :legendSelected="true" @legendSelectCallBack="clickCallBack"></my-chart>
                <my-chart :width="130" :height="120" :option="state.option2" :highlight="true" :length="5"
                    style="margin-top: 5px;" :clickA="true" @clickACallBack="clickCallBack" :legendSelected="true"
                    @legendSelectCallBack="clickCallBack"></my-chart>
            </div>
        </div>
        <physicalUsage2Dialog ref="physicalUsage2DialogRef" />
    </div>
</template>
    
<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import physicalUsage2Dialog from './physicalUsage2Dialog.vue';
import centerImg from "@images/payrollManagement/centerImg.svg";
import bg from '@images/IntelligentEnergyManagement/能源饼图数字背景.png'
import { leftData } from '../../view/applicationModuleManagment/json/usageData';
const currentIndex = ref(2)
// 获取当前时间
var time = new Date();
var hour = time.getHours();
var minute = time.getMinutes();
var second = time.getSeconds();

// 生成最近 4 秒（时分秒）的刻度标签
var labels = [];
// function getHour() {
//     for (var i = second - 4; i <= second; i++) {
//         var label = hour + ':' + minute + ':' + (i < 10 ? '0' + i : '' + i);
//         labels.push(label);
//     }
//     return labels
// }
function getHour() {
    for (var day = 1; day <= 15; day++) {
        var label = day + '日';
        labels.push(label);
    }
    return labels
}
// 获取当前月份及前 n 个月的月份数据
// function getPastMonths(n) {
//     var currentMonth = new Date().getMonth() + 1; // 获取当前月份（getMonth 返回 0 到 11 的整数，+1 后才是实际月份）

//     for (var i = 0; i <= n; i++) {
//         var month = ((currentMonth - i) % 12 + 12) % 12 || 12; // 计算月份，保证结果在 1 到 12 的范围内
//         labels.unshift(month + "月"); // 将月份添加到数组的开头，使其按照时间顺序排列
//     }

//     return labels;
// }
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

const physicalUsage2DialogRef = ref(null);
const clickCallBack = async (p) => {
    physicalUsage2DialogRef.value.showModel = true;
};
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
            labels = getHour()
            init()
            break;
    }
    currentIndex.value = index
}
const state = reactive({
    dateIndex: 2,
    counter: 0,
    option: {},
    option1: {},
    option2: {},
    xData: [
        "2018年1月",
        "2018年2月",
        "2018年3月",
        "2018年4月",
        "2018年5月",
        "2018年6月",
        "2018年7月",
        "2018年8月",
        "2018年9月",
        "2018年10月",
        "2018年11月",
        "2018年12月",
    ],
    title: ["磁盘平均\n使用率", "内存平均\n使用率", "CPU平均\n使用率"],
    list: [
        {
            name: "已占用",
            value: 56,
        },
        {
            name: "空闲",
            value: 44,
        },
    ],
    list2: [
        {
            name: "已占用",
            value: 10,
        },
        {
            name: "空闲",
            value: 90,
        },
    ],
    colorEnum: [
        {
            r: 241,
            g: 184,
            b: 59,
        },
        {
            r: 60,
            g: 151,
            b: 241,
        },
    ],
});
// legenData处理
const legendData = () => {
    return state.title.map((item, index) => {
        return {
            name: item,
        };
    });
};

const init = () => {

    state.option = {
        grid: {
            left: "50",
            right: "20",
            top: "65",
            bottom: "40",
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
                type: "cross",
                crossStyle: {
                    color: "#999",
                },
            },
        },
        toolbox: {
            show: false,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ["line", "bar"] },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        legend: {
            data: legendData(),
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            padding: [2, 10],
            x: "20",
            y: 'top', // 图例垂直方向位置，默认为 'top'，可设置为 'bottom', 'center'
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
        },
        xAxis: [
            {
                type: 'category',           // x 轴类型为类目轴
                data: labels,                   // 初始数据为空
                axisLabel: {
                    interval: 1,
                    color: '#fff'           // 控制刻度标签显示间隔
                },
                axisTick: {
                    show: false,
                },
                axisPointer: {
                    type: "shadow",
                },
                axisLine: {
                    // 设置x轴的颜色
                    show: true,
                    lineStyle: {
                        color: '#4CB3F3'
                    }
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "%",
                min: 0,
                max: 100,
                interval: 25,
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
                    align: 'right'
                },
            },
        ],
        series: [
            {
                name: "磁盘平均\n使用率",
                type: "line",
                yAxisIndex: 0,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    },
                },

                lineStyle: {
                    color: "#3C97F1",
                    width: 4, // 设置折线宽度为2
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 8, // 圆点的大小
                itemStyle: {
                    color: "#3C97F1", // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
                data: leftData[state.dateIndex][0]

            },
            {
                name: "内存平均\n使用率",
                type: "line",
                yAxisIndex: 0,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    },
                },

                lineStyle: {
                    color: "#AAFDFD",
                    width: 4, // 设置折线宽度为2
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: "#AAFDFD", // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
                data: leftData[state.dateIndex][1]
            },
            {
                name: "CPU平均\n使用率",
                type: "line",
                yAxisIndex: 0,
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    },
                },

                lineStyle: {
                    color: "#EBAC23",
                    width: 4, // 设置折线宽度为2
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: "#EBAC23", // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
                data: leftData[state.dateIndex][2]
            },
        ],
        dataZoom: {
            show: true, // 为true 滚动条出现
            realtime: true,
            type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
            start: 0, // 表示默认展示20%～80%这一段。
            end: 60,
            zoomOnMouseWheel: false,
        },
    };
};


const getLocation = (dx, dy) => {
    const tanV = dx / dy;
    // 这里是在计算按照横向渐变还是按照纵向渐变。
    const directSign = Math.abs(tanV) < 1;
    const t = directSign ? tanV : 1 / tanV;

    const sign1 = t > 0 ? 1 : -1;
    const sign2 = dx > 0 ? 1 : -1;
    const sign = directSign ? sign1 * sign2 : sign2;

    // 把整个圆形的坐标映射到了[0-1]之间0.5，0.5即为圆心坐标。
    const group1 = [0.5 - (sign * t) / 2, 0.5 + (sign * t) / 2];
    // 这里给纵向渐变还是横向渐变赋值、即group中的第三项和第四项的值
    const group2 = sign > 0 ? [0, 1] : [1, 0];
    const group = [...group1, ...group2];
    const keys = directSign ? ["x", "x2", "y", "y2"] : ["y", "y2", "x", "x2"];

    const res = {};
    keys.forEach((k, idx) => {
        res[k] = group[idx];
    });
    return res;
};

const getCoordinates = (startArc, endArc) => {
    // 这里计算扇形最外层的x,y坐标
    const position = [
        Math.sin(startArc),
        -Math.cos(startArc),
        Math.sin(endArc),
        -Math.cos(endArc),
    ];
    // 这里求得了最外层两个顶点坐标的差值。
    const dx = position[2] - position[0];
    const dy = position[3] - position[1];

    // 这里在根据两点坐标的差值计算x,y,x2,y2
    return getLocation(dx, dy);
};

const setGradientColorInItemSyle = (
    data,
    colorlist,
    startOpacity = 0,
    endOpacity = 1
) => {
    for (let i = 0; i < data.length; i++) {
        const color = colorlist[i % 6];
        const startAngle = data[i].startAngle;
        const endAngle = data[i].endAngle;
        // 这里计算了 线性渐变的起止方向
        // @ts-ignore
        const coordinates = getCoordinates(startAngle, endAngle);
        data[i].itemStyle = {
            color: {
                ...coordinates,
                type: "linear",
                global: false,
                colorStops: [
                    {
                        offset: 0,
                        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${startOpacity})`,
                    },
                    {
                        offset: 1,
                        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${endOpacity})`,
                    },
                ],
            },
        };
    }
    return data;
};

const init1 = () => {
    const dataTotal = state.list.reduce((prev, curr) => prev + curr.value, 0);
    state.list.forEach((item, idx) => {
        item.percent = item.value / dataTotal;
        item.angle = item.percent * Math.PI * 2; // 弧度制的角度
        if (idx == 0) {
            item.startAngle = 0;
            item.endAngle = item.angle;
        } else {
            item.startAngle =
                state.list[idx - 1].startAngle + state.list[idx - 1].angle;
            item.endAngle = item.startAngle + item.angle;
        }
    });
    state.option1 = {
        tooltip: {
            backgroundColor: "rgba(255,255,255,.1)",
            textStyle: {
                color: "#fff", // 设置文本颜色，可根据需要调整
            },
            borderColor: "transparent",
            extraCssText: "backdrop-filter: blur(8px);",
            trigger: "item",
            formatter: function (params) {
                var tooltipContent = `${params.name} ${params.value}`; // 自定义tooltip内容
                const color = state.colorEnum[params.dataIndex % 6];
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 43,
                        height: 43,
                    },
                    left: "center",
                    top: "50",
                },
                {
                    style: {
                        text: '内存占用',
                        fill: '#fff',
                        font: '14px',
                    },
                    type: "text",
                    left: "45",
                    top: "70",
                },

            ],
        },
        series: [
            {
                selectedMode: false, // 禁用自动选择效果
                type: "pie",
                select: false,
                center: ["50%", "60%"],
                radius: ["50%", "70%"],
                label: {
                    backgroundColor: {
                        image: bg // 设置背景图片的路径
                    },
                    show: true, // 显示标签
                    position: "inside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: (params) => {
                        return `${params.value}%`;
                    },
                    rich: {
                        // a0: {
                        //   color: `rgb(${state.colorEnum[0].r},${state.colorEnum[0].g},${state.colorEnum[0].b})`,
                        // },
                        // a1: {
                        //   color: `rgb(${state.colorEnum[1].r},${state.colorEnum[1].g},${state.colorEnum[1].b})`,
                        // },
                        // a2: {
                        //   color: `rgb(${state.colorEnum[2].r},${state.colorEnum[2].g},${state.colorEnum[2].b})`,
                        // },
                        // a3: {
                        //   color: `rgb(${state.colorEnum[3].r},${state.colorEnum[3].g},${state.colorEnum[3].b})`,
                        // },
                        // a4: {
                        //   color: `rgb(${state.colorEnum[4].r},${state.colorEnum[4].g},${state.colorEnum[4].b})`,
                        // },
                        // a5: {
                        //   color: `rgb(${state.colorEnum[5].r},${state.colorEnum[5].g},${state.colorEnum[5].b})`,
                        // },
                    },
                    fontSize: 12, // 标签字体大小
                    color: "#fff",
                },
                data: setGradientColorInItemSyle(state.list, state.colorEnum),
            },
        ],
        legend: {
            left: 'center',
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
            data: [{ name: '已占用' }, { name: '空闲' }]
        }
    };
    state.colorEnum.forEach((item, index) => {
        state.option1.series[0].label.rich[`a${index}`] = {};
        state.option1.series[0].label.rich[
            `a${index}`
        ].color = `rgb(${item.r},${item.g},${item.b})`;
    });
};


const getLocation1 = (dx, dy) => {
    const tanV = dx / dy;
    // 这里是在计算按照横向渐变还是按照纵向渐变。
    const directSign = Math.abs(tanV) < 1;
    const t = directSign ? tanV : 1 / tanV;

    const sign1 = t > 0 ? 1 : -1;
    const sign2 = dx > 0 ? 1 : -1;
    const sign = directSign ? sign1 * sign2 : sign2;

    // 把整个圆形的坐标映射到了[0-1]之间0.5，0.5即为圆心坐标。
    const group1 = [0.5 - (sign * t) / 2, 0.5 + (sign * t) / 2];
    // 这里给纵向渐变还是横向渐变赋值、即group中的第三项和第四项的值
    const group2 = sign > 0 ? [0, 1] : [1, 0];
    const group = [...group1, ...group2];
    const keys = directSign ? ["x", "x2", "y", "y2"] : ["y", "y2", "x", "x2"];

    const res = {};
    keys.forEach((k, idx) => {
        res[k] = group[idx];
    });
    return res;
};

const getCoordinates2 = (startArc, endArc) => {
    // 这里计算扇形最外层的x,y坐标
    const position = [
        Math.sin(startArc),
        -Math.cos(startArc),
        Math.sin(endArc),
        -Math.cos(endArc),
    ];
    // 这里求得了最外层两个顶点坐标的差值。
    const dx = position[2] - position[0];
    const dy = position[3] - position[1];

    // 这里在根据两点坐标的差值计算x,y,x2,y2
    return getLocation1(dx, dy);
};

const setGradientColorInItemSyle3 = (
    data,
    colorlist,
    startOpacity = 0,
    endOpacity = 1
) => {
    for (let i = 0; i < data.length; i++) {
        const color = colorlist[i % 6];
        const startAngle = data[i].startAngle;
        const endAngle = data[i].endAngle;
        // 这里计算了 线性渐变的起止方向
        // @ts-ignore
        const coordinates = getCoordinates2(startAngle, endAngle);
        data[i].itemStyle = {
            color: {
                ...coordinates,
                type: "linear",
                global: false,
                colorStops: [
                    {
                        offset: 0,
                        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${startOpacity})`,
                    },
                    {
                        offset: 1,
                        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${endOpacity})`,
                    },
                ],
            },
        };
    }
    return data;
};

const init2 = () => {
    const dataTotal = state.list.reduce((prev, curr) => prev + curr.value, 0);
    state.list2.forEach((item, idx) => {
        item.percent = item.value / dataTotal;
        item.angle = item.percent * Math.PI * 2; // 弧度制的角度
        if (idx == 0) {
            item.startAngle = 0;
            item.endAngle = item.angle;
        } else {
            item.startAngle =
                state.list[idx - 1].startAngle + state.list[idx - 1].angle;
            item.endAngle = item.startAngle + item.angle;
        }
    });
    state.option2 = {
        tooltip: {
            backgroundColor: "rgba(255,255,255,.1)",
            textStyle: {
                color: "#fff", // 设置文本颜色，可根据需要调整
            },
            borderColor: "transparent",
            extraCssText: "backdrop-filter: blur(8px);",
            trigger: "item",
            formatter: function (params) {
                var tooltipContent = `${params.name} ${params.value}`; // 自定义tooltip内容
                const color = state.colorEnum[params.dataIndex % 6];
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 43,
                        height: 43,
                    },
                    left: "center",
                    top: "center",
                },
                {
                    type: 'text',
                    style: {
                        text: '磁盘占用',
                        fill: '#fff',
                        font: '14px',    // 设置文字样式 
                    },
                    left: "45",
                    top: "center",
                }
            ],
        },
        series: [
            {
                selectedMode: false, // 禁用自动选择效果
                type: "pie",
                select: false,
                center: ["50%", "50%"],
                radius: ["50%", "70%"],
                label: {
                    backgroundColor: {
                        image: bg // 设置背景图片的路径
                    },
                    show: true, // 显示标签
                    position: "inside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: (params) => {
                        return `${params.value}%`;
                    }, // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
                    rich: {
                        // a0: {
                        //   color: `rgb(${state.colorEnum[0].r},${state.colorEnum[0].g},${state.colorEnum[0].b})`,
                        // },
                        // a1: {
                        //   color: `rgb(${state.colorEnum[1].r},${state.colorEnum[1].g},${state.colorEnum[1].b})`,
                        // },
                        // a2: {
                        //   color: `rgb(${state.colorEnum[2].r},${state.colorEnum[2].g},${state.colorEnum[2].b})`,
                        // },
                        // a3: {
                        //   color: `rgb(${state.colorEnum[3].r},${state.colorEnum[3].g},${state.colorEnum[3].b})`,
                        // },
                        // a4: {
                        //   color: `rgb(${state.colorEnum[4].r},${state.colorEnum[4].g},${state.colorEnum[4].b})`,
                        // },
                        // a5: {
                        //   color: `rgb(${state.colorEnum[5].r},${state.colorEnum[5].g},${state.colorEnum[5].b})`,
                        // },
                    },
                    fontSize: 12, // 标签字体大小
                    color: "#fff",
                },
                data: setGradientColorInItemSyle3(state.list2, state.colorEnum),
            },
        ],
    };
    state.colorEnum.forEach((item, index) => {
        state.option2.series[0].label.rich[`a${index}`] = {};
        state.option2.series[0].label.rich[
            `a${index}`
        ].color = `rgb(${item.r},${item.g},${item.b})`;
    });
};
onMounted(() => {
    getHour()
    init()
    // // 每隔 1 秒更新刻度标签
    // setInterval(init, 10000);
    init1()
    init2()
    window.addEventListener('resize', () => init())
});



onUnmounted(() => {
    window.addEventListener('resize', () => null)
})

</script>
    
<style lang="scss" scoped>
.physicalUsage {
    width: 432px;
    height: 280px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;

    .top {
        display: flex;
        justify-content: space-between;

        h2 {
            font-size: 18px;
            font-weight: normal;
            line-height: 18px;
            letter-spacing: 0px;
            background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }

        .tab {
            display: flex;

            li {
                cursor: pointer;
                font-size: 12px;
                font-weight: normal;
                line-height: 16px;
                text-align: right;
                letter-spacing: 0em;
                color: #FFFFFF;
                width: 32px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                border-radius: 15px;
                padding: 2px 0;
            }

            .active {
                background: radial-gradient(68% 67% at 50% 50%, rgba(0, 22, 52, 0.15) 0%, #1766A1 100%);
                border-image: linear-gradient(360deg, #166CFF -3%, rgba(209, 226, 255, 0.87) 9%, rgba(129, 206, 255, 0.76) 99%) 1;

            }
        }
    }

    .bottom {
        display: flex;

        .rightChart {
            margin-left: 10px;
        }
    }

}
</style>