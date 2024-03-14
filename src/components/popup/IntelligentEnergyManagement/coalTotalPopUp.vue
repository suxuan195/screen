<template>
    <div>
        <popup :width="954" :height="650" title="当年累计煤炭产量" class="popup1" :showModel="props.showModel">
            <div class="electricityTotalPopUp">
                <div class="top">
                    <div class="chart">
                        <my-chart :width="250" :height="250" :option="state.option" :highlight="true"
                            @clickACallBack="(e) => clickCallBack(e, 0)" :clickA="true"></my-chart>
                    </div>
                    <div class="progress">
                        <template v-for="(item, index) in state.option1" :key="index+'11'">
                            <my-chart :width="200" :height="index === 0 ? 220 : 110" :option="item"
                                :style="{ marginLeft: index === 1 ? '80px' : '' }" :params="_params" :click="true"
                                @clickCallBack="(e) => clickCallBack(e, 1)"></my-chart>
                        </template>
                    </div>
                </div>
                <div class="bottom">
                    <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="300px"
                        class="tableX">
                    </customTable>
                </div>
            </div>
        </popup>
    </div>
</template>
    
<script setup>
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import popup from "@components/popup/pop.vue";
import { reactive, onMounted, ref } from "vue";
import border from "@images/payrollManagement/border-1.svg";
import centerImg from "@images/payrollManagement/centerImg-1.svg";
import bg from '@images/IntelligentEnergyManagement/能源饼图数字背景.png'
import customTable from "@/components/customTable/customTable.vue";
import { useIndex } from "@/view/IntelligentEnergyManagement/hooks/index";
const { getResult } = useIndex();

const getList = async () => {
    let res = await getResult()
    let arr = res.map(item => {
        return {
            name: item['标题'],
            num: item['数量'],
            unit: item['单位'],
            type: item['类型'],
            value: item['占比'],
        }
    })
    state.list = [
        arr.find(item => item.type == '原煤' && item.name == '当年累计煤炭产量'),
        arr.find(item => item.type == '烟煤' && item.name == '当年累计煤炭产量'),
        arr.find(item => item.type == '无烟煤' && item.name == '当年累计煤炭产量'),
        arr.find(item => item.type == '商品煤' && item.name == '当年累计煤炭产量'),
        arr.find(item => item.type == '褐煤' && item.name == '当年累计煤炭产量'),
        arr.find(item => item.type == '焦煤' && item.name == '当年累计煤炭产量'),
    ]
    state.xData1[0] = state.list.map(item => item.type).slice(0, 4)
    state.xData1[1] = state.list.map(item => item.type).slice(4)
    state.dataList1[0] = state.list.map(item => item.num).slice(0, 4)
    state.dataList1[1] = state.list.map(item => item.num).slice(4)
}


const _params = ref(null);
const clickCallBack = async (params, tag) => {
    let index = -1
    let type = tag ? params.name : params.data.type
    switch (type) {
        case '原煤':
            index = 5
            break;
        case '烟煤':
            index = 6
            break;
        case '商品煤':
            index = 7
            break;
        default:
            index = -1
            break;
    }
    if (index == -1) {
        return state.tableData = []
    }
    let res = await getResult(index)
    state.tableData = res.map(item => {
        return {
            field0: item["序号"],
            field1: item["企业名称"],
            field2: item["煤炭种类"],
            field3: item["产量"],
            field4: item["日期"],
            field5: item["单位"],
        }
    })
}
const state = reactive({
    option: {},
    list: [
    ],
    colorEnum: [
        { r: 24, g: 102, b: 229 },
        { r: 107, g: 218, b: 255 },
        { r: 246, g: 187, b: 59 },
        { r: 229, g: 85, b: 242 },
        { r: 157, g: 96, b: 241 },
        { r: 241, g: 96, b: 108 }
    ],
    tableData: [
    ],
    tableHeader: [
        {
            label: "序号",
            width: "80",
            prop: 'field0'
        },
        {
            label: "企业名称",
            width: "200",
            prop: "field1",
        },
        {
            label: "煤炭种类",
            width: "200",
            prop: "field2",
        },

        {
            label: "产量",
            width: "200",
            prop: "field3",
        },
        {
            label: "日期",
            width: "200",
            prop: "field4",
        },
        {
            label: "单位",
            width: "200",
            prop: "field5",
        },
    ],
    option1: [],
    xData1: [
        ["原产量煤", "烟煤产量", "无烟煤产量", '褐煤产量'],
        ["焦煤产量", "商品煤产量"]
    ],
    dataList1: [
        [56, 30, 20, 15],
        [15, 18]
    ],
    colorList: ["#1866E5", "#6BDAFF", "#F6BB3B", "#E555F2", "#9D60F1", "#F1606C"],
    colorList1: [
        ["#1866E5", "#6BDAFF", "#F6BB3B", "#E555F2"],
        ["#9D60F1", "#F1606C", "#1866E5", "#6BDAFF"]
    ],
});
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
})
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
                _params.value = params;
                var tooltipContent = `${params.data.type} ${(params.value * 100).toFixed(2)}%`; // 自定义tooltip内容
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
                        width: 110,
                        height: 111,
                    },
                    left: "center",
                    top: "center",
                },
                {
                    type: "image",
                    style: {
                        image: border,
                        width: 200,
                        height: 200,
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
                radius: ["50%", "70%"],
                label: {
                    show: true, // 显示标签
                    position: "inside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: (params) => {
                        return `${(params.value * 100).toFixed(2)}%`;
                    }, // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
                    rich: {
                    },
                    backgroundColor: {
                        image: bg // 设置背景图片的路径
                    },
                    align: 'center',    // 设置水平居中
                    verticalAlign: 'middle',  // 设置垂直居中
                    fontSize: 14, // 标签字体大小
                    width: 42,
                    height: 16, // 设置背景图的高度
                    padding: [4, 4],
                    textStyle: {
                        textShadowColor: 'rgba(255,255,255,1)',  // 设置阴影颜色
                        textShadowBlur: 2,  // 设置阴影模糊程度
                        textShadowOffsetX: 0,  // 设置阴影水平偏移量
                        textShadowOffsetY: 0  // 设置阴影垂直偏移量
                    }
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
const init1 = () => {
    for (let index = 0; index < 2; index++) {
        state.option1[index] = {
            grid: {
                left: "0",
                right: "0",
                top: "0",
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
                        str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colorList1[index][item.dataIndex % 4]
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
                    data: state.xData1[index],
                    axisLabel: {
                        formatter: function (value, ind) {
                            return `{a${index}${ind}|●}  ${value}`;
                        },
                        rich: {
                            a00: {
                                color: state.colorList1[index][0],

                            },
                            a01: {
                                color: state.colorList1[index][1],

                            },
                            a02: {
                                color: state.colorList1[index][2],
                            },
                            a03: {
                                color: state.colorList1[index][3],
                            },
                            a10: {
                                color: state.colorList1[index][0],
                            },
                            a11: {
                                color: state.colorList1[index][1],
                            },
                        },
                        color: "#fff",
                        fontSize: 16,
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
                    offset: -10,
                    axisLabel: {
                        fontSize: 16,
                        verticalAlign: "top",
                        align: "right",
                        padding: [-22, 0, 0, 0],
                        formatter: function (value, index) {
                            return `{a${index}|${value} }` + `{c|万吨}`;
                        },
                        rich: {
                            a0: {
                                color: state.colorList1[index][0],
                                fontSize: 16
                            },
                            a1: {
                                color: state.colorList1[index][1],
                                fontSize: 16
                            },
                            a2: {
                                color: state.colorList1[index][2],
                                fontSize: 16
                            },
                            a3: {
                                color: state.colorList1[index][3],
                                fontSize: 16
                            },
                            c: {
                                color: '#fff',
                                fontSize: 12
                            }
                        },
                    },
                    data: state.dataList1[index],
                },
            ],
            series: [
                {
                    name: "企业户数",
                    type: "bar",
                    barWidth: 4,
                    itemStyle: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                { offset: 0, color: state.colorList1[index][params.dataIndex] }, // 渐变起始颜色
                                {
                                    offset: 1,
                                    color: hexToRgb(state.colorList1[index][params.dataIndex], 0),
                                }, // 渐变终止颜色
                            ]);
                        },
                        borderRadius: [3, 3, 0, 0],
                    },
                    barGap: "80%",
                    label: {
                        show: true,
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
                    data: state.dataList1[index],
                },
                {
                    type: "bar",
                    barWidth: 4,
                    itemStyle: {
                        color: "rgba(60,151,241,.1)",
                    },
                    data: [100, 100, 100, 100, 100, 100, 100, 100],
                    barGap: "-100%",
                    tooltip: {
                        show: false,
                    },
                },
            ],
        };
    }
};
onMounted(async () => {
    await getList()
    init();
    init1()
});
</script>
    
<style lang="scss" scoped>
.electricityTotalPopUp {
    padding: 0 20px 20px 20px;

    .top {
        display: flex;
        height: 250px;

        .chart {
            margin-left: 30px;
        }

        .progress {
            margin-top: 25px;
            margin-left: 33px;
            display: flex;
        }
    }

    .bottom {
        :deep(.custom-table) {
            .el-table__inner-wrapper::before {
                background: transparent;
            }

            .el-table__header {
                th {
                    background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
                    border-color: #0c223a;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: normal;
                    text-align: center;
                    letter-spacing: 0em;
                }
            }

            /* 这里可以根据需要调整边框线的样式 */
        }
    }
}
</style>