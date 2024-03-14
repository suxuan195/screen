<template>
    <div class="leftTopChart">
        <div class="chart">
            <my-chart :width="864" :height="224" :option="state.option" :clickA="true" @clickACallBack="clickCallBack"
                :params="_params"></my-chart>
        </div>
    </div>
</template>
    
<script setup>
import { reactive, onMounted, ref, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg-1.svg";
import * as echarts from "echarts";
import border from "@images/payrollManagement/border-1.svg";
const _params = ref(null);
const state = reactive({
    option: {},
    list: [
        {
            name: "国资委核查项目XXXX件",
            source: "全部",
            value: 5,
        },
        {
            name: "企业正在核查项目XXXX件",
            source: "全部",
            value: 8,
        },
    ],
    colorEnum: [
        {
            r: 24,
            g: 102,
            b: 229,
        },
        {
            r: 8,
            g: 188,
            b: 255,
        },
        {
            r: 246,
            g: 187,
            b: 59,
        },
    ],
});
const itemStyleColor = () => {
    let arr = state.list.map((item, index) => {
        let color = state.colorEnum[index];
        return {
            name: item.name,
            itemStyle: {
                color: `rgb(${color.r},${color.g},${color.b})`,
            },
        };
    });
    arr.push({
        name: "全部",
        itemStyle: {
            opacity: 0,
        },
        label: {
            show: false,
        },
    });
    return arr;
};

const linksData = () => {
    return state.list.map((item, index) => {
        let { name, source, value } = item;
        let c = state.colorEnum[index];
        const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
                offset: 0,
                color: `rgba(${c.r},${c.g},${c.b},0)`,
            },
            {
                offset: 1,
                color: `rgba(${c.r},${c.g},${c.b},1)`,
            },
        ]);
        return {
            source: source,
            target: name,
            value: value,
            lineStyle: {
                color: color,
            },
        };
    });
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
        const color = colorlist[i];
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
                var tooltipContent = `${params.name} ${params.value}`; // 自定义tooltip内容
                const color = state.colorEnum[params.dataIndex % 3];
                _params.value = params;
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 64,
                        height: 64,
                    },
                    left: "200",
                    top: "83",
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
                    origin: [32, 32],
                },
                {
                    type: "image",
                    style: {
                        image: border,
                        width: 158,
                        height: 158,
                    },
                    left: "150",
                    top: "35",
                },
            ],
        },
        series: [
            {
                type: "pie",
                emphasis: {
                    // 禁用鼠标移入放大效果
                    scale: false,
                },
                select: false,
                center: ["230", "115"],
                radius: ["40%", "60%"],
                label: {
                    show: true, // 显示标签
                    position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: "{b} {c}", // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
                    fontSize: 12, // 标签字体大小
                    backgroundColor: "rgba(255,255,255,.1)",
                    color: "#fff", // 设置文本颜色，可根据需要调整
                    borderColor: "transparent",
                    extraCssText: "backdrop-filter: blur(8px);",
                    height: 16, // 设置背景图的高度
                    padding: [2, 4, 2, 4],
                    borderRadius: 8,
                },
                data: setGradientColorInItemSyle(state.list, state.colorEnum),
            },
            {
                type: "sankey",
                layout: "none",
                draggable: false,
                left: "180",
                top: "60",
                right: "200",
                bottom: "60",
                nodeGap: 65,
                nodeWidth: 5,
                emphasis: { focus: "adjacency" },
                data: itemStyleColor(),
                links: linksData(),
                label: {
                    color: "#fff",
                    fontSize: 14,
                    formatter: function (params) {
                        return params.data.name;
                    },
                },
                lineStyle: {
                    opacity: 0.3,
                    color: "source",
                    curveness: 0.5,
                },
                itemStyle: {
                    borderWidth: 0,
                    borderColor: "red",
                },
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

const clickCallBack = (p) => {
    console.log(p);
};
</script>
    
<style lang="scss" scoped>
.leftTopChart {
    margin-bottom: 50px;

    .chart {
        background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
        position: relative;
        width: 864px;
        height: 206px;

        .bar {
            position: absolute;
            right: 10px;
            top: 21px;
            font-size: 12px;
            display: flex;
            z-index: 9;

            .item {
                color: #fff;
                margin-left: 15px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                width: 82px;
                cursor: pointer;
                border-radius: 15px;
                box-sizing: border-box;

                &:hover {
                    background: #1766a1;
                    border: 1px solid #166cff;
                }
            }

            .item.active {
                background: #1766a1;
                border: 1px solid #166cff;
            }
        }
    }
}
</style>
    