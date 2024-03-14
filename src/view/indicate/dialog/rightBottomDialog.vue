<template>
  <Dialog
    :width="1127"
    :height="456"
    :showModel="showModel"
    title="项目资金投入情况"
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
import { useList } from "../hooks/output";
const { list, getList } = useList();
const showModel = ref(false);
const state = reactive({
  tableData: [],
  tableHeader: [
    {
      label: "企业名称",
      width: "0",
      prop: "name",
    },
    {
      label: "净利润",
      width: "0",
      prop: "profit",
    },
    {
      label: "营业收入",
      width: "0",
      prop: "revenue",
    },
    {
      label: "所有者权益",
      width: "0",
      prop: "equity",
    },
    {
      label: "利润总额",
      width: "0",
      prop: "profit_total",
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
  