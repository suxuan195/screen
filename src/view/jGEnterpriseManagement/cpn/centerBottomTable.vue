<template>
    <div class="centerBottomTable">
        <div class="unit">单位/万元</div>
        <ScrollTable :tableData="props.tableData" :options="state.options" :height="200">
        </ScrollTable>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive } from 'vue';
const props = defineProps({
    tableData: {
        type: Array,
        default: () => []
    }
})
const state = reactive({
    options: [
        { prop: "name", label: "项目名称" },
        { prop: "investment", label: "投资金额" },
        { prop: "startTime", label: "开工时间" },
        { prop: "duration", label: "工期" },
        { prop: "pRevenue", label: "预计收益" },
        { prop: "industry", label: "投资行业" },
        { prop: "location", label: "项目所在地" },
    ],
})
</script>
    
<style lang="scss" scoped>
.centerBottomTable {
    width: 864px;
    height: 218px;
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    position: relative;

    .unit {
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
        color: #FFFFFF;
        position: absolute;
        right: 0;
        top: -40px;
        z-index: 100;
    }

}
</style>