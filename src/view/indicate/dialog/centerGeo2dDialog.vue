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
  import { useList } from "../hooks/map";
  const { list, getList } = useList();
  const showModel = ref(false);
  const state = reactive({
    tableData: [],
    tableHeader: [
      {
        label: "项目名称",
        width: "240",
        prop: "name",
      },
      {
        label: "项目类型",
        width: "200",
        prop: "type",
      },
      {
        label: "项目所属行业领域名称",
        width: "200",
        prop: "industry_name",
      },
      {
        label: "项目所在国家地区及城市",
        width: "200",
        prop: "city",
      },

      {
        label: "投资总额(万元)",
        width: "200",
        prop: "price",
      },
      {
        label: "国资委批复金额(万)",
        width: "200",
        prop: "approval_price",
      },
      {
        label: "项目开工日期",
        width: "200",
        prop: "start_time",
      },
      {
        label: "项目投产日期",
        width: "200",
        prop: "end_time",
      },

      {
        label: "常驻负责人",
        width: "200",
        prop: "head",
      },
      {
        label: "详细地址",
        width: "200",
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
    