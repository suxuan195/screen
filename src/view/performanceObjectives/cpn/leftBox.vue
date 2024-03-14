<template>
    <div class="leftBox">
        <div class="topCard">
            <div class="left">
                <img src="@images/performanceObjectives/单位.png" alt="">
                <h2>连续2年评级为A的单位</h2>
                <p><span>16</span><i>户</i></p>
            </div>
            <div class="right ml20"> <img src="@images/performanceObjectives/单位.png" alt="">
                <h2>连续3年评级为A的单位</h2>
                <p><span>11</span><i>户</i></p>
            </div>
        </div>
        <el-scrollbar  class="list">
            <ul v-for="(item, index) in state.listC" :key="index + '11'" class="item">
                <li @click="explanClick(index)">
                    <span>{{ item.name }}</span>
                    <img :class="active != index ? 'rotoce90' : ''" src="@images/performanceObjectives/展开按钮.png" alt="">
                </li>
                <div class="explan" v-show="active == index">
                    <my-chart :width="864" :height="200" :option="item.option"></my-chart>
                </div>
            </ul>
        </el-scrollbar>
    </div>
</template>
    
<script setup>
import centerImg from "@images/payrollManagement/centerImg.svg";
import { reactive, onMounted, ref } from 'vue';
const state = reactive({
    listC: [
        {
            name: '2022年考核结果',
            explanShow: false,
            option: {}
        },
        {
            name: '2021年考核结果',
            explanShow: false,
            option: {}
        },
        {
            name: '2020年考核结果',
            explanShow: false,
            option: {}
        },
        {
            name: '2019年考核结果',
            explanShow: false,
            option: {}
        },
        {
            name: '2018年考核结果',
            explanShow: false,
            option: {}
        },

    ],
    option: [],
    list: [
        {
            name: "考核评级为A的企业",
            value: 20,
            percentage: 33
        },
        {
            name: "考核评级为B的企业",
            value: 8,
            percentage: 33
        },
        {
            name: "考核评级为C的企业",
            value: 6,
            percentage: 33
        },
        {
            name: "考核评级为D的企业",
            value: 13,
            percentage: 33
        },
        {
            name: "考核评级为E的企业",
            value: 11,
            percentage: 33
        }
    ],
    colorEnum: [
        {
            r: 246,
            g: 187,
            b: 59,
        },
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
        {
            r: 8,
            g: 217,
            b: 217,
        },
        {
            r: 38,
            g: 194,
            b: 150,
        },

    ],
})
const active = ref(0)
const explanClick = (index) => {
    active.value = index
}
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
    state.listC.forEach((item) => {
        item.option = {
            title: {
                text: "38",
                subtext: "{a|用户总数}",
                textStyle: {
                    fontSize: 24,
                    color: "#fff",
                },
                subtextStyle: {
                    fontSize: 14,
                    color: "#a3befa",
                    rich: {
                        a: {
                            fontSize: 14,
                            color: '#6BDAFF',
                            padding: [0, 0, 10, 0],
                        },
                    },
                },
                top: "70",
                left: "428",
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
                            width: 75,
                            height: 75,
                        },
                        left: "center",
                        top: "center",
                    },
                ],
            },
            series: [
                {
                    type: "pie",
                    select: false,
                    center: ["50%", "50%"],
                    radius: ["40%", "50%"],
                    label: {
                        show: true, // 显示标签
                        position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
                        formatter: (params) => {
                            return `{a${params.dataIndex}|${params.value}户}   {a${params.dataIndex}|${params.data.percentage}%}  {b|${params.name}}`;
                        }, // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
                        rich: {

                        },
                        fontSize: 12, // 标签字体大小
                        color: "#fff",
                    },
                    data: setGradientColorInItemSyle(state.list, state.colorEnum),
                },
            ],
        };
    })
};

onMounted(() => {
    init();
})
</script>
    
<style lang="scss" scoped>
.leftBox {
    width: 888px;
    height: 856px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 30px 20px;
    box-sizing: border-box;

    .topCard {
        display: flex;

        div {
            width: 387.3px;
            height: 270.04px;
            background-image: url('@images/performanceObjectives/框1.png');
            background-size: 100% 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                width: 110.3px;
                height: 120.61px;
                margin-top: 10px;
                padding-top: 16px;
            }

            h2 {
                margin-top: 10px;
                font-size: 18px;
                font-weight: 500;
                line-height: 24px;
                letter-spacing: 1.44px;
                color: #FFFFFF;
                position: relative;
                display: inline-block;

                &::before {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 3px;
                    height: 8px;
                    border-radius: 2px;
                    opacity: 1;
                    background: linear-gradient(180deg, rgba(0, 204, 255, 0) 0%, #00F8FF 100%);
                }
            }

            p {
                margin-top: 12px;

                span {
                    font-size: 32px;
                    font-weight: bold;
                    line-height: 36px;
                    letter-spacing: 0px;
                    font-feature-settings: "kern" on;
                    color: #00CCFF;
                }

                i {
                    font-size: 16px;
                    font-weight: normal;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                    padding-left: 9px;
                }
            }
        }

        .ml20 {
            margin-left: 59px;
        }
    }

    .el-scrollbar {
        margin-top: 20px;

        ul {
            &:last-child {
                li {
                    margin: 0;
                }
            }
        }

        li {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-bottom: 20px;
            width: 845px;
            height: 40px;
            border-radius: 8px;
            background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
            border-image: linear-gradient(267deg, rgba(255, 255, 255, 0.64) 0%, rgba(50, 64, 200, 0.64) 31%, rgba(255, 255, 255, 0.8) 98%) 1;
            box-shadow: 0px 0px 3px 0px rgba(80, 157, 253, 0.2431),
                inset 0px 0px 13px 0px rgba(80, 157, 253, 0.5922);
            position: relative;

            img {
                width: 24px;
                height: 24px;
                padding-left: 4px;
            }

            .rotoce90 {
                transform: rotate(-90deg);
            }

            span {
                padding: 13px 0;
                display: block;
                text-align: center;
                font-size: 18px;
                font-weight: 600;
                line-height: 24px;
                letter-spacing: 0em;
                background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #90D1FF 83%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 12px #5CB2C7;
                z-index: 0;
            }
        }

        .explan {
            margin-top: 18px;
            margin-bottom: 20px;
            width: 840px;
            height: 200px;
            border-radius: 8px;
            background: rgba(29, 112, 190, 0.05);
            backdrop-filter: blur(10px);
            border: 2px solid;
        }
    }
}
</style>