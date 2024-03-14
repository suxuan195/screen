<template>
    <Dialog :width="1127" :height="456" :showModel="showModel" :title="title" @close="close">
        <CustomTableWrap :tableData="state.tableData">
            <template v-for="(item, index) in state.tableHeader" :key="index">
                <el-table-column show-overflow-tooltip :prop="item.prop" :label="item.label" :width="item.width"
                    align="center" />
            </template>
        </CustomTableWrap>
    </Dialog>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive, inject } from "vue";
import { useDown } from "../hooks";
const { getTableData, tableData } = useDown();
const title = inject('title')
const state = reactive({
    tableData: [],
    tableHeader: [
        {
            label: "知识名称",
            width: "0",
            prop: "name",
        },
        {
            label: "下载量",
            width: "0",
            prop: "value",
        },
    ],
});


const showModel = ref(false);

const getDownTable = () => {
    showModel.value = true;
    getTableData()
    state.tableData = tableData;
};
const close = () => {
    showModel.value = false;
    state.tableData = [];
};
const registerEvent = inject('registerEvent')
registerEvent({ getDownTable })
defineExpose({
    showModel,
});
</script>
    
<style lang="scss" scoped></style>
    