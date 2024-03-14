<template>
    <div class="reduceWorkEffectiveness">
        <div class="chart">
            <my-chart :width="432" :height="206" :option="state.option"></my-chart>
        </div>
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    showModel: false,
    option: {},
    title: [],
    //   立体柱状图左-右-上的颜色,左为主题颜色组
    colorList: ["#0BE6E6"],
    rightColorList: ["#1E93BC", "#AD7703"],
    topColorList: ["#27AFEA", "#EBAC23"],
    //   立体柱状图移动的位置
    // position: [-30, -10, 10, 30],
    position: [20, 10, 10, 30],
    xData: [
        "合计减少人工成本",
        "减少管理费用"
    ],
});
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
    location = [(location[0] + state.position[params.seriesIndex]), location[1]];
    var location1 = api.coord([api.value(0), 0]);
    location1 = [location1[0] + state.position[params.seriesIndex], location1[1]];
    const value = api.value(2); // 获取当前数据点的值
    const pos = api.coord([api.value(0), value]); // 获取当前数据点的坐标
    const group = {
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
            }
        ],
    };
    // const circle = {
    //     type: 'circle',
    //     position: pos,
    //     shape: {
    //         cx: 0,
    //         cy: 0,
    //         r: 10
    //     },
    //     style: {
    //         stroke: '#333',
    //         fill: '#fff'
    //     },
    //     textContent: {
    //         position: 'bottom',
    //         distance: 10,
    //         style: {
    //             fontSize: 12,
    //             fontWeight: 'bold'
    //         },
    //         content: String(value) // 将当前数据点的值作为标记显示文字
    //     }
    // };
    return group
}

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
            formatter: function (params) {
                let dom = `<div>${params[0].name}</div>`;
                params.forEach((item) => {
                    dom += `<div style="display: flex;align-items: center;"><span style="margin-right:4px;width:8px;height:8px;border-radius: 4px;background-color:${state.colorList[item.seriesIndex]
                        }"></span><div>${item.seriesName}&nbsp;&nbsp;${item.value
                        }</div></div>`;
                });
                return dom;
            },
        },
        grid: {
            left: "0",
            right: "30",
            top: "30",
            bottom: "20",
            containLabel: true,
        },
        legend: {
            data: [{
                name: "条形图例",
                itemStyle: {
                    color: '#0BE6E6',
                },
            }],
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            right: "30",
            top: "0",
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
                align: 'center', // 居中对齐
                margin: 10,
                fontSize: 12,
                color: "white",
            },
        },
        yAxis: {
            type: "value",
            name: "单位(亿元)",
            min: 0,
            max: 500,
            interval: 100,
            axisLine: {
                show: false,
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
            nameTextStyle: {
                color: "#fff",
                fontSize: 12,
            },
            axisTick: {
                alignWithLabel: true // 将刻度线与标签对齐
            },
            axisLabel: {
                show: true,
                fontSize: 12,
                color: "white",
            },
            boundaryGap: ["20%", "20%"],
        },
        series: [
            {
                barWidth: '50%', // 设置柱子宽度为整个类目间距的一半
                type: "custom",
                name: "条形图例",
                renderItem: (params, api) => renderItem(params, api),
            },
        ],
    };
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 2; i++) {
            let randomNum = Math.floor(Math.random() * 500);
            item.data.push(randomNum);
        }
    });
};

onMounted(() => {
    init();
});

</script>
<style lang="scss" scoped>
.reduceWorkEffectiveness {
    padding: 16px;
    box-sizing: border-box;
    width: 432px;
    height: 228px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;
}
</style>