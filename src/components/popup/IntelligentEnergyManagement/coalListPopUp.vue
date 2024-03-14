<template>
  <popup :width="1200" :height="600" :title="state.title" :showModel="props.showModel">
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
  coalList:{
    type:Object,
    default:[]
  },
  title:{
    type:String,
    default:''
  }
})
const state = reactive({
  tableData: props.coalList,
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
      label: "原煤",
      prop: "原煤",
      width: '140'
    },
    {
      label: "烟煤",
      prop: "烟煤",
      width: '140'
    },
    {
      label: "无烟煤",
      prop: "无烟煤",
      width: '140'
    },
    {
      label: "日期",
      prop: "日期",
      width: '140'
    }
  ],
  title:''
})

const showModel = ref(false);
// 使用 watchEffect 来观察 coalList 的变化
watchEffect(() => {
  state.title = props.title;
  if(state.title === '煤炭生产情况-日'){
    state.tableHeader[state.tableHeader.length - 1].label = '日期'
    state.tableHeader[state.tableHeader.length - 1].prop = '日期'
  }else{
    state.tableHeader[state.tableHeader.length - 1].label = '月份'
    state.tableHeader[state.tableHeader.length - 1].prop = '月份'
  }
  state.tableData = props.coalList;
  // console.log(props.coalList,'props')
});

onMounted(() => {
  emitBus.on("closeModel", () => {
    showModel.value = false;
  });
});
</script>

<style lang="scss" scoped></style>
