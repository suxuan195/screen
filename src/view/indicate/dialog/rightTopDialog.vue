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
import { useList } from "../hooks/invest";
const { list, getList } = useList();
const showModel = ref(false);
const state = reactive({
  tableData: [],
  tableHeader: [
    {
      label: "项目名称",
      width: "0",
      prop: "name",
    },
    {
      label: "项目类型",
      width: "0",
      prop: "type",
    },
    {
      label: "投资总额(万元)",
      width: "0",
      prop: "price",
    },
    {
      label: "国资委批复金额(万)",
      width: "0",
      prop: "approval_price",
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
  