<template>
    <div class="rightTopChart">
        <h2 class="ttf">股份划转占比情况</h2>
        <div class="item">
            <div class="left">
                <h2>划城市值总额</h2>
                <div class="line"></div>
                <p>3433.43<i>亿元</i></p>
            </div>
            <div class="right">
                <my-chart :width="650" :height="206" :option="state.option"></my-chart>
            </div>
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
            name: "城通划转市值",
            value: 60,
            price: '5433.32'
        },
        {
            name: "国新划转市值",
            value: 40,
            price: '9433.32'
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
                        width: 220,
                        height: 190,
                    },
                    left: "10",
                    top: "center",
                },
                {
                    type: "image",
                    style: {
                        image: line,
                        width: 320,
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
                    right: "340",
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
                    right: "340",
                    top: "125",
                },
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 102,
                        height: 102,
                    },
                    left: "65",
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
                {
                    type: "text",
                    right: "100",
                    bottom: "118",
                    style: {
                        text: `${state.list[0].price} 亿元`, // 要显示的文本内容
                        fill: "#FFFFFF", // 文本颜色
                        fontSize: 20, // 字体大小
                    },
                },
                {
                    type: "text",
                    right: "100",
                    bottom: "65",
                    style: {
                        text: `${state.list[1].price} 亿元`, // 要显示的文本内容
                        fill: "#FFFFFF", // 文本颜色
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
                right: "245",
                itemWidth: 6, // 图例标记的宽度
                itemHeight: 6, // 图例标记的高度
                itemGap: 40,
            },
        ],
        series: [
            {
                type: "pie",
                select: false,
                center: ["18%", "50%"],
                radius: ["70%", "80%"],
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
.rightTopChart {
    margin-bottom: 24px;
    width: 888px;
    height: 360px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 16px;
    box-sizing: border-box;

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
        z-index: 0;
    }

    .item {
        display: flex;

        .left {
            margin-top: 120px;
            background: url("@images/safeProduction/弧形框.png") 0% 0% / 100% 100% no-repeat;
            width: 220px;
            height: 88px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            h2 {
                font-size: 16px;
                font-weight: normal;
                line-height: 16px;
                letter-spacing: 0em;
                color: #ECECEC;
                z-index: 0;
            }

            .line {
                width: 152px;
                height: 2px;
                opacity: 1;
                margin: 8px 0;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.51) 26%, #7B90FF 50%, rgba(123, 144, 255, 0.57) 71%, rgba(255, 255, 255, 0.00) 100%);
            }

            p {
                font-size: 22px;
                font-weight: normal;
                line-height: 22px;
                letter-spacing: 0em;
                color: #F6BB3B;
                z-index: 0;

                i {
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: normal;
                    line-height: 12px;
                    letter-spacing: 0em;
                    color: #ECECEC;
                    z-index: 1;
                }
            }
        }

        .right {
            margin-top: 60px;
            margin-left: 41px;
        }
    }
}
</style>