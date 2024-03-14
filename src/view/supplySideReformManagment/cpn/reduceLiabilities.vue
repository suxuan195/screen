<template>
    <div class="reduceLiabilities">
        <div class="topBox">
            <h2 class="ttf">企业去产能职工安置完成情况</h2>
            <selectTab :optionList="state.optionList" width="240px" @selectChange="selectChange" />
        </div>
        <div class="chart" v-show="state.tag == 1 || state.tag == 0">
            <my-chart :width="864" :height="200" :option="state.option"></my-chart>
        </div>
        <div class="other" v-show="state.tag == 2">
            <ul>
                <li>
                    <div style="display: flex;">
                        <i class="icon"><img src="@images/supplySideReformManagment/整体负债.png" alt="" srcset=""></i>
                        <div>
                            <h2>整体负债率稳步下降</h2>
                            <i class="line"></i>
                        </div>
                    </div>
                    <p>日前，中央企业整体负债率45.5%，较年初下降<br>
                        0.2个百分点，较2016年未卜降了0.6个百分点...</p>
                </li>
                <li>
                    <div style="display: flex;">
                        <i class="icon"><img src="@images/supplySideReformManagment/带息负债.png" alt="" srcset=""></i>
                        <div>
                            <h2>整体负债率稳步下降</h2>
                            <i class="line"></i>
                        </div>
                    </div>
                    <p>日前，中央企业整体负债率45.5%，较年初下降<br>
                        0.2个百分点，较2016年未卜降了0.6个百分点...</p>
                </li>
                <li>
                    <div style="display: flex;">
                        <i class="icon"><img src="@images/supplySideReformManagment/市场化债.png" alt="" srcset=""></i>
                        <div>
                            <h2>整体负债率稳步下降</h2>
                            <i class="line"></i>
                        </div>
                    </div>
                    <p>日前，中央企业整体负债率45.5%，较年初下降<br>
                        0.2个百分点，较2016年未卜降了0.6个百分点...</p>
                </li>
                <li class="marginTop16">
                    <div style="display: flex;">
                        <i class="icon"><img src="@images/supplySideReformManagment/重点行业.png" alt="" srcset=""></i>
                        <div>
                            <h2>整体负债率稳步下降</h2>
                            <i class="line"></i>
                        </div>
                    </div>
                    <p>日前，中央企业整体负债率45.5%，较年初下降<br>
                        0.2个百分点，较2016年未卜降了0.6个百分点...</p>
                </li>
                <li class="marginTop16">
                    <div style="width: 72px;
height: 72px;
opacity: 1;
">
                        <img src="@images/supplySideReformManagment/目标.png" alt="" srcset=""
                            style="width: 100%;height: 100%;">
                        <h3 class="text">目标</h3>
                    </div>
                </li>
                <li class="marginTop16">
                    <div style="display: flex;">
                        <i class="icon"><img src="@images/supplySideReformManagment/未发生债务.png" alt="" srcset=""></i>
                        <div>
                            <h2>整体负债率稳步下降</h2>
                            <i class="line"></i>
                        </div>
                    </div>
                    <p>日前，中央企业整体负债率45.5%，较年初下降<br>
                        0.2个百分点，较2016年未卜降了0.6个百分点...</p>
                </li>
            </ul>

        </div>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from 'vue'
import selectTab from './selectTab.vue';
import * as echarts from "echarts";
const state = reactive({
    optionList: [{
        value: 1,
        label: '整体负债率',
    },
    // {
    //     value: 0,
    //     label: '中央企业负债动态检测图',
    // },
    {
        value: 2,
        label: '工作目标',
    },],
    showModel: false,
    tag: 1,
    option: {},
    colorList: ["#EBAC23", "#3C97F1"],
    title: ["资产负债率", "带息负债占比率"],
    xData: ["2018.2", "2018.3", "2018.4", "2018.5", "2018.6", "2018.7", "2018.8", "2018.9", "2018.10", "2018.11", "2018.12", "2019.1"],
})

// legenData处理
const legendData = () => {
    return state.title.map((item, index) => {
        return {
            name: item,
            itemStyle: {
                color: state.colorList[index],
            },
        };
    });
};

const init = () => {
    state.option = {
        grid: {
            left: "30",
            right: "20",
            top: "30",
            bottom: "50",
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
        legend: {
            data: legendData(),
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            right: "center",
            top: "0",
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
            itemGap: 30,
        },
        xAxis: [
            {
                type: "category",
                data: state.xData,
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
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
                type: "value",
                name: "单位(%)",
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
                },
            },
        ],
        series: [
            {
                name: '资产负债率',
                type: "line",
                smooth: true,
                lineStyle: {
                    color: 'rgba(235, 172, 35, 0.9)',
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: '#EBAC23', // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
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
                                color: 'rgba(235, 172, 35, 0.3)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(235, 172, 35, 0)'
                            },
                        ],
                        false
                    ),
                    shadowColor: 'rgba(235, 172, 35, 0.9)', //阴影颜色
                    shadowBlur: 20,
                },
                // markPoint: {
                //     symbol: 'image://https://z1.ax1x.com/2023/09/22/pPo3r7D.png', // 设置标记图片路径
                //     symbolSize: [40, 20],
                //     symbolOffset: [0, 5],
                //     data: [
                //         { type: 'max', name: '最大值' }, // 标记最大值
                //         { type: 'min', name: '最小值' }, // 标记最小值
                //         { type: 'average', name: '平均值' }, // 标记平均值
                //     ],
                //     itemStyle: {
                //         color: 'white'
                //     },
                //     label: {
                //         color: '#ffffff',
                //         fontSize: '12px',
                //         verticalAlign: 'middle'
                //     }
                // }
            },
            {
                name: '带息负债占比率',
                type: "line",
                smooth: true,
                lineStyle: {
                    color: 'rgba(60,151,241,0.9)',
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: '#3C97F1', // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#fff", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
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
                                color: 'rgba(60,151,241,0.3)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(60,151,241,0)'
                            },
                        ],
                        false
                    ),
                    shadowColor: 'rgba(60,151,241,0.9)', //阴影颜色
                    shadowBlur: 20,
                },
                // markPoint: {
                //     symbol: 'image://https://z1.ax1x.com/2023/09/22/pPo3r7D.png', // 设置标记图片路径
                //     symbolSize: [40, 20],
                //     symbolOffset: [0, 5],
                //     data: [
                //         { type: 'max', name: '最大值' }, // 标记最大值
                //         { type: 'min', name: '最小值' }, // 标记最小值
                //         { type: 'average', name: '平均值' }, // 标记平均值
                //     ],
                //     itemStyle: {
                //         color: 'white'
                //     },
                //     label: {
                //         color: '#ffffff',
                //         fontSize: '12px',
                //         verticalAlign: 'middle'
                //     }
                // }
            }
        ],
    };
    state.option.series.forEach((item) => {
        item.data = [];
        let coord = []
        for (let i = 0; i < 12; i++) {
            let randomNum = Math.floor(Math.random() * 100);
            item.data.push(randomNum);
            coord.push({ coord: [i, randomNum], value: randomNum })

        }
        item.markPoint = {
            symbol: 'image://https://z1.ax1x.com/2023/09/22/pPo3r7D.png', // 设置标记图片路径
            symbolSize: [50, 20],
            symbolOffset: [0, -10],
            data: [
                { type: 'max', name: '最大值' }, // 标记最大值
                { type: 'min', name: '最小值' }, // 标记最小值
                { type: 'average', name: '平均值' }, // 标记平均值
                ...coord.map(item => item)
            ],
            itemStyle: {
                color: 'white'
            },
            label: {
                color: '#ffffff',
                fontSize: '12px',
                verticalAlign: 'middle'
            }
        }

    });
    // state.option.series = [];
    // state.title.forEach((item, index) => {
    //     let arr = [];
    //     for (let i = 0; i < 12; i++) {
    //         let randomNum = Math.floor(Math.random() * 100);
    //         arr.push(randomNum);
    //     }
    //     state.option.series.push();
    // });
};
const selectChange = (val) => {
    state.tag = val
}
onMounted(() => {
    init()
})
</script>
    
<style lang="scss" scoped>
.reduceLiabilities {
    padding: 16px;
    box-sizing: border-box;
    width: 888px;
    height: 228px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;

    .topBox {
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
    }

    .other {
        margin-top: 8px;

        ul {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;

            li {
                width: 274px;
                height: 77px;
                padding: 8px;
                box-sizing: border-box;
                position: relative;

                .icon {
                    width: 20px;
                    height: 20px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                h2 {
                    font-size: 16px;
                    font-weight: normal;
                    line-height: 20px;
                    letter-spacing: 0em;
                    padding-left: 9px;
                    color: #FFFFFF;
                }

                .line {
                    display: block;
                    background-image: url('@images/supplySideReformManagment/线.png');
                    width: 160px;
                    height: 1px;
                }

                p {
                    margin-top: 8px;
                    font-size: 12px;
                    font-weight: normal;
                    line-height: 16px;
                    letter-spacing: 0em;

                    color: #FFFFFF;
                }
            }

            .text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%);
                font-size: 12px;
                font-weight: normal;
                line-height: 16px;
                letter-spacing: 0em;
                color: #FFFFFF;
            }

            li:not(:nth-child(5)) {
                background-image: url('@images/supplySideReformManagment/工作目标背景框.png');
                background-size: 100% 100%;
            }

            li:nth-child(5) {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .marginTop16 {
                margin-top: 16px;
            }
        }
    }
}
</style>