<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="职工年龄段人数分布情况" @close="close">
        <div style="padding: 16px">
            <custom-table class="mb20" :tableData="state.tableData" maxHeight="400px"
                :tableHeader="props.tableHeader"></custom-table>
        </div>
    </Dialog>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive } from "vue";
import { leftBottomDialogData } from '../data/analogData'
const showModel = ref(false);
const state = reactive({
    tableData: leftBottomDialogData
})
const props = defineProps({
    tableHeader: {
        type: Array,
        default() {
            return []
        }
    }
})
const close = () => {
    showModel.value = false;
};

defineExpose({
    showModel,
});
</script>
    
<style></style>