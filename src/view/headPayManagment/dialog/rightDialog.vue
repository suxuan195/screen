<template>
    <div class="centerCenterDialog">
        <Dialog :width="1400" :height="438" :showModel="showModel" title="近三年负责人收入组成" @close="close">
            <div style="display: flex;">
                <div>
                    <my-chart :width="460" :height="364" :option="state.option"></my-chart>
                    <h2 style="color: #fff;
                    text-align: center;position: relative;top: -30px;">2021年</h2>
                </div>
                <div>
                    <my-chart :width="460" :height="364" :option="state.option"></my-chart>
                    <h2 style="color: #fff;
                    text-align: center;position: relative;top: -30px;">2022年</h2>
                </div>
                <div>
                    <my-chart :width="460" :height="364" :option="state.option"></my-chart>
                    <h2 style="color: #fff;
                    text-align: center;position: relative;top: -30px;">2023年</h2>
                </div>
            </div>
        </Dialog>
    </div>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref } from 'vue'
import { reactive, onMounted, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg-1.svg";
import border from "@images/payrollManagement/border-1.svg";
const state = reactive({
    option: {},
    list: [
        {
            name: "其他",
            value: 12.57,
        },
        {
            name: "未完成整改",
            value: 17.16,
        },
        {
            name: "已完成整改",
            value: 70.26,
        },

    ],
    colorEnum: [
        {
            r: 241,
            g: 96,
            b: 108,
        },
        {
            r: 24,
            g: 102,
            b: 229,
        },
        {
            r: 246,
            g: 187,
            b: 59,
        },
        {
            r: 107,
            g: 218,
            b: 255,
        },
    ],
});

const showModel = ref(false)
const close = () => {
    showModel.value = false
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
                        width: 84,
                        height: 84,
                    },
                    left: "190",
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
                    origin: [42, 42],
                },
                {
                    type: "image",
                    style: {
                        image: border,
                        width: 120,
                        height: 120,
                    },
                    left: "170",
                    top: "center",
                },
            ],
        },
        series: [
            {
                type: "pie",
                select: false,
                center: ["50%", "50%"],
                radius: ["45%", "60%"],
                label: {
                    show: true, // 显示标签
                    position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: (params) => {
                        return `{b|${params.name}}  {a${params.dataIndex}|  ${params.percent}%}`;
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
    state.colorEnum.forEach((item, index) => {
        state.option.series[0].label.rich[`a${index}`] = {};
        state.option.series[0].label.rich[
            `a${index}`
        ].color = `rgb(${item.r},${item.g},${item.b})`;
    });
};
onMounted(() => {
    init();
    window.addEventListener('resize', () => init())
});

onUnmounted(() => {
    window.addEventListener('resize', () => null)
})
defineExpose({
    showModel
})
</script>
    
<style lang="scss" scoped>
.centerCenterDialog {
    width: 1213px;
    height: 438px;

    .mX24 {
        padding: 24px;
        box-sizing: border-box;
    }

    .leftBottomBox {
        width: 432px;
        height: 364px;
        background: url("@images/payrollManagement/border.png") 0% 0% / 100% 100%;
        padding: 16px;
        box-sizing: border-box;



        .leftBox {
            padding: 16px;
            box-sizing: border-box;
            width: 100%;
            height: 150px;
            border-radius: 8px;
            opacity: 1;
            background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
            border: 1px solid;
            border-image: linear-gradient(212deg, rgba(255, 255, 255, 0.64) 1%, rgba(50, 64, 200, 0.64) 31%, rgba(255, 255, 255, 0.8) 96%);
            box-shadow: 0px 0px 3px 0px rgba(80, 157, 253, 0.2431), inset 0px 0px 24px 0px #3C97F1;
            position: relative;

            h2,
            p {

                font-size: 12px;
                font-weight: 500;
                line-height: 16px;
                text-align: center;
                background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
            }

            h2 {
                position: absolute;
                top: 16px;
                left: 16px;
            }

            p {
                position: absolute;
                bottom: 16px;
                left: 16px;
            }

        }

        .rightBox {
            display: flex;
            margin-left: 4px;

            .top {
                margin-top: 4px;
                padding: 16px;
                box-sizing: border-box;
                width: 198px;
                height: 180px;
                border-radius: 8px;
                opacity: 1;
                background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
                border: 1px solid;
                border-image: linear-gradient(232deg, rgba(255, 255, 255, 0.64) 1%, #3240C8 31%, rgba(255, 255, 255, 0.8) 97%);
                box-shadow: 0px 0px 3px 0px rgba(4, 197, 197, 0.2431), inset 0px 0px 24px 0px rgba(11, 230, 230, 0.6);
                position: relative;

                h2,
                p {

                    font-size: 12px;
                    font-weight: 500;
                    line-height: 16px;
                    text-align: center;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                }

                h2 {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                }

                p {
                    position: absolute;
                    bottom: 16px;
                    left: 16px;
                }
            }

            .bottom {
                margin-top: 6px;
                display: flex;

                .big {
                    padding: 16px;
                    box-sizing: border-box;
                    width: 97px;
                    height: 180px;
                    border-radius: 8px;
                    opacity: 1;
                    background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
                    border: 1px solid;
                    border-image: linear-gradient(212deg, rgba(255, 255, 255, 0.64) 1%, #3240C8 31%, rgba(255, 255, 255, 0.8) 96%);
                    box-shadow: 0px 0px 3px 0px rgba(181, 87, 0, 0.2431), inset 0px 0px 24px 0px rgba(255, 153, 59, 0.6);
                    position: relative;

                    h2,
                    p {

                        font-size: 12px;
                        font-weight: 500;
                        line-height: 16px;
                        text-align: center;
                        background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                        text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                    }

                    h2 {
                        position: absolute;
                        top: 16px;
                        left: 16px;
                    }

                    p {
                        position: absolute;
                        bottom: 16px;
                        left: 16px;
                    }
                }

                .small {
                    margin-left: 4px;

                    span:first-child {
                        padding: 16px;
                        box-sizing: border-box;
                        display: block;
                        width: 192px;
                        height: 90px;
                        border-radius: 8px;
                        opacity: 1;
                        background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
                        border: 1px solid;
                        border-image: linear-gradient(232deg, rgba(255, 255, 255, 0.64) 1%, #3240C8 31%, rgba(255, 255, 255, 0.8) 97%);
                        box-shadow: 0px 0px 3px 0px rgba(170, 117, 2, 0.2431), inset 0px 0px 24px 0px rgba(235, 172, 35, 0.6);
                        position: relative;

                        h2,
                        p {

                            font-size: 12px;
                            font-weight: 500;
                            line-height: 16px;
                            text-align: center;
                            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                            text-fill-color: transparent;
                            text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                        }

                        h2 {
                            position: absolute;
                            top: 16px;
                            left: 16px;
                        }

                        p {
                            position: absolute;
                            bottom: 16px;
                            left: 16px;
                        }
                    }

                    span:last-child {
                        display: block;
                        padding: 16px;
                        box-sizing: border-box;
                        width: 192px;
                        height: 90px;
                        border-radius: 8px;
                        opacity: 1;
                        background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
                        border: 1px solid;
                        border-image: linear-gradient(232deg, rgba(255, 255, 255, 0.64) 1%, #3240C8 31%, rgba(255, 255, 255, 0.8) 97%);
                        box-shadow: 0px 0px 3px 0px rgba(63, 1, 149, 0.2431), inset 0px 0px 24px 0px rgba(148, 70, 255, 0.6);
                        position: relative;

                        h2,
                        p {

                            font-size: 12px;
                            font-weight: 500;
                            line-height: 16px;
                            text-align: center;
                            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                            text-fill-color: transparent;
                            text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                        }

                        h2 {
                            position: absolute;
                            top: 16px;
                            left: 16px;
                        }

                        p {
                            position: absolute;
                            bottom: 16px;
                            left: 16px;
                        }

                    }
                }
            }
        }
    }
}
</style>
