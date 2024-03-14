<template>
  <div class="rightBottom">
    <div class="mainTitle ttf">
      <p>行业资本量TOP10</p>
    </div>
    <div class="list">
      <div class="item" @click="showChart(item)" v-for="(item, index) in getTagArr(state.tagPage)" :key="index">
        {{ item }}
      </div>
      <div class="item" @click="setPage()">...</div>
    </div>
  </div>

  <teleport to="#screen">
    <RightBottomDiaChart ref="refRightBottomDiaChart"></RightBottomDiaChart>
  </teleport>
</template>
  
<script setup>
import { reactive, onMounted, ref, nextTick } from "vue";
import RightBottomDiaChart from "../dialog/rightBottomDiaChart.vue";
import { useList } from "../hooks/capitalTop10.js";
const { pageCount, getTagArr, getList } = useList();
const refRightBottomDiaChart = ref(null);
const state = reactive({
  tagPage: 1,
});

const setPage = () => {
  state.tagPage += 1;
  if (state.tagPage > pageCount.value) {
    state.tagPage = 1;
  }
};

const showChart = async (name) => {
  refRightBottomDiaChart.value.showModel = true;
  await nextTick();
  refRightBottomDiaChart.value.setList(name);
};

onMounted(() => {
  getList();
});
</script>
  
<style lang="scss" scoped>
.rightBottom {
  width: 420px;
  height: 280px;

  .list {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    height: 210px;
    width: 420px;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 4px;

    .item {
      width: 100px;
      height: 48px;
      padding: 8px;
      box-sizing: border-box;
      background: url("@images/propertyManagement/item-min.png") 0% 0% / 100% 100% no-repeat;
      font-size: 12px;
      line-height: 14px;
      color: #d6ebf7;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: url("@images/propertyManagement/item-min-hover.png") 0% 0% / 100% 100% no-repeat;
      }
    }
  }
}
</style>