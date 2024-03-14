<template>
    <div class="leftCenterChart">
        <my-chart :width="864" :height="206" :option="state.option" :highlight="true" :length="5"></my-chart>
    </div>
</template>
    
<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import centerImg from "@images/payrollManagement/centerImg.svg";
const state = reactive({
    option: {},
    list: [
        {
            name: "企业上报",
            value: 1.234,
        },
        {
            name: "其他部门移送",
            value: 1.234,
        },
        {
            name: "专项检查",
            value: 1.234,
        },
        {
            name: "外部移送",
            value: 1.234,
        },
        {
            name: "委内移送",
            value: 1.234,
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
});

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
        title: {
            text: "352",
            textStyle: {
                fontSize: 24,
                color: "#fff",
            },
            subtextStyle: {
                fontSize: 18,
                color: "#a3befa",
                rich: {
                    a: {
                        fontSize: 14,
                        color: '#6BDAFF',
                        padding: [0, 0, 10, 0],
                    },
                },
            },
            top: "90",
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
                radius: ["60%", "75%"],
                label: {
                    show: true, // 显示标签
                    position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: (params) => {
                        return `{a${params.dataIndex}|${params.value}}   {a${params.dataIndex}|${20}%}  {b|${params.name}}`;
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

</script>
    
<style lang="scss" scoped>
.leftCenterChart {
    width: 864px;
    height: 206px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    margin-bottom: 50px;
}
</style>