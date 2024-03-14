<template>
    <Dialog :width="1127" :height="456" :showModel="showModel" title="用户行为" @close="close">
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
import { useEvent } from "../hooks";
const { getTableData, tableData } = useEvent();
const state = reactive({
    tableData: [],
    tableHeader: [
        {
            label: "名称",
            width: "300",
            prop: "name",
        },
        {
            label: "总量",
            width: "0",
            prop: "total",
        },
        {
            label: "培训管理",
            width: "0",
            prop: "item1",
        },
        {
            label: "查看资讯",
            width: "0",
            prop: "item2",
        },
        {
            label: "知识检索",
            width: "0",
            prop: "item3",
        },
        {
            label: "知识图谱",
            width: "0",
            prop: "item4",
        },
        {
            label: "智能问答",
            width: "0",
            prop: "item5",
        },
    ],
});


const showModel = ref(false);

const getUserEventTable = () => {
    showModel.value = true;
    getTableData()
    state.tableData = tableData;
};
const close = () => {
    showModel.value = false;
    state.tableData = [];
};
const registerEvent = inject('registerEvent')
registerEvent({ getUserEventTable })
defineExpose({
    showModel,
});
</script>
    
<style lang="scss" scoped></style>
    