<template>
    <div class="leftTopDialog">
        <Dialog :width="832" :height="438" :showModel="showModel" title="职工职称人数占比情况统计" @close="close">
            <custom-table class="mX24" :tableData="state.tableData" maxHeight="350px" :tableHeader="props.tableHeader"
                :hasIndex="true"></custom-table>
        </Dialog>
    </div>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import customTable from '@components/customTable/customTable.vue'
import { ref, reactive, onMounted } from 'vue';
import { rightCenterDialogData } from '../data/analogData';
const showModel = ref(false)
const props = defineProps({
    tableHeader: {
        type: Array,
        default() {
            return []
        }
    }
})
const state = reactive({
    tableData: rightCenterDialogData
})
const close = () => {
    showModel.value = false
}
onMounted(() => {
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
