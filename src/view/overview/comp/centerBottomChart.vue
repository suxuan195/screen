<template>
  <div class="centerBottom">
    <div class="mainTitle ttf">
      <p>发展质量</p>
    </div>
    <div class="chart">
      <CenterBottomChartL></CenterBottomChartL>
      <CenterBottomChartR></CenterBottomChartR>
    </div>
  </div>

</template>

<script setup>
import CenterBottomChartL from "../dialog/centerBottomChartL.vue";
import CenterBottomChartR from "../dialog/centerBottomChartR.vue";

</script>

  <style lang="scss" scoped>
.centerBottom {
  width: 864px;
  height: 280px;
  position: fixed;
  bottom: 62px;
  left: 50%;
  transform: translateX(-50%);
  .chart {
    width: 864px;
    height: 218px;
    background: url("@images/propertyManagement/item-bg-min.png") 0% 0% / 100%
      100% no-repeat;
    display: flex;
    padding:0 16px;
    box-sizing: border-box;
  }
}
</style>
