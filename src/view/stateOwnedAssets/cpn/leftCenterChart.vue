<template>
    <div class="leftCenterChart">
        <div class="chart">
            <my-chart :width="432" :height="206" :option="state.option"></my-chart>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, onMounted, onBeforeMount, ref, nextTick } from "vue";
import emitBus from "@/utils/bus";
const refRightTopDialog = ref(null);
const state = reactive({
    showModel: false,
    option: {},
    list: [
        {
            name: "认定损失风险(万元)",
            value: 5000,
        },
        {
            name: "认定损失（万元）",
            value: 8000,
        },
    ],
    colorEnum: [
        {
            r: 72,
            g: 214,
            b: 255,
        },
        {
            r: 24,
            g: 102,
            b: 229,
        },

    ],
});
const more = async () => {
    state.showModel = true;
    await nextTick();
    refRightTopDialog.value.init();
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

    let seriesArr = [];
    let titleArr = [];
    for (let i = 0; i < state.list.length; i++) {
        let color = state.colorEnum[i];
        titleArr.push({
            text: state.list[i].name,
            left: i * 50 + 25 + "%",
            top: "75%",
            textAlign: "center",
            textStyle: {
                fontSize: "16",
                color: "#fff",
                textAlign: "center",
            },
        });
        let max = Math.max(state.list[0].value, state.list[1].value)
        let num = 1
        for (let index = 0; index < max.toString().length; index++) {
            num += '0'
        }
        seriesArr.push({
            name: state.list[i].name,
            type: "pie",
            select: false,
            center: [`${i * 50 + 25}%`, "45%"],
            radius: ["40%", "50%"],
            label: {
                show: true,
                position: "center",
                fontSize: 20,
                color: `rgb(${color.r},${color.g},${color.b})`,
                formatter: function (params) {
                    return params.value;
                },
            },
            startAngle: 0,
            emphasis: {
                disabled: true,
            },
            data: [
                ...setGradientColorInItemSyle([state.list[i]], [state.colorEnum[i]]),
                {
                    value: 1,
                    itemStyle: { color: "#fff", borderWidth: 1, borderColor: "#fff" },
                },
                {
                    name: "invisible",
                    value: (num - state.list[i].value) - 1,
                    itemStyle: { color: "rgba(255,255,255,.15)" },
                    label: {
                        formatter: state.list[i].value + '',
                        fontSize: 20,
                        color: `rgb(${color.r},${color.g},${color.b})`,
                    },
                },
            ],
        });
    }
    state.option = {
        tooltip: {
            show: false,
        },
        series: seriesArr,
        title: titleArr,
    };
};

onMounted(() => {
    init();
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
});

onBeforeMount(() => {
    emitBus.off("closeModel");
});
</script>
      
<style lang="scss" scoped>
.leftCenterChart {
    width: 420px;
    height: 206px;
    margin-bottom: 50px;
    position: relative;

    .more {
        position: absolute;
        right: 4px;
        top: 14px;
        cursor: pointer;
        color: rgba(214, 239, 255, 0.6);
        font-size: 14px;

        &:hover {
            color: rgba(214, 239, 255, 1);
        }
    }

    .chart {
        background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    }
}
</style>
      