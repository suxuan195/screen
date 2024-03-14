<template>
  <Dialog
    :width="1127"
    :height="456"
    :showModel="showModel"
    title="项目分布信息"
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
import { useList } from "../hooks/chinaMap";
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
      label: "市县",
      width: "0",
      prop: "city",
    },
    {
      label: "详细地址",
      width: "0",
      prop: "address",
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
    