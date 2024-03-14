<template>
    <div class="leftBottomChart">
        <div class="tableBox">
            <ScrollTable :tableData="state.tableData" :options="state.options"
                :colorList="state.options.map(item => item.prop).slice(1)"></ScrollTable>
        </div>
    </div>
</template>
    

<script setup>
import ScrollTable from "@/components/ScrollTable/index.vue";
import { reactive } from "vue";
const state = reactive({
    options: [
        { prop: "company", label: "企业名称", width: "80" },
        { prop: "productName", label: "产品名称", width: "80" },
        { prop: "annualCapacity", label: "年产能", width: "80" },
        { prop: "production", label: "产量", width: "60" },
        { prop: "utilizationRate", label: "产能利用率", width: "95" },
    ],
    tableData: [
        {
            company: "金川",
            productName: "镍",
            annualCapacity: "15万吨",
            production: "10.72",
            utilizationRate: "95.90%"
        },
        {
            company: "金川",
            productName: "铜",
            annualCapacity: "113.5万吨",
            production: "82.36",
            utilizationRate: "97.37%"
        },
        {
            company: "金川",
            productName: "钢材",
            annualCapacity: "1105万吨",
            production: "632.26",
            utilizationRate: "76.78%"
        },
        {
            company: "金川",
            productName: "铝",
            annualCapacity: "170万吨",
            production: "113.19",
            utilizationRate: "89.35%"
        },
        {
            company: "酒钢",
            productName: "铜",
            annualCapacity: "20万吨",
            production: "19.32",
            utilizationRate: "129.63%"
        },
        {
            company: "酒钢",
            productName: "铅",
            annualCapacity: "2万吨",
            production: "1.53",
            utilizationRate: "102.66%"
        },
        {
            company: "酒钢",
            productName: "锌",
            annualCapacity: "38万吨",
            production: "25.95",
            utilizationRate: "91.64%"
        },
        {
            company: "酒钢",
            productName: "原煤",
            annualCapacity: "880万吨",
            production: "618.38",
            utilizationRate: "94.30%"
        },
        {
            company: "白银",
            productName: "原煤",
            annualCapacity: "870万吨",
            production: "631.51",
            utilizationRate: "97.41%"
        },
    ],
});
</script>
    
<style lang="scss" scoped>
.leftBottomChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%;
    width: 420px;
    height: 210px;
    box-sizing: border-box;
}
</style>