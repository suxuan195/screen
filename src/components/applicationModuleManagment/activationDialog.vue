<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="用户活跃" @close="close">
        <div style="padding: 16px">
            <custom-table class="mb20" :tableData="state.tableData" maxHeight="400px" :tableHeader="state.tableHeader"
                :hasIndex="true"></custom-table>
        </div>
    </Dialog>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive } from "vue";
const showModel = ref(false);
const state = reactive({
    tableHeader: [
        {
            label: "应用系统名称",
            prop: "name",
        },
        {
            label: "累计登录",
            prop: "totalLogin",
        },
    ],
    tableData: [
        {
            "name": "企业基本信息管理系统",
            "totalLogin": "3654"
        },
        {
            "name": "国资数据资源中心",
            "totalLogin": "6157"
        },
        {
            "name": "国企改革在线监督",
            "totalLogin": "8691"
        },
        {
            "name": "大额资金动态监控",
            "totalLogin": "4115"
        },
        {
            "name": "财务监督管理",
            "totalLogin": "6654"
        },
        {
            "name": "“三重一大”决策和运行监管系统",
            "totalLogin": "3356"
        },
        {
            "name": "企业经济运行分析系统",
            "totalLogin": "2365"
        },
        {
            "name": "产权综合管理系统",
            "totalLogin": "3214"
        },
        {
            "name": "对外经济合作管理系统",
            "totalLogin": "1987"
        },
        {
            "name": "党建管理系统",
            "totalLogin": "1006"
        },
        {
            "name": "监管信息报送平台",
            "totalLogin": "12370"
        }
    ]
})
const close = () => {
    showModel.value = false;
};
defineExpose({
    showModel,
});
</script>
    
<style></style>