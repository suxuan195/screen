<template>
    <div class="leftBottomChart">
        <div style="display: flex;">
            <my-chart :width="150" :height="210" :option="state.option1"></my-chart>
            <my-chart :width="260" :height="210" :option="state.option2"></my-chart>
        </div>
    </div>
</template>
    
<script setup>
import { reactive, onMounted, ref,onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg-1.svg";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const _params = ref(null)
const state = reactive({
    option1: {},
    option2: {},
    list: [
        {
            name: "4812",
            value: 100,
        },

    ],
    xData: [
        "甘肃农垦集团",
        "甘肃国投集团",
        "甘肃国际物流集团",
        "白银产业公司",
        "兰石集团",
    ],
    dataList: [20, 17, 15, 12, 9],
    title: ["企业户数"],
    mainColor: "#1866E5",
    colorEnum: [
        {
            r: 60,
            g: 151,
            b: 241,
        },
        {
            r: 241,
            g: 172,
            b: 59,
        },
    ],
    dataList1: [653],
    xData1: [
        "固定资产投资",
    ],
    colorList3: ['#1866E5', '#A2A256']
});

const getValue = (name) => {
    return state.list.find((item) => item.name == name)?.value ?? "-";
};

const getProportion = (name) => {
    let sales = (getValue(name) / getTotal()) * 100;
    return Math.ceil(sales * 100) / 100;
};

const getTotal = () => {
    return state.list
        .map((item) => item.value)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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
        const color = colorlist[i % 1];
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
        title: {
            text: "",
            textStyle: {
                fontSize: 12,
                color: "#fff",
            },
            subtext: '',
            subtextStyle: {
                fontSize: 18,
                color: "#a3befa",
                rich: {
                    a: {
                        fontSize: 12,
                        color: "#fff",
                        padding: [0, 0, 0, 4],
                    },
                },
            },
            top: "70",
            left: "93",
            textAlign: "center",
        },
        tooltip: {
            backgroundColor: "rgba(255,255,255,.1)",
            textStyle: {
                color: "#fff", // 设置文本颜色，可根据需要调整
            },
            borderColor: "transparent",
            extraCssText: "backdrop-filter: blur(8px);",
            trigger: "item",
            formatter: function (params) {
                var tooltipContent = `${params.name} ${params.value}万元   ${getProportion(params.name)}%`; // 自定义tooltip内容
                const color = state.colorEnum[params.dataIndex % 2];
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 54,
                        height: 54,
                    },
                    left: "center",
                    top: "center",
                    keyframeAnimation: [
                        {
                            // 动画时长，单位 ms
                            duration: 20000,
                            // 设置旋转动画是否循环
                            loop: true,
                            // 动画的关键帧
                            keyframes: [
                                {
                                    // percent为关键帧的位置,0为第一个,1为最后一个
                                    percent: 0,
                                    easing: "linear",
                                    rotation: 0,
                                    transition: ["rotation"],
                                },
                                {
                                    percent: 1,
                                    easing: "linear",
                                    // 旋转角度采用弧度值
                                    rotation: -Math.PI * 2,
                                    transition: ["rotation"],
                                },
                            ],
                        },
                    ],
                    // 旋转的中心点
                    origin: [27, 27],
                },
                {
                    type: 'circle',
                    left: "center",
                    top: "center",
                    shape: {
                        r: 35
                    },
                    style: {
                        fill: 'rgba(255,255,255,0.2)',
                        lineWidth: 2
                    },
                    z: 10 // 设置 z 值确保图形在前景显示
                }
            ],
        },
        series: [
            {
                type: "pie",
                select: false,
                center: ["50%", "50%"],
                radius: ["70%", "90%"],
                label: {
                    show: false, // 显示标签
                },
                data: setGradientColorInItemSyle(state.list, state.colorEnum),
            },
        ],
        grid: {
            top: '20%'
        }
    };
};
const init2 = () => {
    state.option2 = {
        grid: {
            left: "0",
            right: "0",
            top: "20",
            bottom: "0",
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
            formatter: function (p) {
                _params.value = p;
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
        xAxis: [
            {
                splitLine: {
                    show: false,
                },
                type: "value",
                show: false,
                axisPointer: {
                    show: false, // 隐藏十字指示器
                    type: "line", // 设置指示器样式
                },
            },
        ],
        yAxis: [
            {
                inside: true,
                splitLine: {
                    show: false,
                },
                axisLine: {
                    //y轴
                    show: false,
                },
                type: "category",
                axisTick: {
                    show: false,
                },
                offset: -10,
                inverse: true,
                data: state.xData1,
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    show: true,
                    verticalAlign: "top",
                    align: "left",
                    padding: [-25, 0, 0, 0],
                    formatter: function (value, index) {
                        return `{b${index}|●}  ${value}`;
                    },
                    rich: {
                        b0: {
                            color: state.colorList3[0],
                        },
                        b1: {
                            color: state.colorList3[1],
                        },
                    },
                },
            },
            {

                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                offset: -10,
                axisLabel: {
                    color: '#fffff',
                    fontSize: "24",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-29, 0, 0, 0],
                    formatter: function (value, index) {
                        console.log(value);
                        let val = ((value / 653) * 100).toFixed(0)
                        return `{a${index}|${val}} {c|%} {a${index}|653}{c|个}`;
                    },
                    rich: {
                        a0: {
                            color: state.colorList3[0],
                            fontSize: 24,
                        },
                        // a1: {
                        //     color: state.colorList3[1],
                        //     fontSize: 24
                        // },
                        c: {
                            fontSize: 12,
                            color: '#FFFFFF'
                        }
                    },
                },
                data: [653],
            },
        ],
        series: [
            {
                name: "11",
                type: "bar",
                barWidth: 8,
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                },
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 8,
                    height: 8,
                    position: "right",
                    offset: [-10, 0],
                    borderWidth: 2,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 15,
                    shadowColor: "#fff",
                    shadowBlur: 6,
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: state.mainColor }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.mainColor, 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
                data: state.dataList1,
            },
        ],
    };
};
onMounted(() => {
    init1()
    init2()
    window.addEventListener('resize',()=>init1())
});



onUnmounted(()=>{
  window.addEventListener('resize',()=>null)
})


</script>
<style lang="scss" scoped>
.leftBottomChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 210px;
}
</style>