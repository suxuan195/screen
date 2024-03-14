<template>
  <popup :width="1200" :height="600" title="月度发电完成情况" :showModel="props.showModel">
    <customTable :tableHeader="state.tableHeader" :has-index="true" :tableData="state.tableData" maxHeight="460px" class="tableX">
    </customTable>
  </popup>
</template>

<script setup>
import {reactive, watchEffect} from 'vue'
import popup from "@components/popup/pop.vue";
import customTable from '@/components/customTable/customTable.vue'

const props = defineProps({
  showModel: {
    type: Boolean,
    default: false
  },
  list:{
    type:Array,
    default:[]
  }
})
const state = reactive({
  tableData: props.list,
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
      width: '150'
    },
    {
      label: "实际发电量",
      prop: "实际发电量",
      width: '150'
    },
    {
      label: "上网电量",
      prop: "上网电量",
      width: '150'
    },
    {
      label: "月份",
      prop: "月份",
      width: '150'
    },
    {
      label: "发电厂站类型",
      prop: "发电厂站类型",
      width: '150'
    }
  ],
})
// 使用 watchEffect 来观察 list 的变化
watchEffect(() => {
  state.tableData = props.list;
});
</script>

<style lang="scss" scoped>
.tableX {
  padding: 30px;
  box-sizing: border-box;
}
</style>
