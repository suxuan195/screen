<template>
    <div class="centerLeftBottomTop5">
        <topTitle title="应用列表" :is-other-text="false" :is-date-show="false" />
        <div class="tableBox">
            <ScrollTable :tableData="state.tableData" :options="state.options" :height="750"
                :colorList="state.options.map(item => item.prop).slice(1)" :hasIndex="true">
            </ScrollTable>
        </div>
    </div>
</template>
    
<script setup>
import ScrollTable from "@/components/ScrollTable/index.vue";
import { reactive } from "vue";
const state = reactive({
    options: [
        { prop: "department", label: "系统名称", },
        { prop: "totalUsage", label: "使用总量", },
    ],
    tableData: [
        {
            "department": "企业基本信息管理系统",
            "totalUsage": "3654"
        },
        {
            "department": "国资数据资源中心",
            "totalUsage": "1207"
        },
        {
            "department": "国企改革在线监督",
            "totalUsage": "5621"
        },
        {
            "department": "大额资金动态监控",
            "totalUsage": "4115"
        },
        {
            "department": "财务监督管理",
            "totalUsage": "3215"
        },
        {
            "department": "“三重一大”决策和运行监管系统",
            "totalUsage": "3356"
        },
        {
            "department": "企业经济运行分析系统",
            "totalUsage": "2365"
        },
        {
            "department": "产权综合管理系统",
            "totalUsage": "3214"
        },
        {
            "department": "对外经济合作管理系统",
            "totalUsage": "1987"
        },
        {
            "department": "党建管理系统",
            "totalUsage": "1006"
        },
        {
            "department": "监管信息报送平台",
            "totalUsage": "3621"
        },
        {
            "department": "能源企业生产数据管理系统",
            "totalUsage": "3856"
        },
        {
            "department": "企业领导人员管理系统、",
            "totalUsage": "956"
        },
        {
            "department": "企业监督稽查管理系统、",
            "totalUsage": "877"
        },
        {
            "department": "资本运营与收益管理系统、",
            "totalUsage": "3125"
        },
        {
            "department": "企业业绩考核评价系统、",
            "totalUsage": "1123"
        },
        {
            "department": "监督追责管理系统、",
            "totalUsage": "899"
        },
        {
            "department": "领导辅助决策系统、",
            "totalUsage": "566"
        },
        {
            "department": "境外项目信息监测系统、",
            "totalUsage": "769"
        },
        {
            "department": "协同办公系统",
            "totalUsage": "3547"
        },
        {
            "department": "合同管理系统",
            "totalUsage": "1123"
        },
        {
            "department": "机关后勤服务管理系统",
            "totalUsage": "569"
        },
        {
            "department": "宣传工作管理系统",
            "totalUsage": "369"
        },
        {
            "department": "企业综合管理系统",
            "totalUsage": "1123"
        },
        {
            "department": "企业群工管理系统",
            "totalUsage": "663"
        },
        {
            "department": "企业信访信息管理系统",
            "totalUsage": "213"
        }
    ]
});
</script>
    
<style lang="scss" scoped>
.centerLeftBottomTop5 {
    padding: 16px;
    box-sizing: border-box;
    width: 432px;
    height: 817px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;
}
</style>