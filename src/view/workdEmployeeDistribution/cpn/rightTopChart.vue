<template>
    <div class="rightTopChart">
        <div class="tabList">
            <p v-for="(item, index) in state.tabList" :key="index + '11'" :class="index === state.current ? 'active' : ''"
                @click="state.current = index">{{ item }}</p>
        </div>
        <my-chart :width="888" :height="330" :option="state.option"></my-chart>
        <!-- <Chart :title="title" :option="state.option" :borderImg="borderImg" :boxWidth="888" :boxHeight="364"
            :canvasWidth="888" :canvasHeight="330"></Chart> -->
    </div>
</template>
  
<script setup>
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import { reactive, ref, onMounted } from "vue";
const _params = ref(null);
const state = reactive({
    tabList: ['汇总', '月度'],
    current: 0,
    option: {},
    month: '',
    title: [
        "工作总额",
        "利润",
    ],
    colors: ["#3C97F1", "#EBAC23"],
    //   立体柱状图左-右-上的颜色,左为主题颜色组
    colorList: ["#3C97F1", "#3C97F1", "#0BE6E6", "#EBAC23", "#F1606C"],
    rightColorList: ["#1E93BC", "#1E93BC", "#0A8C8C", "#AD7703", "#8A3D43"],
    topColorList: ["#27AFEA", "#27AFEA", "#0FD9D9", "#EBAC23", "#F1606C"],
    //   立体柱状图移动的位置
    position: [0],
    xData: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
    ],

});

// legenData处理
const legendData = () => {
    return state.title.map((item, index) => {
        return {
            name: item,
            itemStyle: {
                color: state.colors[index],
            },
        };
    });
};

// 渲染自定义图表类型
const renderItem = (params, api) => {
    let cubeLeftStyle = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: hexToRgb(state.colorList[params.seriesIndex]),
        },
        {
            offset: 1,
            color: hexToRgb(state.colorList[params.seriesIndex], 0),
        },
    ]);
    let cubeRightStyle = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: hexToRgb(state.rightColorList[params.seriesIndex]),
        },
        {
            offset: 1,
            color: hexToRgb(state.rightColorList[params.seriesIndex], 0),
        },
    ]);
    let cubeTopStyle = {
        color: state.topColorList[params.seriesIndex],
    };
    var location = api.coord([api.value(0), api.value(1)]);
    location = [
        location[0] + state.position[params.seriesIndex - 1],
        location[1],
    ];
    var location1 = api.coord([api.value(0), 0]);
    location1 = [
        location1[0] + state.position[params.seriesIndex - 1],
        location1[1],
    ];
    return {
        type: "group",
        children: [
            {
                type: "CubeLeft",
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: location1,
                },
                style: {
                    fill: cubeLeftStyle,
                },
            },
            {
                type: "CubeRight",
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: location1,
                },
                style: {
                    fill: cubeRightStyle,
                },
            },
            {
                type: "CubeTop",
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: location1,
                },
                style: {
                    fill: cubeTopStyle,
                },
            },
        ],
    };
};

// 自定义图表类型-立体柱状图
const registerShape = () => {
    const offsetX = 6;
    const offsetY = 3;
    // 绘制左侧面
    const CubeLeft = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            // 会canvas的应该都能看得懂，shape是从custom传入的
            const xAxisPoint = shape.xAxisPoint;
            // console.log(shape);
            const c0 = [shape.x, shape.y];
            const c1 = [shape.x - offsetX, shape.y - offsetY];
            const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
            const c3 = [xAxisPoint[0], xAxisPoint[1]];
            ctx
                .moveTo(c0[0], c0[1])
                .lineTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .closePath();
        },
    });
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint;
            const c1 = [shape.x, shape.y];
            const c2 = [xAxisPoint[0], xAxisPoint[1]];
            const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
            const c4 = [shape.x + offsetX, shape.y - offsetY];
            ctx
                .moveTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .lineTo(c4[0], c4[1])
                .closePath();
        },
    });
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const c1 = [shape.x, shape.y];
            const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
            const c3 = [shape.x, shape.y - offsetX];
            const c4 = [shape.x - offsetX, shape.y - offsetY];
            ctx
                .moveTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .lineTo(c4[0], c4[1])
                .closePath();
        },
    });
    // 注册三个面图形
    echarts.graphic.registerShape("CubeLeft", CubeLeft);
    echarts.graphic.registerShape("CubeRight", CubeRight);
    echarts.graphic.registerShape("CubeTop", CubeTop);
};

const init = () => {
    registerShape();
    state.option = {
        tooltip: {
            backgroundColor: "rgba(255,255,255,.1)",
            textStyle: {
                color: "#fff", // 设置文本颜色，可根据需要调整
            },
            borderColor: "transparent",
            extraCssText: "backdrop-filter: blur(8px);",
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: function (p) {
                _params.value = p;
                let str = "";
                for (let i in p) {
                    let item = p[i];
                    str += `<div><span style="width:10px;height:10px;border-radius:50%;background-color:${state.colors[item.seriesIndex % 2]
                        };margin-right:6px;display:inline-block;"></span>${item.data}${item.seriesIndex === 0 ? " (亿元)" : " (万元)"} </div>`;
                }
                return `<div style='min-width:100px;'><p style='height:24px;margin: 0;'>${p[0].name}</p>${str}</div>`;

            },
        },

        grid: {
            left: "0",
            right: "40",
            top: "40",
            bottom: "20",
            containLabel: true,
        },
        legend: {
            data: legendData(),
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            top: '5',
            left: "center",
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
        },

        // x 坐标
        xAxis: {
            type: "category",
            data: state.xData,
            // 坐标线条
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#4CB3F3",
                },
            },
            // 标志位
            axisTick: {
                show: false,
                length: 9,
                alignWithLabel: true,
                lineStyle: {
                    color: "#7DFFFD",
                },
            },
            // x 坐标的文字标注的颜色
            axisLabel: {
                fontSize: 12,
                color: "white",
            },
        },
        yAxis: [
            {
                name: '单位(亿元)',
                type: "value",
                min: 0,
                max: 2400,
                interval: 300,
                axisLine: {
                    show: false,
                },
                nameTextStyle: {
                    color: '#fff'
                },
                // 分割线
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
                    fontSize: 12,
                    color: "white",
                },
                boundaryGap: ["20%", "20%"],
            },
            {
                name: '单位(万元)',
                type: "value",
                min: 0,
                max: 2400,
                interval: 300,
                axisLine: {
                    show: false,
                },
                nameTextStyle: {
                    color: '#fff'
                },
                // 分割线
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
                    fontSize: 12,
                    color: "white",
                },
                boundaryGap: ["20%", "20%"],
            },
        ],
        series: [
            {
                name: "利润",
                type: "line",
                smooth: true,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + "%";
                    },
                },
                lineStyle: {
                    color: "#EBAC23",
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: "#EBAC23", // 圆点的颜色
                    shadowColor: "#fff", // 阴影颜色
                    shadowBlur: 4, // 阴影模糊程度
                },
                emphasis: {
                    itemStyle: {
                        borderColor: "#EBAC23", // 圆点边框颜色
                        borderWidth: 2, // 圆点边框宽度
                    },
                },
            },
            {
                type: "custom",
                name: "工作总额",
                tooltip: {
                    valueFormatter: function (value) {
                        return value + "%";
                    },
                },
                renderItem: (params, api) => renderItem(params, api),
            },
        ],
    };
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 12; i++) {
            let randomNum = Math.floor(Math.random() * 2400);
            item.data.push(randomNum);
        }
    });
};

onMounted(() => {
    init();
});


</script>
<style lang="scss" scoped>
.rightTopChart {
    width: 888px;
    height: 364px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    margin-bottom: 50px;
    padding: 16px;
    box-sizing: border-box;

    .tabList {
        display: flex;
        justify-content: flex-end;

        p {
            cursor: pointer;
            font-size: 14px;
            font-weight: normal;
            line-height: 16px;
            text-align: center;
            width: 52px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            letter-spacing: 0em;
            color: #FFFFFF;
        }

        .active {
            border-radius: 15px;
            opacity: 1;
            background: radial-gradient(68% 67% at 50% 50%, rgba(0, 22, 52, 0.15) 0%, #1766A1 100%);
            border-image: linear-gradient(359deg, #166CFF -3%, rgba(209, 226, 255, 0.8701) 9%, rgba(129, 206, 255, 0.76) 99%) 1;
        }
    }
}
</style>
  