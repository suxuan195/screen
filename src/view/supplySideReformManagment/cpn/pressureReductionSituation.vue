<template>
    <div class="pressureReductionSituation">
        <div class="topBox">
            <h2 class="ttf" v-show="state.tag == 1">2016年05月至2018年11月压减情况变化分析</h2>
            <h2 class="ttf leftTitle" v-show="state.tag == 2">压减涉及职工人数</h2>
            <h2 class="ttf rightTitle" v-show="state.tag == 2">压减方式占比情况</h2>
            <selectTab :optionList="state.optionList" width="240px" @selectChange="selectChange" class="rightSelect" />
        </div>
        <div class="chart" v-show="state.tag == 1">
            <my-chart :width="864" :height="200" :option="state.option"></my-chart>
        </div>
        <div class="other" v-show="state.tag == 2">
            <CommonChart :option="state.option1" :canvasWidth="400" :canvasHeight="180" style="margin-top: 20px;" />
            <CommonChart :option="state.option2" :canvasWidth="400" :canvasHeight="180"
                style="margin-top: 20px;margin-left: 20px" />
        </div>
    </div>
</template>
    
<script setup>
import {
    reactive, onMounted,
    onUnmounted
} from 'vue'
import * as echarts from "echarts";
import selectTab from './selectTab.vue';
import CommonChart from "@components/Chart/ComonChart.vue";
import border from "@images/payrollManagement/border-1.svg";
import border1 from "@images/payrollManagement/border-2.svg";
import centerImg from "@images/payrollManagement/centerImg.svg";
const state = reactive({
    optionList: [{
        value: 1,
        label: '压减变化情况',
    },
    {
        value: 2,
        label: '压减人数及方式',
    },],
    showModel: false,
    option: {},
    colorList: ["#EBAC23", "#0BE6E6", "#AAFDFD"],
    title: ["累计减压总数", "累计新增总数", "法人单位总数"],
    xData: ["201605", "201611", "201704", "201708", "201712", "201804", "201808", "201811"],
    tag: 1,
    option1: {},
    list: [
        {
            name: "基本薪资",
            value: 50,
        },
        {
            name: "绩效薪资",
            value: 30,
        },
        {
            name: "任期激励收入",
            value: 20,
        },
    ],
    list2: [
        {
            name: '子改分',
            value: 75
        },
        {
            name: '分改子',
            value: 25
        },
    ],
    colorEnum: [
        {
            r: 60,
            g: 151,
            b: 241,
        },
        {
            r: 9,
            g: 186,
            b: 224,
        },
        {
            r: 162,
            g: 162,
            b: 86,
        },
    ],
    colorEnum2: [
        {
            r: 60,
            g: 151,
            b: 241,
        },
        {
            r: 162,
            g: 162,
            b: 86,
        },

    ],
    option2: {}
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
const selectChange = (val) => {
    state.tag = val
}
const init = () => {
    state.option = {
        grid: {
            left: "40",
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
            itemGap: 30,
            right: "center",
            top: "0",
            itemWidth: 12, // 图例标记的宽度
            itemHeight: 6, // 图例标记的高度
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
                name: "单位(人数)",
                min: 0,
                max: 6000,
                interval: 1500,
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
                name: '累计减压总数',
                type: "line",
                smooth: true,
                lineStyle: {
                    color: 'rgba(235, 172, 35,1)',
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
                                color: 'rgba(235, 172, 35, 0.75)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(235, 172, 35, 0)'
                            },
                        ],
                        false
                    ),
                    shadowColor: 'rgba(235, 172, 35, 0.4)', //阴影颜色
                    shadowBlur: 20,
                },
            },
            {
                name: '累计新增总数',
                type: "line",
                smooth: true,
                lineStyle: {
                    color: 'rgba(60,151,241,1)',
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: '#0BE6E6', // 圆点的颜色
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
                                color: 'rgba(60,151,241,0.75)',
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
            },
            {
                name: '法人单位总数',
                type: "line",
                smooth: true,
                lineStyle: {
                    color: 'rgba(170, 253, 253,1)',
                },
                symbol: "circle", // 圆点的形状
                symbolSize: 6, // 圆点的大小
                itemStyle: {
                    color: '#AAFDFD', // 圆点的颜色
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
                                color: 'rgba(11, 230, 230,0.75)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(11, 230, 230,0)'
                            },
                        ],
                        false
                    ),
                    shadowBlur: 20,
                },
            }
        ],
    };
    state.option.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 13; i++) {
            let randomNum = Math.floor(Math.random() * 6000);
            item.data.push(randomNum);
        }
    });
};


const getLocation1 = (dx, dy) => {
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

const getCoordinates1 = (startArc, endArc) => {
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
    return getLocation1(dx, dy);
};

const setGradientColorInItemSyle1 = (
    data,
    colorlist,
    startOpacity = 0,
    endOpacity = 1
) => {
    for (let i = 0; i < data.length; i++) {
        const color = colorlist[i];
        const startAngle = data[i].startAngle;
        const endAngle = data[i].endAngle;
        // 这里计算了 线性渐变的起止方向
        // @ts-ignore
        const coordinates = getCoordinates1(startAngle, endAngle);
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
        tooltip: {
            trigger: "item",
            formatter: function (params) {
                var tooltipContent = `${params.name} ${params.value}%`; // 自定义tooltip内容
                const color = state.colorEnum[params.dataIndex];
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 64,
                        height: 64,
                    },
                    left: "58",
                    top: "64",
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
                    origin: [32, 32],
                },
                {
                    type: "image",
                    style: {
                        image: border,
                        width: 170,
                        height: 170,
                    },
                    left: "5",
                    top: "10",
                },
            ],
        },
        xAxis: {
            type: "value",
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            max: 100,
        },
        yAxis: [
            {
                type: "category",
                inverse: true,
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
            },
            {
                type: "category",
                inverse: true,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    inside: true,
                    formatter: function (value, index) {
                        let textStyle = index % 3 === 0 ? "b" : index % 3 === 1 ? "c" : "d";
                        return `{${textStyle}|${value}}{a|%}`;
                    },
                    rich: {
                        a: {
                            fontSize: 14, // 数值的字体大小
                            padding: [8, 0, 0, 5],
                        },
                        b: {
                            color: "rgba(24,102,229,.8)",
                            fontSize: 24,
                            fontWeight: 600,
                        },
                        c: {
                            color: "rgba(8,188,255,.8)",
                            fontSize: 24,
                            fontWeight: 600,
                        },
                        d: {
                            color: "rgba(246,187,59,.8)",
                            fontSize: 24,
                            fontWeight: 600,
                        },
                    },
                    verticalAlign: "bottom",
                    // 位置 上右下左
                    padding: [0, 0, 5, -40],
                    lineHeight: "36",
                    color: "#fff",
                },
                // 统计的总量 用纵坐标模拟
                data: state.list,
            },
        ],
        grid: {
            top: 50,
            left: "55%",
            right: "0%",
            bottom: 0,
            containLabel: true,
        },
        title: [
            {
                text: "{marker|●}普通员工",
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                    rich: {
                        marker: {
                            color: "rgb(24,102,229)",
                            fontSize: 8,
                            padding: [0, 5, 0, 0], // 调整圆点与文字之间的距离
                        },
                    },
                },
                top: "45",
                right: "110",
            },
            {
                text: "{marker|●}管理人员",
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                    rich: {
                        marker: {
                            color: "rgb(8,188,255)",
                            fontSize: 8,
                            padding: [0, 5, 0, 0], // 调整圆点与文字之间的距离
                        },
                    },
                },
                top: "90",
                right: "110",
            },
            {
                text: "{marker|●}劳务派遣员",
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                    rich: {
                        marker: {
                            color: "rgb(246,187,59)",
                            fontSize: 8,
                            padding: [0, 5, 0, 0], // 调整圆点与文字之间的距离
                        },
                    },
                },
                top: "128",
                right: "100",
            },
        ],
        series: [
            {
                type: "bar",
                itemStyle: {
                    color: "#37ffea",
                    opacity: 0.7,
                },
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 8,
                    height: 8,
                    position: "right",
                    offset: [-7, 0],
                    borderWidth: 4,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 4,
                    shadowColor: "#fff",
                    shadowBlur: 16,
                },
                showBackground: true,
                silent: true,
                barWidth: 4,
                barGap: "-100%", // Make series be overlap
                data: state.list,
            },
            {
                type: "pie",
                emphasis: {
                    // 禁用鼠标移入放大效果
                    scale: false,
                },
                select: false,
                center: ["89", "96"],
                radius: ["50%", "75%"],
                label: {
                    show: true, // 显示标签
                    position: "inside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: "{c}%", // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
                    fontSize: 12, // 标签字体大小
                    color: "#fff",
                    backgroundColor: {
                        image: border1, // 设置背景图的 URL
                    },
                    width: 37,
                    height: 16, // 设置背景图的高度
                },
                data: setGradientColorInItemSyle1(state.list, state.colorEnum),
                labelLine: false,
            },
        ],
    };
};

const getLocation2 = (dx, dy) => {
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

const getCoordinates2 = (startArc, endArc) => {
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
    return getLocation2(dx, dy);
};
const setGradientColorInItemSyle2 = (
    data,
    colorlist,
    startOpacity = 0,
    endOpacity = 1
) => {
    for (let i = 0; i < data.length; i++) {
        const color = colorlist[i];
        const startAngle = data[i].startAngle;
        const endAngle = data[i].endAngle;
        // 这里计算了 线性渐变的起止方向
        // @ts-ignore
        const coordinates = getCoordinates2(startAngle, endAngle);
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
const init2 = () => {
    const dataTotal = state.list2.reduce((prev, curr) => prev + curr.value, 0);
    state.list2.forEach((item, idx) => {
        item.percent = item.value / dataTotal;
        item.angle = item.percent * Math.PI * 2; // 弧度制的角度
        if (idx == 0) {
            item.startAngle = 0;
            item.endAngle = item.angle;
        } else {
            item.startAngle =
                state.list2[idx - 1].startAngle + state.list2[idx - 1].angle;
            item.endAngle = item.startAngle + item.angle;
        }
    });
    state.option2 = {
        tooltip: {
            trigger: "item",
            formatter: function (params) {
                var tooltipContent = `${params.name} ${params.value}%`; // 自定义tooltip内容
                const color = state.colorEnum[params.dataIndex];
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 64,
                        height: 64,
                    },
                    left: "58",
                    top: "64",
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
                    origin: [32, 32],
                },
            ],
        },
        xAxis: {
            type: "value",
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            max: 100,
        },
        yAxis: [
            {
                type: "category",
                inverse: true,
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
            },
            {
                type: "category",
                inverse: true,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    inside: true,
                    formatter: function (value, index) {
                        return `{${index % 2 === 0 ? 'b|' : 'c|'}${value}}%`;
                    },
                    rich: {
                        a: {
                            fontSize: 14, // 数值的字体大小
                            padding: [8, 0, 0, 5],
                        },
                        b: {
                            color: "rgba(24,102,229,.8)",
                            fontSize: 24,
                            fontWeight: 600,
                        },
                        c: {
                            color: "rgba(162,162,86,.8)",
                            fontSize: 24,
                            fontWeight: 600,
                        },
                    },
                    verticalAlign: "bottom",
                    // 位置 上右下左
                    padding: [0, 0, 5, -40],
                    lineHeight: "36",
                    color: "#fff",
                },
                // 统计的总量 用纵坐标模拟
                data: state.list2,
            },
        ],
        grid: {
            top: 50,
            left: "55%",
            right: "0%",
            bottom: 0,
            containLabel: true,
        },
        title: [
            {
                text: "{marker|●}子改分",
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                    rich: {
                        marker: {
                            color: "rgb(60,151,241)",
                            fontSize: 8,
                            padding: [0, 5, 0, 0], // 调整圆点与文字之间的距离
                        },
                    },
                },
                top: "55",
                right: "130",
            },
            {
                text: "{marker|●}子改分",
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                    rich: {
                        marker: {
                            color: "rgb(162,162,86)",
                            fontSize: 8,
                            padding: [0, 5, 0, 0], // 调整圆点与文字之间的距离
                        },
                    },
                },
                top: "120",
                right: "130",
            },
        ],
        series: [
            {
                type: "bar",
                itemStyle: {
                    color: "#37ffea",
                    opacity: 0.7,
                },
                label: {
                    show: true,
                    formatter: "",
                    backgroundColor: "#fff",
                    width: 8,
                    height: 8,
                    position: "right",
                    offset: [-7, 0],
                    borderWidth: 4,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 4,
                    shadowColor: "#fff",
                    shadowBlur: 16,
                },
                showBackground: true,
                silent: true,
                barWidth: 4,
                barGap: "-100%", // Make series be overlap
                data: state.list2,
            },
            {
                type: "pie",
                emphasis: {
                    // 禁用鼠标移入放大效果
                    scale: false,
                },
                select: false,
                center: ["89", "96"],
                radius: ["50%", "75%"],
                label: {
                    show: true, // 显示标签
                    position: "inside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: "{c}%", // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
                    fontSize: 12, // 标签字体大小
                    color: "#fff",
                    backgroundColor: {
                        image: border1, // 设置背景图的 URL
                    },
                    width: 37,
                    height: 16, // 设置背景图的高度
                },
                data: setGradientColorInItemSyle2(state.list2, state.colorEnum2),
                labelLine: false,
            },
        ],
    };
};
onMounted(() => {
    init()
    init1()
    init2()
    window.addEventListener('resize', () => init())
})
onUnmounted(() => {
    window.addEventListener('resize', () => null)
})

</script>
    
<style lang="scss" scoped>
.pressureReductionSituation {
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
        position: relative;

        .leftTitle {
            position: absolute;
            left: 0;
        }

        .rightTitle {
            position: absolute;
            left: 430px;
        }

        .rightSelect {
            position: absolute;
            right: 0;
        }

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
        display: flex;
    }
}
</style>