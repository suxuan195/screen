<template>
    <div class="enterpriseProportion">

        <div class="chart">
            <my-chart :width="432" :height="206" :option="state.option"></my-chart>
        </div>
    </div>
</template>
    
<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import imageBg from "@images/employeeAllocation/leftTop.png";
import line from "@images/employeeAllocation/line.png";
import centerImg from "@images/payrollManagement/centerImg.svg";
const state = reactive({
    option: {},
    list: [
        {
            name: "混合所有制企业占比",
            value: 60,
        },
        {
            name: "非混合所有制企业占比",
            value: 40,
        },
    ],
    colorEnum: [
        {
            r: 24,
            g: 102,
            b: 229,
        },
        {
            r: 241,
            g: 96,
            b: 108,
        },
    ],
});

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
        const color = state.colorEnum[index % 2];
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
        tooltip: {
            backgroundColor: "rgba(255,255,255,.1)",
            textStyle: {
                color: "#fff", // 设置文本颜色，可根据需要调整
            },
            borderColor: "transparent",
            extraCssText: "backdrop-filter: blur(8px);",
            trigger: "item",
            formatter: function (params) {
                var tooltipContent = `${params.name} ${params.value}%`; // 自定义tooltip内容
                const color = state.colorEnum[params.dataIndex % 2];
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: imageBg,
                        width: 168,
                        height: 168,
                    },
                    left: "0",
                    top: "center",
                },
                {
                    type: "image",
                    style: {
                        image: line,
                        width: 200,
                        height: 1,
                    },
                    right: "40",
                    top: "center",
                },
                {
                    type: 'rect',
                    shape: {
                        x: 100, // 矩形左上角的 x 坐标
                        y: 100, // 矩形左上角的 y 坐标
                        width: 10, // 矩形的宽度
                        height: 10 // 矩形的高度
                    },
                    style: {
                        fill: '#1866E5' // 矩形的填充色
                    },
                    right: "230",
                    top: "70",
                },
                {
                    type: 'rect',
                    shape: {
                        x: 100, // 矩形左上角的 x 坐标
                        y: 100, // 矩形左上角的 y 坐标
                        width: 10, // 矩形的宽度
                        height: 10 // 矩形的高度
                    },
                    style: {
                        fill: '#F1606C' // 矩形的填充色
                    },
                    right: "230",
                    top: "125",
                },
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 64,
                        height: 64,
                    },
                    left: "50",
                    top: "center",
                },
                {
                    type: "text",
                    right: "30",
                    top: "68",
                    style: {
                        text: `${state.list[0].value}%`, // 要显示的文本内容
                        fill: "#1866E5", // 文本颜色
                        fontSize: 20, // 字体大小
                    },
                },
                {
                    type: "text",
                    right: "30",
                    bottom: "65",
                    style: {
                        text: `${state.list[1].value}%`, // 要显示的文本内容
                        fill: "#F1606C", // 文本颜色
                        fontSize: 20, // 字体大小
                    },
                },
            ],
        },
        legend: [
            {
                data: legendData(),
                textStyle: {
                    color: "#fff",
                    fontSize: 14,
                    lineHeight: 14,
                },
                icon: "none",
                orient: "vertical",
                top: "65",
                right: "80",
                itemWidth: 6, // 图例标记的宽度
                itemHeight: 6, // 图例标记的高度
                itemGap: 40,
            },
        ],
        series: [
            {
                type: "pie",
                select: false,
                center: ["20%", "50%"],
                radius: ["55%", "65%"],
                label: {
                    show: true, // 显示标签
                    fontSize: 12, // 标签字体大小
                    color: "#fff",
                    position: 'inside', // 标签显示在饼图外面
                    formatter: function (params) {
                        return `{img|${params.value}% }  `;
                    },
                    rich: {
                        img: {
                            backgroundColor: {
                                image: 'https://z1.ax1x.com/2023/09/22/pPo3r7D.png'// 背景图片地址
                            },
                            backgroundSize: ['100%', '100%'], // 背景图片尺寸
                            backgroundPosition: 'center', // 背景图片位置居中
                            height: 20, // 背景图片高度
                            width: 40, // 背景图片宽度
                            align: 'center', // 水平居中
                            verticalAlign: 'middle' // 垂直居中
                        },
                        txt: {
                            color: '#000',
                            fontSize: 12
                        }
                    },
                },

                data: setGradientColorInItemSyle(state.list, state.colorEnum),
            },
        ],
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
.enterpriseProportion {
    padding: 16px;
    box-sizing: border-box;
    width: 432px;
    height: 228px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;
    padding: 16px;
}
</style>