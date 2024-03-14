<template>
    <div class="topicsDialog">
        <popup :width="1500" :height="689" title="事项清单" :showModel="props.showModel">
            <div class="contentBox">
                <div class="left" :style="{ 'width': isShow ? '280px' : '0', 'padding': isShow ? '12px' : '0' }">
                    <div class="title">
                        <h2 class="ttf">组织机构</h2>
                        <div class="refresh" @click="refresh">
                            <el-icon :class="{ 'refresh_active': isLoading }">
                                <Refresh />
                            </el-icon>
                            <span> 刷新</span>
                        </div>
                    </div>
                    <div class="input">
                        <el-input v-model="searchVaue" class="w-50 m-2" placeholder="请输入关键字搜索" :suffix-icon="Search" />
                    </div>
                    <div class="explan_retract">
                        <div style="display: flex;">
                            <div class="all_explan" :class="e_active === 1 ? 'active' : ''" @click="explanClick(1)">全展开
                            </div>
                            <div class="retract" :class="e_active === 2 ? 'active' : ''" @click="explanClick(2)">全收起</div>
                        </div>
                        <div class="fullName" @click="isChecked = !isChecked" :class="{ 'isChecked': isChecked }">
                            全称
                            <img :src="isChecked ? active : no_active" alt="" srcset="">
                        </div>
                    </div>
                    <div class="tree">
                        <div class="title"><el-icon>
                                <CaretBottom />
                            </el-icon>
                            <img src="@images/tripleAndLarge/国徽.png" alt="" srcset="">
                            <span>甘肃国资监管信息平台</span>
                        </div>
                        <el-scrollbar height="400px" max-height="400px" noresize>
                            <ul v-show="e_active === 1">
                                <li v-for="(item, index) in  state.enterpriseList" :key="index">
                                    <img src="@images/tripleAndLarge/企业.png" alt="" srcset="">
                                    <span>{{ item.title }}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="explan" @click="explan" :style="{ 'left': isShow ? '280px' : '0' }">
                    <el-icon v-if="!isShow">
                        <DArrowRight />
                    </el-icon>
                    <el-icon v-else>
                        <DArrowLeft />
                    </el-icon>
                </div>
                <div class="right" :style="{ 'width': isShow ? 'calc(1480px - 330px)' : '100%' }">
                    <search class="marginBox" :formList="state.formList" />
                    <ul class="echarts_box">
                        <li>
                            <h2 class="ttf">事项清单汇总</h2>
                            <my-chart :width="340" :height="206" :option="state.option"></my-chart>
                        </li>
                        <li>
                            <h2 class="ttf">
                                涉及法律审核情况
                            </h2>
                            <my-chart :width="340" :height="206" :option="state.option1"></my-chart>
                        </li>
                        <li>
                            <h2 class="ttf">
                                事项清单决策分布
                                <my-chart :width="340" :height="206" :option="state.option2"></my-chart>
                            </h2>
                        </li>
                    </ul>
                    <div class="search_box">
                        <div>
                            <h2 class="ttf">议题分类列表</h2>
                        </div>
                        <div class="input">
                            <el-input v-model="enterpriseValue" class="w-50 m-2" placeholder="请输入企业名称"
                                :suffix-icon="Search" />
                        </div>
                    </div>
                    <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="230px" />
                </div>
            </div>
        </popup>
    </div>
</template>
    
<script setup>
import * as echarts from "echarts";
import { hexToRgb } from "@/utils";
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import popup from "@components/popup/pop.vue";
import search from "@components/search/search.vue";
import customTable from "@components/customTable/customTable.vue";
import centerImg from "@images/payrollManagement/centerImg.svg";
import no_active from '@images/tripleAndLarge/非选中.png'
import active from '@images/tripleAndLarge/选中状态.png'
import active1 from '@images/tripleAndLarge/事项总数.png'
import active2 from '@images/tripleAndLarge/重大决策.png'
import active3 from '@images/tripleAndLarge/重要人事任免.png'
import active4 from '@images/tripleAndLarge/重大项目安排.png'
import active5 from '@images/tripleAndLarge/重大项目安排.png'
import imageBg from "@images/employeeAllocation/leftTop.png";
import line from "@images/employeeAllocation/line.png";
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
})
const state = reactive({
    formList: [
        {
            showType: 'state',
            label: '单位类型',
            value: '',
            activeIndex: 0,
            optionList: [
                {
                    label: '省属企业集团'
                },
                {
                    label: "市（州）国资监管机构"
                }
            ]
        },
        {
            showType: 'switch',
            value: '',
            label: '统计数量包含下载',
        }
    ],
    tableHeader: [
        {
            label: '企业名称',
            prop: 'exception'
        },
        {
            label: '事项总数',
            prop: 'meeting_Name',
            className: 'active',
            iconShow: true,
            icon: active1
        },
        {
            label: '重大决策',
            prop: 'topicName',
            className: 'active',
            iconShow: true,
            icon: active2
        },
        {
            label: '重要人事任免',
            prop: 'enterpriseName',
            className: 'active',
            iconShow: true,
            icon: active3
        },
        {
            label: '重大项目安排',
            prop: "exceptionDescription",
            className: 'active',
            iconShow: true,
            icon: active4
        },
        {
            label: '大额度资金运作',
            prop: 'rectificationTime',
            className: 'active',
            iconShow: true,
            icon: active5
        }
    ],
    tableData: [
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        }
    ],
    option: {},
    list: [
        {
            name: "大额资金运作",
            value: 351,
        },
        {
            name: "重大决策",
            value: 3184,
        },
        {
            name: "重大项目安排",
            value: 1253,
        },
        {
            name: "重要人事任免",
            value: 1253,
        },
    ],
    colorEnum: [
        {
            r: 241,
            g: 96,
            b: 108,
        },
        {
            r: 38,
            g: 194,
            b: 150,
        },
        {
            r: 24,
            g: 102,
            b: 229,
        },
        {
            r: 246,
            g: 187,
            b: 59,
        },
        {
            r: 72,
            g: 214,
            b: 255,
        },
        {
            r: 38,
            g: 194,
            b: 150,
        },
    ],
    option1: {},
    list1: [
        {
            name: "涉及法律审核",
            value: 948,
        },
        {
            name: "其他",
            value: 4816,
        },
    ],
    colorEnum1: [
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
    ],
    option2: {},
    xData2: [
        "股东会",
        "党委会",
        "董事会",
        "经理层办\n公会",
        "职代会",
        "其他",
        "",
        ""
    ],
    title2: ['计划数'],
    colorList2: ["#0BE6E6"],
    enterpriseList: [
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
    ]
})
const searchVaue = ref('')
const enterpriseValue = ref('')
const isShow = ref(true)
const e_active = ref(1)
const isChecked = ref(false)
const isLoading = ref(false)
const explan = () => {
    isShow.value = !isShow.value
}
const explanClick = (val) => {
    e_active.value = val
}
const refresh = () => {
    isLoading.value = true;
    // 执行刷新操作
    setTimeout(() => {
        isLoading.value = false;
    }, 3000);
}
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
                        width: 56,
                        height: 56,
                    },
                    left: "center",
                    top: "center",
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
                    origin: [28, 28],
                },
            ],
        },
        series: [
            {
                type: "pie",
                select: false,
                center: ["50%", "50%"],
                radius: ["50%", "65%"],
                label: {
                    show: true, // 显示标签
                    position: "outside", // 标签位置，可选值：'inside'、'outside'、'center'
                    formatter: (params) => {
                        return `{b|${params.name}}  {a${params.dataIndex}|${params.value} ${params.percent}}`;
                    }, // 标签内容，{b} 表示数据项名称，{c} 表示数据值，{d} 表示百分比
                    rich: {
                        // a0: {
                        //   color: `rgb(${state.colorEnum[0].r},${state.colorEnum[0].g},${state.colorEnum[0].b})`,
                        // },
                        // a1: {
                        //   color: `rgb(${state.colorEnum[1].r},${state.colorEnum[1].g},${state.colorEnum[1].b})`,
                        // },
                        // a2: {
                        //   color: `rgb(${state.colorEnum[2].r},${state.colorEnum[2].g},${state.colorEnum[2].b})`,
                        // },
                        // a3: {
                        //   color: `rgb(${state.colorEnum[3].r},${state.colorEnum[3].g},${state.colorEnum[3].b})`,
                        // },
                        // a4: {
                        //   color: `rgb(${state.colorEnum[4].r},${state.colorEnum[4].g},${state.colorEnum[4].b})`,
                        // },
                        // a5: {
                        //   color: `rgb(${state.colorEnum[5].r},${state.colorEnum[5].g},${state.colorEnum[5].b})`,
                        // },
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


//第二个图表
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
        const color = colorlist[i % 6];
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
const legendData1 = () => {
    return state.list1.map((item, index) => {
        const color = state.colorEnum1[index % 2];
        return {
            name: item.name,
            itemStyle: {
                color: `rgb(${color.r}, ${color.g}, ${color.b})`,
            },
        };
    });
};
const init1 = () => {
    const dataTotal = state.list1.reduce((prev, curr) => prev + curr.value, 0);
    state.list1.forEach((item, idx) => {
        item.percent = item.value / dataTotal;
        item.angle = item.percent * Math.PI * 2; // 弧度制的角度
        if (idx == 0) {
            item.startAngle = 0;
            item.endAngle = item.angle;
        } else {
            item.startAngle =
                state.list1[idx - 1].startAngle + state.list1[idx - 1].angle;
            item.endAngle = item.startAngle + item.angle;
        }
    });
    state.option1 = {
        tooltip: {
            backgroundColor: "rgba(255,255,255,.1)",
            textStyle: {
                color: "#fff", // 设置文本颜色，可根据需要调整
            },
            borderColor: "transparent",
            extraCssText: "backdrop-filter: blur(8px);",
            trigger: "item",
            formatter: function (params) {
                var tooltipContent = `${params.name} ${params.value}%`; // 自定义tooltip内容
                const color = state.colorEnum[params.dataIndex % 2];
                return `<div><span style="width:10px;height:10px;border-radius:50%;background-color:rgb(${color.r}, ${color.g}, ${color.b});margin-right:6px;display:inline-block;"></span>${tooltipContent}</div>`;
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    style: {
                        image: imageBg,
                        width: 168,
                        height: 168,
                    },
                    left: "0",
                    top: "center",
                },
                {
                    type: "image",
                    style: {
                        image: line,
                        width: 150,
                        height: 1,
                    },
                    right: "0",
                    top: "center",
                },
                {
                    type: 'rect',
                    shape: {
                        x: 100, // 矩形左上角的 x 坐标
                        y: 100, // 矩形左上角的 y 坐标
                        width: 10, // 矩形的宽度
                        height: 10 // 矩形的高度
                    },
                    style: {
                        fill: '#1866E5' // 矩形的填充色
                    },
                    right: "130",
                    top: "70",
                },
                {
                    type: 'rect',
                    shape: {
                        x: 100, // 矩形左上角的 x 坐标
                        y: 100, // 矩形左上角的 y 坐标
                        width: 10, // 矩形的宽度
                        height: 10 // 矩形的高度
                    },
                    style: {
                        fill: '#F1606C' // 矩形的填充色
                    },
                    right: "130",
                    top: "125",
                },
                {
                    type: "image",
                    style: {
                        image: centerImg,
                        width: 64,
                        height: 64,
                    },
                    left: "50",
                    top: "center",
                },
                {
                    type: "text",
                    right: "10",
                    top: "68",
                    style: {
                        text: `${state.list1[0].value}`, // 要显示的文本内容
                        fill: "#1866E5", // 文本颜色
                        fontSize: 20, // 字体大小
                    },
                },
                {
                    type: "text",
                    right: "10",
                    bottom: "65",
                    style: {
                        text: `${state.list1[1].value}`, // 要显示的文本内容
                        fill: "#F1606C", // 文本颜色
                        fontSize: 20, // 字体大小
                    },
                },
                {
                    type: "text",
                    top: "90",
                    left: "57",
                    style: {
                        text: `事项总数`, // 要显示的文本内容
                        fill: "#0093FF", // 文本颜色
                        fontSize: 12, // 字体大小
                    },
                },
                {
                    type: "text",
                    top: "110",
                    left: "64",
                    style: {
                        text: `5764`, // 要显示的文本内容
                        fill: "#fff", // 文本颜色
                        fontSize: 12, // 字体大小
                    },
                },
            ],
        },
        legend: [
            {
                data: legendData1(),
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                    lineHeight: 14,
                },
                icon: "none",
                orient: "vertical",
                top: "65",
                right: "45",
                itemWidth: 6, // 图例标记的宽度
                itemHeight: 6, // 图例标记的高度
                itemGap: 40,
            },
        ],
        series: [
            {
                type: "pie",
                select: false,
                center: ["25%", "50%"],
                radius: ["55%", "65%"],
                label: {
                    show: true, // 显示标签
                    fontSize: 12, // 标签字体大小
                    color: "#fff",
                    position: 'inside', // 标签显示在饼图外面
                    formatter: function (params) {
                        return `{img|${params.value} }  `;
                    },
                    rich: {
                        img: {
                            backgroundColor: {
                                image: 'https://z1.ax1x.com/2023/09/22/pPo3r7D.png'// 背景图片地址
                            },
                            backgroundSize: ['100%', '100%'], // 背景图片尺寸
                            backgroundPosition: 'center', // 背景图片位置居中
                            height: 20, // 背景图片高度
                            width: 40, // 背景图片宽度
                            align: 'center', // 水平居中
                            verticalAlign: 'middle' // 垂直居中
                        },
                        txt: {
                            color: '#000',
                            fontSize: 12
                        }
                    },
                },

                data: setGradientColorInItemSyle(state.list1, state.colorEnum1),
            },
        ],
    };
};

// // legenData处理
// const legendData2 = () => {
//     return state.title2.map((item, index) => {
//         return {
//             name: item,
//             itemStyle: {
//                 color: state.colorList2[index],
//             },
//         };
//     });
// };
const init2 = () => {
    state.option2 = {
        grid: {
            left: "50",
            right: "20",
            top: "40",
            bottom: "60",
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
        // legend: {
        //     data: legendData2(),
        //     textStyle: {
        //         color: "#fff",
        //         fontSize: 12,
        //     },
        //     left: "center",
        //     top: "15",
        //     itemWidth: 12, // 图例标15的宽度
        //     itemHeight: 6, // 图例标记的高度
        // },
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
                data: state.xData2,
                axisTick: {
                    alignWithLabel: true,
                },
                axisPointer: {
                    type: "shadow",
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    interval: 0,

                },
                axisLine: {
                    // 设置x轴的颜色
                    lineStyle: {
                        color: "#0BE6E6",
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "单位(个)",
                min: 0,
                max: 150,
                interval: 30,
                axisTick: {
                    alignWithLabel: true,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        opacity: 0.3,
                        color: ["#EBAC23"],
                    },
                },
                axisLabel: {
                    show: true,
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
                name: "计划数",
                type: "bar",
                barWidth: 6,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#0BE6E6" }, // 渐变起始颜色
                        { offset: 1, color: hexToRgb("#0BE6E6", 0) }, // 渐变终止颜色
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
                barGap: "60%",
                label: {
                    show: true,
                    color: '#0BE6E6',
                    formatter: "{c}",
                    position: 'top',
                    // backgroundColor: "#fff",
                    // width: 8,
                    // height: 8,
                    // position: "top",
                    // offset: [0, 7],
                    // borderWidth: 4,
                    // borderColor: "rgba(255,255,255,0.2)",
                    // borderRadius: 4,
                    // shadowColor: "#fff",
                    // shadowBlur: 16,
                },
                graphic: {
                    elements: [{
                        type: 'circle',
                        shape: {
                            cx: 0,
                            cy: -10,
                            r: 10
                        },
                        style: {
                            fill: '#409EFF'  // 圆圈颜色
                        },
                        left: '50%',  // 决定圆圈位置居中
                        top: '5%'
                    }, {
                        type: 'text',
                        style: {
                            textVerticalAlign: 'middle',
                            textAlign: 'center',
                            fill: '#fff'
                        },
                        left: '50%',
                        top: '5%',
                        z: 100,
                        silent: true,
                        shape: {
                            width: 40,  // 文字区域宽度
                            height: 20  // 文字区域高度
                        },
                        text: function (data) {
                            return data.value
                        }
                    }]
                }
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
    state.option2.series.forEach((item) => {
        item.data = [];
        for (let i = 0; i < 7; i++) {
            let randomNum = Math.floor(Math.random() * 150);
            item.data.push(randomNum);
        }
    });
};
onMounted(() => {
    init();
    init1()
    init2()
    window.addEventListener('resize', () => init())
});


onUnmounted(() => {
    window.addEventListener('resize', () => null)
})
</script>
    
<style lang="scss" scoped>
.topicsDialog {
    display: flex;

    .contentBox {
        margin-top: 20px;
        display: flex;
        position: relative;

        .explan {
            position: absolute;
            z-index: 100;
            top: 100px;
            width: 18px;
            height: 40px;
            cursor: pointer;
            line-height: 40px;
            text-align: center;
            border-radius: 0px 4px 4px 0px;
            box-sizing: border-box;
            border-width: 1px 1px 1px 0px;
            border-style: solid;
            border-color: #4CB3F3;
            backdrop-filter: blur(10px);
            color: #fff;

        }
    }

    .left {
        width: 280px;
        height: 581px;
        border-radius: 10px;
        background: linear-gradient(154deg, rgba(129, 206, 255, 0.08) 24%, rgba(129, 206, 255, 0.19) 85%);
        box-sizing: border-box;
        border: 1px solid #4CB3F3;
        position: relative;
        padding: 12px;
        overflow: hidden;

        .title {
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

            .refresh {
                cursor: pointer;
                display: flex;
                align-items: center;

                span {
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 16px;
                    letter-spacing: 0em;
                    color: rgba(96, 188, 255, 0.8);
                }

                .el-icon {
                    color: #60BCFF;
                }

                .refresh_active {
                    transition: transform .5s ease;
                    animation: rotate 1.2s linear infinite;
                }

                @keyframes rotate {
                    to {
                        transform: rotate(360deg);
                    }
                }
            }

        }

        :deep(.input) {
            margin-top: 12px;

            .el-input {

                .el-input__wrapper {
                    width: 100%;
                    height: 100%;
                    border-top: 1px solid #11518C;
                    border-bottom: 1px solid #1D80CF;
                    border-left: 1px solid;
                    border-right: 1px solid;
                    border-image: linear-gradient(180deg, rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2;
                    background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
                    padding: 2px 11px;
                    box-sizing: border-box;
                    box-shadow: none;
                }

                .el-input__inner {
                    color: #fff;
                }

                .el-input__inner::placeholder {
                    color: #fff;
                    font-size: 14px;
                }
            }

            .el-icon {
                color: #fff;
            }
        }


        .explan_retract {
            margin-top: 8px;
            display: flex;
            justify-content: space-between;

            .active {
                font-size: 14px;
                line-height: 16px;
                color: #fff !important;
                background: rgba(0, 147, 255, 0.8);
            }

            .all_explan,
            .retract {
                cursor: pointer;
                font-size: 14px;
                width: 60px;
                text-align: center;
                line-height: 24px;
                padding: 4px 9px;
                height: 24px;
                border-radius: 4px 0px 0px 4px;
                opacity: 1;
                border: 1px solid #1D83CF;
                color: rgba(96, 188, 255, 0.8);

            }

            .fullName {
                cursor: pointer;
                width: 52px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                border-radius: 4px;
                padding: 4px 9px;
                opacity: 1;
                background: linear-gradient(0deg, rgba(0, 155, 255, 0.00) 0%, rgba(0, 155, 255, 0.30) 100%);
                border: 1px solid;
                border-image: linear-gradient(180deg, rgba(28, 133, 212, 0.21) 0%, rgba(32, 153, 245, 0.40) 100%) 1;
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0em;
                color: #B5B6BF;
                position: relative;

                img {
                    width: 18px;
                    height: 16px;
                    right: 0;
                    bottom: 0;
                    position: absolute;
                }
            }

            .fullName.isChecked {
                color: #fff;
            }
        }

        .tree {
            margin-top: 20px;

            .title {
                display: flex;
                justify-content: flex-start;

                .el-icon {
                    color: #fff;
                    font-size: 20px;
                    margin-right: 5px;
                }

                img {
                    width: 18px;
                    height: 18px;
                    margin-right: 5px;
                }

                span {
                    color: #fff;
                    font-size: 14px;
                }
            }

            ul {
                margin-top: 26px;
                margin-left: 38px;

                li {
                    margin-bottom: 26px;
                    display: flex;
                    align-items: center;

                    img {
                        width: 18px;
                        height: 18px;
                        margin-right: 4px;
                    }

                    span {
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 14px;
                        color: #fff;
                    }
                }
            }

            // ul::-webkit-scrollbar {
            //     width: 0 !important;
            // }
        }

    }

    .right {
        margin-left: 34px;

        .echarts_box {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;

            li {
                width: 370px;
                height: 224px;
                background: linear-gradient(116deg, rgba(129, 206, 255, 0.08) 14%, rgba(129, 206, 255, 0.19) 85%);
                box-sizing: border-box;
                border: 1px solid #4CB3F3;
                backdrop-filter: blur(10px);
                padding: 12px;
                border-radius: 10px;
                box-sizing: border-box;

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

            li:not(:last-child) {
                margin-right: 24px;
            }

        }

        .search_box {
            margin-top: 23px;
            margin-bottom: 17px;
            display: flex;
            align-items: center;
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

            :deep(.input) {

                .el-input {
                    width: 200px;
                    height: 32px;

                    .el-input__wrapper {
                        width: 100%;
                        height: 100%;
                        border-top: 1px solid #11518C;
                        border-bottom: 1px solid #1D80CF;
                        border-left: 1px solid;
                        border-right: 1px solid;
                        border-image: linear-gradient(180deg, rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2;
                        background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
                        padding: 2px 11px;
                        box-sizing: border-box;
                        box-shadow: none;
                    }

                    .el-input__inner {
                        color: #fff;
                    }

                    .el-input__inner::placeholder {
                        color: #fff;
                        font-size: 14px;
                    }
                }

                .el-icon {
                    color: #fff;
                }
            }
        }
    }

}
</style>