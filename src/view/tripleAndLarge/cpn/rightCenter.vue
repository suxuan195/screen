<template>
    <div class="rightBottom">
        <div class="list">
            <h2>事项清单党委会未前置事项top5</h2>
            <my-chart :width="432" :height="180" :option="state.option" :click="true" :params="_params"
                @clickCallBack="clickACallBack"></my-chart>
            <h2>党委会前置后由董事会，经理层决策</h2>
            <div style="display: flex;">
                <my-chart :width="100" :height="100" :option="state.option1"></my-chart>
                <my-chart :width="320" :height="120" :option="state.option2"></my-chart>
            </div>
        </div>
        <unprecedentedItemsDialog :show-model="state.showModel" />
    </div>
</template>
    
<script setup>
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import emitBus from "@utils/bus";
import { reactive, onMounted, ref, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg.svg";
import unprecedentedItemsDialog from "../popup/unprecedentedItemsDialog.vue";
const _params = ref(null)
const state = reactive({
    showModel: false,
    tagPage: 1,
    option: {},
    option1: {},
    option2: {},
    list: [
        {
            name: "4812",
            value: 123,
        },
        {
            name: "0190",
            value: 123,
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
    mainColor: "#1866E5",
    colorEnum: [
        {
            r: 241,
            g: 172,
            b: 59,
        },
        {
            r: 60,
            g: 151,
            b: 241,
        },
    ],
    dataList1: [2060, 447],
    xData1: [
        "党委会前置，董事会决策事项",
        "党委会前置，总经理办公会决策事项",
    ],
    colorList3: ['#1866E5', '#A2A256']
});
onMounted(() => {
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
})
const clickACallBack = (params) => {
    state.showModel = true
}
const init = () => {
    state.option = {
        grid: {
            left: "20",
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
                _params.value = p;
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
                data: state.xData,
                axisLabel: {
                    formatter: function (value, index) {
                        return `${index + 1}、${value}`;
                    },
                    color: "#fff",
                    fontSize: 12,
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
                    color: state.mainColor,
                    fontSize: "14",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-22, 0, 0, 0],
                },
                data: [20, 17, 5, 12, 9],
            },
        ],
        series: [
            {
                name: "企业户数",
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: state.mainColor }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.mainColor, 0) }, // 渐变终止颜色
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
                data: state.dataList,
            },
            {
                type: "bar",
                barWidth: 4,
                itemStyle: {
                    color: "rgba(60,151,241,.1)",
                },
                data: [100, 100, 100, 100, 100],
                barGap: "-100%",
                tooltip: {
                    show: false,
                },
            },
        ],
    };
};
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
        const color = colorlist[i % 2];
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
                        width: 33,
                        height: 33,
                    },
                    left: "center",
                    top: "43",
                },
            ],
        },
        series: [
            {
                type: "pie",
                select: false,
                center: ["50%", "60%"],
                radius: ["60%", "75%"],
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
                    padding: [-24, 60, 0, 0],
                    formatter: function (value, index) {
                        return `{a${index}|${value}}{c|%}`;
                    },
                    rich: {
                        a0: {
                            color: state.colorList3[0],
                            fontSize: 24,
                        },
                        a1: {
                            color: state.colorList3[1],
                            fontSize: 24
                        },
                        c: {
                            fontSize: 12,
                            color: '#FFFFFF'
                        }
                    },
                },
                data: [75, 25],
            },
            {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                offset: -10,
                axisLabel: {
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: "24",
                    verticalAlign: "top",
                    align: "right",
                    padding: [-24, 0, 0, 0],
                    formatter: function (value, index) {
                        return `{a${index}|${value}}`;
                    },
                    rich: {
                        a0: {
                            color: state.colorList3[0],
                            fontSize: 24
                        },
                        a1: {
                            color: state.colorList3[1],
                            fontSize: 24
                        },
                    },
                },
                data: [2060, 447],
            }
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
    init()
    init1()
    init2()
    window.addEventListener('resize', () => init())

});


onUnmounted(() => {
    window.addEventListener('resize', () => null)
})

</script>
    
<style lang="scss" scoped>
.rightBottom {
    width: 432px;
    height: 280px;

    .list {
        background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
        width: 432px;
        height: 343px;
        padding: 10px 10px 0 10px;

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
            width: 100px;
            height: 48px;
            padding: 8px;
            box-sizing: border-box;
            background: url("@images/propertyManagement/item-min.png") 0% 0% / 100% 100% no-repeat;
            font-size: 12px;
            line-height: 14px;
            color: #d6ebf7;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                background: url("@images/propertyManagement/item-min-hover.png") 0% 0% / 100% 100% no-repeat;
            }
        }
    }

}
</style>