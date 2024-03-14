<template>
  <popup :width="1200" :height="600" title="月度发电完成情况" :showModel="props.showModel">
    <customTable :tableHeader="state.tableHeader" :has-index="true" :tableData="state.tableData" maxHeight="500px" class="tableX">
    </customTable>
  </popup>
</template>

<script setup>
import emitBus from "../../../utils/bus";
import popup from "@components/popup/pop.vue";
import {watchEffect, reactive, ref, onMounted, defineProps, onBeforeMount} from "vue";

const props = defineProps({
  showModel: {
    type: Boolean,
    default: false
  },
  enterpriseList: {
    type: Object,
    default: []
  }
})
const state = reactive({
  tableData: props.enterpriseList,
  tableHeader: [
    {
      label: "企业名称",
      prop: "企业名称",
      width: '390'
    },
    {
      label: "厂站名称",
      prop: "厂站名称",
      width: '390'
    },
    {
      label: "计划发电量",
      prop: "计划发电量",
      width: '140'
    },
    {
      label: "实际发电量",
      prop: "实际发电量",
      width: '140'
    },
    {
      label: "上网电量",
      prop: "上网电量",
      width: '140'
    },
    {
      label: "月份",
      prop: "月份",
      width: '140'
    },
    {
      label: "发电场站类型",
      prop: "发电场站类型",
      width: '120'
    }
  ],
})

const showModel = ref(false);
// 使用 watchEffect 来观察 enterpriseList 的变化
watchEffect(() => {
  state.tableData = props.enterpriseList;
});
onMounted(() => {
  emitBus.on("closeModel", () => {
    showModel.value = false;
  });
});
</script>

<style lang="scss" scoped></style>
