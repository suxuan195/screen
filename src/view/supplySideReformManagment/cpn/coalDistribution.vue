<template>
    <div class="coalDistribution">
        <selectTab :optionList="state.optionList" width="100px" class="rightFixed" @selectChange="selectChange" />
        <my-chart :width="888" :height="222" :option="state.option"></my-chart>
    </div>
</template>
    
<script setup>
import selectTab from './selectTab.vue';
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
const state = reactive({
    optionList: [{
        label: '整合前',
        value: 0
    }, {
        label: '截止2018年前',
        value: 1
    }],
    bar: ["境外投资项目", "承包工程项目"],
    option: {},
    xData: [
        "国家投资集团",
        "中国石化",
        "中国石油",
        "中国中铁二十一局",
        "交通运输",
        "教育",
        "金融业",
        "中国石油",
        "中国中铁二十一局",
        "中国石油",
        "中国中铁二十一局",
        "中国石油",
        "中国中铁二十一局",
    ],
    title: ["条形图例"],
    colorList: ["#AAFDFD", "#EBAC23"],
    mainColor: "#AAFDFD",
})


const selectChange = (e) => {
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 7; i++) {
            let randomNum = Math.floor(Math.random() * 1500);
            item.data.push(randomNum);
        }
    });
    state.mainColor = state.colorList[e];
    init()
};

// legenData处理
const legendData = () => {
    return state.title.map((item, index) => {
        return {
            name: item,
            itemStyle: {
                color: state.mainColor,
            },
        };
    });
};
const init = () => {
    state.option = {
        grid: {
            left: "50",
            right: "20",
            top: "30",
            bottom: "40",
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
            left: "150",
            top: "0",
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
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
                type: "category",
                data: state.xData,
                axisTick: {
                    alignWithLabel: true,
                },
                axisPointer: {
                    type: "shadow",
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    interval: 0
                },
                axisLine: {
                    // 设置x轴的颜色
                    lineStyle: {
                        color: state.mainColor,
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "单位(万吨/年)",
                min: 0,
                max: 1500,
                interval: 300,
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        opacity: 0.3,
                        color: [state.mainColor],
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
                name: "条形图例",
                type: "bar",
                barWidth: 6,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: state.mainColor }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb(state.mainColor, 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
                label: {
                    show: true,
                    position: "top",
                    textStyle: {
                        // 使用渐变色
                        color: state.mainColor,
                        fontSize: 12
                    }
                },
            },
        ],
        dataZoom: {
            show: true, // 为true 滚动条出现
            realtime: true,
            type: "inside", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
            start: 0, // 表示默认展示20%～80%这一段。
            end: 60,
            zoomOnMouseWheel: false,
        },
    };
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 7; i++) {
            let randomNum = Math.floor(Math.random() * 1500);
            item.data.push(randomNum);
        }
    });
};
onMounted(() => {
    init();
});
</script>
    
<style lang="scss" scoped>
.coalDistribution {
    padding: 16px;
    box-sizing: border-box;
    width: 888px;
    height: 228px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;
    padding: 16px;
    position: relative;

    .rightFixed {
        position: absolute;
        right: 16px;
    }
}
</style>