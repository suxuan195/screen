<template>
    <div class="leftTopDialog">
        <Dialog :width="832" :height="438" :showModel="showModel" title="职工行业分布情况统计" @close="close">
            <custom-table class="mX24" :tableData="state.tableData" maxHeight="350px" :tableHeader="props.tableHeader"
                :hasIndex="true"></custom-table>
        </Dialog>
    </div>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import customTable from '@components/customTable/customTable.vue'
import { ref, reactive } from 'vue'
const showModel = ref(false)
const state = reactive({
    tableData: [
        {
            name: "金川集团股份有限公司",
            nPeople: "7.32",
            proportion: "41.4027149321267%"
        },
        {
            name: "白银有色集团股份有限公司",
            nPeople: "5.3",
            proportion: "29.9773755656109%"
        },
        {
            name: "酒泉钢铁（集团）有限责任公司",
            nPeople: "4.03",
            proportion: "22.7941176470588%"
        },
        {
            name: "酒泉钢铁（集团）有限责任公司",
            nPeople: "1.03",
            proportion: "5.82579185520362%"
        }
    ],
})
const close = () => {
    showModel.value = false
}
const props = defineProps({
    tableHeader: {
        type: Array,
        default() {
            return []
        }
    }
})
defineExpose({
    showModel
})
</script>
    
<style lang="scss" scoped>
.leftTopDialog {
    width: 1213px;
    height: 438px;

    .mX24 {
        padding: 24px;
        box-sizing: border-box;
    }
}
</style>
