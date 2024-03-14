<template>
  <Dialog
    :width="1127"
    :height="456"
    :showModel="showModel"
    title="行业资本量TOP10"
    @close="close"
  >
    <CustomTableWrap :tableData="state.tableData">
      <template v-for="(item, index) in state.tableHeader" :key="index">
        <el-table-column
          show-overflow-tooltip
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        />
      </template>
    </CustomTableWrap>
  </Dialog>
</template>
  
  <script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive } from "vue";
import { useList } from "../hooks/capitalTop10";
const { list, getList } = useList();
const showModel = ref(false);
const state = reactive({
  tableData: [],
  tableHeader: [
    {
      label: "行业",
      width: "0",
      prop: "industry",
    },
    {
      label: "公司",
      width: "0",
      prop: "name",
    },
    {
      label: "注册资本（万元）",
      width: "0",
      prop: "price",
    },
  ],
});
const setList = (name) => {
  getList(name);
  state.tableData = list;
};
const close = () => {
  showModel.value = false;
  state.tableData = [];
};
defineExpose({
  setList,
  showModel,
});
</script>
  
  <style lang="scss" scoped>
</style>
  