<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="统计情况" @close="close">
        <div style="padding: 16px">
            <custom-table class="mb20" :tableData="props.tableData" maxHeight="400px" :tableHeader="props.tableHeader"
                :has-Index="true"></custom-table>
        </div>
    </Dialog>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref } from "vue";

const showModel = ref(false);

const props = defineProps({
    tableHeader: {
        type: Array,
        default() {
            return []
        }
    },
    tableData: {
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