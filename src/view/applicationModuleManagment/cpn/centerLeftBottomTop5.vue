<template>
    <div class="centerLeftBottomTop5">
        <topTitle title="数据量TOP5" :is-other-text="false" :is-date-show="false" />
        <div class="tableBox">
            <ScrollTable :tableData="state.tableData" :options="state.options"
                :colorList="state.options.map(item => item.prop).slice(2)" :IndexColorList="state.IndexColorList"
                :hasIndex="true" hasIndexTitle="排名">
            </ScrollTable>
        </div>
    </div>
</template>
    
<script setup>
import ScrollTable from "@/components/ScrollTable/index.vue";
import { reactive } from "vue";
const state = reactive({
    options: [
        { prop: "name", label: "名称" },
    ],
    tableData: [
        {
            name: "国资数据资源中心",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
        },
        {
            name: "国企改革在线监督",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
        },
        {
            name: "大额资金动态监控",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
        },
        {
            name: "财务监督管理",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
        },
        {
            name: "“三重一大”决策和运行监管系统",
            lastalarmTime: "债券名称",
            numberOfAlarms: "发行时间",
        },
    ],
    IndexColorList: [
        {
            color: '#E47200',
            background: 'linear-gradient(180deg, #FFEDA8 0%, #FED035 56%, #FFCD2C 100%)'
        },
        {
            color: '#4A74B0',
            background: 'linear-gradient(180deg, #E2EEFA 0%, #ADC7E8 56%, #95AFCA 100%)'
        },
        {
            color: ' #924C06',
            background: 'linear-gradient(180deg, #FBEDE4 0%, #D8BBAB 56%, #AF7B65 100%)'
        }
    ]
});
</script>
    
<style lang="scss" scoped>
.centerLeftBottomTop5 {
    padding: 16px;
    box-sizing: border-box;
    width: 432px;
    height: 240px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;
}
</style>