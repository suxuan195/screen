<template>
    <div class="rightBottomChart">
        <div class="tableBox">
            <ScrollTable :tableData="state.tableData" :options="state.options"
                :colorList="state.options.map(item => item.prop).slice(1, 3)" :otherColorList="['QOQ', 'YOY']">
            </ScrollTable>
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
        { prop: "annualCapacity", label: "本月(元/吨)", width: "115" },
        { prop: "QOQ", label: "环比", width: "70" },
        { prop: "YOY", label: "同比", width: "95" },
    ],
    tableData: [
        {
            company: "金川",
            productName: "镍",
            annualCapacity: "150226.69",
            QOQ: "-1.04",
            YOY: "-3.65"
        },
        {
            company: "金川",
            productName: "铜",
            annualCapacity: "60841.44",
            QOQ: "1.03",
            YOY: "-2.46"
        },
        {
            company: "酒钢",
            productName: "钢材",
            annualCapacity: "3829.00",
            QOQ: "-0.52",
            YOY: "-15.17"
        },
        {
            company: "酒钢",
            productName: "铝",
            annualCapacity: "16112.00",
            QOQ: "0.86",
            YOY: "-11.21"
        },
        {
            company: "白银",
            productName: "铜",
            annualCapacity: "",
            QOQ: "",
            YOY: ""
        },
        {
            company: "白银",
            productName: "铅",
            annualCapacity: "16112.00",
            QOQ: "0.86",
            YOY: "-11.21"
        },
        {
            company: "白银",
            productName: "锌",
            annualCapacity: "18207.15",
            QOQ: "-0.35",
            YOY: "-13.69"
        },
        {
            company: "靖煤",
            productName: "原煤",
            annualCapacity: "458.12",
            QOQ: "-5.37",
            YOY: "-9.91"
        },
        {
            company: "窑煤",
            productName: "原煤",
            annualCapacity: "420.41",
            QOQ: "-12.60",
            YOY: "-41.41"
        },
    ],
});
</script>
    
<style lang="scss" scoped>
.rightBottomChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100%;
    width: 420px;
    height: 210px;
    box-sizing: border-box;
}
</style>