<template>
    <Dialog :width="1332" :height="500" :showModel="showModel" title="数据总量" @close="close">
        <div style="padding: 16px">
            <custom-table class="mb20" :tableData="state.tableData" maxHeight="360px" :tableHeader="state.tableHeader"
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
            label: "服务器名称",
            prop: "name",
        },
        {
            label: "数据总量",
            prop: "total",
        },
    ],
    tableData: [
        {
            name: "数据库服务器01",
            total: "640.2GB",
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