<template>
  <Dialog :width="1127" :height="456" :showModel="showModel" title="产权交易统计" @close="close">
    <CustomTableWrap :tableData="state.tableData">
      <template v-for="(item, index) in state.tableHeader" :key="index">
        <el-table-column show-overflow-tooltip :prop="item.prop" :label="item.label" :width="item.width" align="center" />
      </template>
    </CustomTableWrap>
  </Dialog>
</template>
  
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive } from "vue";
import { useList } from "../hooks/distribution";
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
      label: "企业类型",
      width: "0",
      prop: "type",
    },
    {
      label: "产业",
      width: "0",
      prop: "code",
    },
    {
      label: "认缴资本合计",
      width: "0",
      prop: "subscription",
    },
    {
      label: "实缴资本合计",
      width: "0",
      prop: "paid",
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
  
<style lang="scss" scoped></style>
  