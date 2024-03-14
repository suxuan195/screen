<template>
    <popup :width="530" :height="440" title="能源企业户数" class="popup1" :showModel="props.showModel">
        <customTable :tableHeader="state.tableHeader" :has-index="true" :tableData="state.tableData" maxHeight="320px" class="tableX">
        </customTable>
    </popup>
</template>

<script setup>
import { reactive } from 'vue'
import popup from "@components/popup/pop.vue";
import customTable from '@/components/customTable/customTable.vue'
import { useIndex } from "@/view/IntelligentEnergyManagement/hooks/index";
const { enterpriseList } = useIndex();
const state = reactive({
    tableData: enterpriseList,
    tableHeader: [
        {
            label: "企业名称",
            prop: "name",
            width: '390'
        },
    ],
})

const props = reactive({
    showModel: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
.tableX {
    padding: 30px;
    box-sizing: border-box;
}
</style>
