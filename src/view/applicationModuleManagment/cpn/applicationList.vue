<template>
    <div class="centerLeftBottomTop5">
        <topTitle title="应用列表" :is-other-text="false" :is-date-show="false" />
        <div class="tableBox">
            <ScrollTable :tableData="state.tableData" :options="state.options" :height="460"
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
        { prop: "department", label: "各处室", width: "120" },
        { prop: "applicationSystemTotal", label: "应用系统数量", width: "110", },
        { prop: "totalUsage", label: "使用总量", width: "80", },
    ],
    tableData: [
        {
            "department": "政策法规处",
            "applicationSystemTotal": "1",
            "totalUsage": "1366"
        },
        {
            "department": "财务监督处",
            "applicationSystemTotal": "3",
            "totalUsage": "8691"
        },
        {
            "department": "产权管理处",
            "applicationSystemTotal": "3",
            "totalUsage": "6157"
        },
        {
            "department": "企业改革处",
            "applicationSystemTotal": "1",
            "totalUsage": "1208"
        },
        {
            "department": "考核分配处",
            "applicationSystemTotal": "1",
            "totalUsage": "1840"
        },
        {
            "department": "资本运营与收益管理处",
            "applicationSystemTotal": "2",
            "totalUsage": "2365"
        },
        {
            "department": "对外经济合作处",
            "applicationSystemTotal": "2",
            "totalUsage": "3654"
        },
        {
            "department": "信访与维护企业稳定工作处",
            "applicationSystemTotal": "2",
            "totalUsage": "3214"
        },
        {
            "department": "综合处",
            "applicationSystemTotal": "3",
            "totalUsage": "11305"
        },
        {
            "department": "监督稽查处",
            "applicationSystemTotal": "2",
            "totalUsage": "6654"
        },
        {
            "department": "企业领导人员管理处",
            "applicationSystemTotal": "1",
            "totalUsage": "1369"
        },
        {
            "department": "党建工作处",
            "applicationSystemTotal": "1",
            "totalUsage": "1234"
        },
        {
            "department": "宣传工作处",
            "applicationSystemTotal": "1",
            "totalUsage": "1836"
        },
        {
            "department": "群众工作处",
            "applicationSystemTotal": "1",
            "totalUsage": "1007"
        },
        {
            "department": "信息中心",
            "applicationSystemTotal": "1",
            "totalUsage": "1987"
        },
        {
            "department": "机关后勤服务中心",
            "applicationSystemTotal": "1",
            "totalUsage": "318"
        }
    ]
});
</script>
    
<style lang="scss" scoped>
.centerLeftBottomTop5 {
    padding: 16px;
    box-sizing: border-box;
    width: 432px;
    height: 527px;
    background-image: url('@images/applicationModuleManagment/用户活跃度背景图.png');
    background-size: 100% 100%;
    padding: 16px;
    box-sizing: border-box;
}
</style>