<template>
  <div class="screen">
    <Header title="工业经济运行监测"></Header>
    <div class="main">
      <div class="leftChart">
        <navTitle title="主要产品产量" />
        <leftTopChart class="marginTop8" />
        <navTitle title="产值完成情况" class="marginTop27" />
        <leftCenterChart class="marginTop8" />
        <navTitle title="产能利用率" class="marginTop27" />
        <leftBottomTable />
      </div>
      <div class="rightChart">
        <navTitle title="主要设备运行情况" />
        <rightTopChart />
        <navTitle title="价格走势" class="marginTop27" />
        <rightCenterChart />
        <navTitle title="价格波动" class="marginTop27" />
        <rightBottomChart class="marginTop8" />
      </div>
    </div>
    <centerBottomChart />
    <centerTopChart />
    <div class="bg_bottom"></div>
    <Menu></Menu>
  </div>
</template>
<script setup>
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import leftTopChart from "./cpn/leftTopChart.vue";
import leftCenterChart from "./cpn/leftCenterChart.vue";
import leftBottomTable from "./cpn/leftBottomTable.vue";
import centerBottomChart from "./cpn/centerBottomChart.vue";
import rightTopChart from "./cpn/rightTopChart.vue";
import rightCenterChart from "./cpn/rightCenterChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";
import centerTopChart from "./cpn/centerTopChart.vue";
</script>
    
<style lang="scss" scoped>
.screen {
  background: url("@images/propertyManagement/main-bg.jpg") 0% 0% / 100% 100%;
  height: 100%;
  width: 100%;
  position: relative;

  .main {
    padding: 0 48px;
    position: relative;
    display: flex;
    justify-content: space-between;

    .marginTop8 {
      margin-top: 8px;
    }

    .marginTop27 {
      margin-top: 27px;
    }
  }

  .bg_bottom {
    background-image: url("@images/IntelligentEnergyManagement/bottom_bg.png");
    background-size: 100% 100%;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
  }
}
</style>
    