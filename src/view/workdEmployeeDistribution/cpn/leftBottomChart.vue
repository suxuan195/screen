<template>
    <div class="rightBottomChart">
        <div class="titles">
            <p><span>平均工资（元）</span></p>
            <p style="margin-left: 190px;"><span>工资总额（万元）</span></p>
        </div>
        <div class="bottom">
            <ul class="leftTitle">
                <li v-for="(item, index) in  state.xData" :key="index + '11'">{{ item }}</li>
            </ul>
            <div class="graphical">
                <ul class="left">
                    <li>
                        <i>56987.36</i>
                        <div class="ti">
                            <img src="@images/workdEmployeeDistribution/左1.png" alt="" srcset="">
                        </div>
                    </li>
                    <li> <i>56987.36</i>
                        <div class="ti"> <img src="@images/workdEmployeeDistribution/左2.png" alt="" srcset=""></div>
                    </li>
                    <li> <i>56987.36</i>
                        <div class="ti"> <img src="@images/workdEmployeeDistribution/左3.png" alt="" srcset=""></div>
                    </li>
                    <li> <i>56987.36</i>
                        <div class="ti"> <img src="@images/workdEmployeeDistribution/左4.png" alt="" srcset=""></div>
                    </li>
                    <li> <i>56987.36</i>
                        <div class="ti"> <img src="@images/workdEmployeeDistribution/左5.png" alt="" srcset=""></div>
                    </li>
                    <li> <i>56987.36</i>
                        <div class="ti"> <img src="@images/workdEmployeeDistribution/左6.png" alt="" srcset=""></div>
                    </li>
                </ul>
                <div class="line"></div>
                <ul class="right">
                    <li>
                        <div class="ti">
                            <img src="@images/workdEmployeeDistribution/右1.png" alt="" srcset="">
                        </div>
                        <i>653.36</i>
                    </li>
                    <li>
                        <div class="ti">
                            <img src="@images/workdEmployeeDistribution/右2.png" alt="" srcset="">
                        </div>
                        <i>2323.36</i>
                    </li>
                    <li>
                        <div class="ti">
                            <img src="@images/workdEmployeeDistribution/右3.png" alt="" srcset="">
                        </div>
                        <i>56987.36</i>
                    </li>
                    <li>
                        <div class="ti">
                            <img src="@images/workdEmployeeDistribution/右4.png" alt="" srcset="">
                        </div>
                        <i>111212.36</i>
                    </li>
                    <li>
                        <div class="ti">
                            <img src="@images/workdEmployeeDistribution/右5.png" alt="" srcset="">
                        </div>
                        <i>56987.36</i>
                    </li>
                    <li>
                        <div class="ti">
                            <img src="@images/workdEmployeeDistribution/右6.png" alt="" srcset="">
                        </div>
                        <i>56987.36</i>
                    </li>
                </ul>
                <!-- <div class="leftChart mt20">
                    <my-chart :width="200" :height="300" :option="state.option"></my-chart>
                </div>
                <div class="rightChart mt20">
                    <my-chart :width="200" :height="300" :option="state.option1"></my-chart>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    option: {},
    xData: [
        "集团企业负责人",
        "集团企业中层",
        "集团一版员工",
        "子公司企业负责人",
        "子公司中层",
        "子公司一版职工",
    ],
    title: ["企业户数"],
    mainColor: "#1866E5",
    option1: {},
    xData1: [
        "集团企业负责人",
        "集团企业中层",
        "集团一版员工",
        "子公司企业负责人",
        "子公司中层",
        "子公司一版职工",
    ],
    title1: ["企业户数"],
    mainColor1: "#1866E5",
})
const init = () => {
    state.option = {
        grid: {
            left: "0",
            right: "20",
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
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:#09BAE0;margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
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
                inverse: true,
            },
        ],
        yAxis: [
            {
                inverse: true,
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
                offset: -390,
                data: state.xData,
                axisLabel: {
                    formatter: function (value, index) {
                        return `${value}`;
                    },
                    color: "#fff",
                    fontSize: 14,
                    show: true,
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 0, 0, 0],
                },
            },
            {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    color: '#09BAE0',
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "left",
                    padding: [-22, 0, 0, -385],
                },
                data: [56987.36, 32564.22, 15269.2, 25654.6, 12343.21, 9546.32],

            },
        ],
        series: [
            {
                name: "企业户数",
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 1, color: '#09BAE0' }, // 渐变起始颜色
                        { offset: 0, color: hexToRgb('#09BAE0', 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 4,
                    height: 4,
                    position: "left",
                    offset: [7, 0],
                    borderWidth: 2,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    shadowColor: "#fff",
                    shadowBlur: 6,
                },
                data: [56987.36, 32564.22, 15269.2, 25654.6, 12343.21, 9546.32],
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                },
            },
        ]
    };
};
const init1 = () => {
    state.option1 = {
        grid: {
            left: "0",
            right: "20",
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
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.mainColor
                        };margin-right:6px;display:inline-block;"></span>${item.data} </div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;
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
                inverse: true,
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
                data: state.xData1,
                axisLabel: {
                    formatter: function (value, index) {
                        return `${value}`;
                    },
                    color: "#fff",
                    fontSize: 14,
                    show: true,
                    verticalAlign: "top",
                    align: "left",
                    padding: [-22, 0, 0, 0],
                },
            },
            {

                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    color: state.mainColor1,
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 0, 0, 0],
                },
                data: [653.28, 2323.23, 23454.36, 423454.36, 2423454.36, 2423454.36],
            },
        ],
        series: [
            {
                name: "企业户数",
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: state.mainColor1 }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.mainColor1, 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 4,
                    height: 4,
                    position: "right",
                    offset: [-7, 0],
                    borderWidth: 2,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    shadowColor: "#fff",
                    shadowBlur: 6,
                },
                data: [653.28, 2323.23, 23454.36, 423454.36, 2423454.36, 2423454.36],
                showBackground: true,//开启背景
                backgroundStyle: {//设置背景样式
                    color: "rgba(255, 255, 255, 0.08)",
                    barBorderRadius: 10,
                },
            }
        ]
    };
};
onMounted(() => {
    init()
    init1()
});
</script>
<style lang="scss" scoped>
.rightBottomChart {
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 888px;
    height: 364px;
    padding: 16px;
    box-sizing: border-box;
    padding: 30px 20px;

    .titles {
        display: flex;
        justify-content: center;

        p {
            width: 130px;
            height: 36px;
            line-height: 36px;
            margin-bottom: 4px;
            background-size: 100% 100%;
            background-image: url('@images/jGEnterpriseManagement/企业名称框.png');

            span {
                white-space: nowrap;
                padding-left: 8px;
                font-size: 16px;
                font-weight: 600;
                line-height: 22px;
                letter-spacing: 0em;
                background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #90D1FF 83%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 12px #5CB2C7;
            }
        }
    }

    .bottom {
        display: flex;
        margin-top: 30px;

        .leftTitle {
            li {
                white-space: nowrap;
                font-size: 16px;
                font-weight: 600;
                line-height: 38px;
                letter-spacing: 0em;
                background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #90D1FF 83%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 12px #5CB2C7;
            }
        }

        .graphical {
            display: flex;
            margin-left: 50px;

            .line {
                margin-top: 20px;
                width: 2px;
                height: 200px;
                background-color: #4CB3F3;
            }

            .right {
                li {
                    justify-content: space-between;

                    i {
                        color: #1866E5;

                    }

                    .ti {
                        margin-right: 23px;
                    }
                }

                li:nth-child(1) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                            transform: translateX(-145px);
                        }
                    }
                }

                li:nth-child(2) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                            transform: translateX(-123px);
                        }
                    }
                }

                li:nth-child(3) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                            transform: translateX(-93px);
                        }
                    }
                }

                li:nth-child(4) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                            transform: translateX(-63px);
                        }
                    }
                }

                li:nth-child(5) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                            transform: translateX(-35px);
                        }
                    }
                }

                li:nth-child(6) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                        }
                    }
                }
            }

            .left {
                li {
                    justify-content: space-between;

                    i {
                        margin-right: 23px;
                    }
                }

                li:nth-child(1) {
                    .ti {
                        width: 208px;
                        overflow: hidden;

                        img {
                            width: 208px;
                            height: 38px;
                        }

                    }
                }

                li:nth-child(2) {
                    .ti {
                        width: 208px;
                        overflow: hidden;

                        img {
                            width: 208px;
                            height: 38px;
                            transform: translateX(31px);
                        }
                    }
                }

                li:nth-child(3) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                            transform: translateX(61px);
                        }
                    }
                }

                li:nth-child(4) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                        }
                    }
                }

                li:nth-child(5) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                            transform: translateX(28px);
                        }
                    }
                }

                li:nth-child(6) {
                    .ti {
                        width: 218px;
                        overflow: hidden;

                        img {
                            width: 218px;
                            height: 38px;
                            transform: translateX(56px);
                        }
                    }
                }
            }

            li {
                display: flex;
                height: 38px;

                i {
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 40px;
                    text-align: right;
                    color: #6BDAFF;
                }
            }
        }
    }

}
</style>