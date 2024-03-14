<template>
    <div class="leftTopChart">
        <my-chart :width="420" :height="382" :option="state.option" :highlight="true"
            :length="state.list.length"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg.svg";
const state = reactive({
    tag: 0,
    option: {},
    list: [
        {
            name: "制造业",
            value: 123,
        },
        {
            name: "电力热力燃气及水生产和供应业",
            value: 123,
        },
        {
            name: "金融业",
            value: 123,
        },
        {
            name: "信息传输、软件和信息技术服务业",
            value: 123,
        },
        {
            name: "交通运输、仓储和邮政业",
            value: 123,
        },
        {
            name: "批发和零售业",
            value: 123,
        },
        {
            name: "建筑业",
            value: 123,
        },
        {
            name: "租凭和商务服务业",
            value: 123,
        },
    ],
    colorEnum: [
        {
            r: 63,
            g: 100,
            b: 250,
        },
        {
            r: 55,
            g: 211,
            b: 219,
        },
        {
            r: 35,
            g: 201,
            b: 154,
        },
        {
            r: 235,
            g: 172,
            b: 35,
        },
        {
            r: 229,
            g: 85,
            b: 242,
        },
        {
            r: 92,
            g: 108,
            b: 128,
        },
        {
            r: 157,
            g: 96,
            b: 241,
        },
        {
            r: 254,
            g: 108,
            b: 12,
        },
    ],
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
const legendData = () => {
    return state.list.map((item, index) => {
        const color = state.colorEnum[index % 9];
        return {
            name: item.name,
            itemStyle: {
                color: `rgb(${color.r}, ${color.g}, ${color.b})`,
            },
        };
    });
};
const init = () => {
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
    state.option = {
        title: {
            text: "累计金额",
            textStyle: {
                fontSize: 12,
                color: "#fff",
            },
            subtext: 123413 + "{a|万元}",
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
            top: "160",
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
                const color = state.colorEnum[params.dataIndex % 6];
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        legend: [
            {
                data: legendData(),
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                    lineHeight: 14,
                },
                icon: "circle",
                orient: "vertical",
                top: "15",
                left: "205",
                itemWidth: 6, // 图例标记的宽度
                itemHeight: 6, // 图例标记的高度
                itemGap: 30,
            },
            {
                data: legendData(),
                textStyle: {
                    fontSize: 14,
                    lineHeight: 14,
                    color: "#a3befa",
                    rich: {
                        legendText: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    { offset: 0, color: '#FFFFFF' },
                                    { offset: 1, color: ' #3773F3' },
                                ]
                            }
                        }
                    },
                },
                align: "left",
                formatter: function (name) {
                    return `${getValue(name)}万元     ${getProportion(name)}%`; // 每隔四个字符插入一个换行符
                },
                icon: "none",
                orient: "vertical",
                top: "40",
                right: "80",
                itemWidth: 6, // 图例标记的宽度
                itemHeight: 6, // 图例标记的高度
                itemGap: 30
            },
        ],
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 72,
                        height: 72,
                    },
                    left: "60",
                    top: "center",
                },
            ],
        },
        series: [
            {
                type: "pie",
                select: false,
                center: ["23%", "50%"],
                radius: ["30%", "35%"],
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

onMounted(() => {
    init();
    window.addEventListener('resize', () => init())
});

onUnmounted(() => {
    window.addEventListener('resize', () => null)
})
</script>
    
<style lang="scss" scoped>
.leftTopChart {
    width: 432px;
    height: 382px;
    margin-bottom: 50px;
    position: relative;
    z-index: 100;
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    position: relative;
}
</style>
    