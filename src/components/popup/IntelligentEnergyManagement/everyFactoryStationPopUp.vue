<template>
  <popup :width="1200" :height="600" title="各厂站发电量" :showModel="true">
    <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="460px" class="tableX">
    </customTable>
  </popup>
</template>

<script setup>
import {defineProps, reactive, watchEffect} from 'vue'
import popup from "@components/popup/pop.vue";
import customTable from '@/components/customTable/customTable.vue'

const props = defineProps({
  list: {
    type: Object,
    default: []
  },
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
      label: "发电量",
      prop: "发电量",
      width: '150'
    },
    {
      label: "单位",
      prop: "单位",
      width: '150'
    }
  ]
})

// 使用 watchEffect 来观察 coalList 的变化
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
