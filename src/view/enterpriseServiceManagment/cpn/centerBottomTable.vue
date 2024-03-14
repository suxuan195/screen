<template>
    <div class="centerBottomTable">
        <ScrollTable :tableData="list" :options="state.tableHeader" :height="300">
        </ScrollTable>
    </div>
</template>
    
<script setup>
import ScrollTable from '@components/ScrollTable/index.vue'
import { reactive } from 'vue'
import { useLearn } from '../hooks';
const { list } = useLearn();
const state = reactive({
    tableHeader: [
        { prop: "name", label: "企业名称" },
        { prop: "leader", label: "领导班子学习时长" },
        { prop: "cadres", label: "中层干部学习时长" },
        { prop: "low", label: "中层及以下干部学习时长" },
    ],
})
</script>
    
<style lang="scss" scoped>
.centerBottomTable {
    width: 864px;
    height: 335px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
}
</style>