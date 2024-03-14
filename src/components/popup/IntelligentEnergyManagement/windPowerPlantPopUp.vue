<template>
  <popup :width="812" :height="440" :title="props.title" :showModel="props.showModel">
    <customTable :tableHeader="state.tableHeader" :has-index="true" :tableData="state.tableData" maxHeight="320px"
                 class="tableX">
    </customTable>
  </popup>
</template>

<script setup>
import {reactive, watchEffect, watch, onUpdated} from 'vue'
import popup from "@components/popup/pop.vue";
import customTable from '@/components/customTable/customTable.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showModel: {
    type: Boolean,
    default: false
  },
  powerPlantList: {
    type: Array,
    default: ()=>[]
  }
})
const state = reactive({
  title: props.title,
  tableData: props.powerPlantList,
  tableHeader: [
    {
      label: "厂站名称",
      prop: "厂站名称",
      width: '350'
    },
    {
      label: "装机容量",
      prop: "装机容量",
      width: '150'
    },
    {
      label: "单位",
      prop: "单位",
      width: '150'
    },
  ],
})
// 使用 watchEffect 来观察 list 的变化
watchEffect(() => {
  state.tableData = props.powerPlantList;
  state.title = props.title;
});
</script>

<style lang="scss" scoped>
.tableX {
  padding: 30px;
  box-sizing: border-box;
}
</style>
