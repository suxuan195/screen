<template>
  <div class="screen">
    <Header title="交易监测"></Header>
    <div class="main">
      <div class="top">
        <topTilte />
      </div>
      <div class="bottom">
        <div class="left_box">
          <leftTopChart />
          <leftBottomChart />
        </div>
        <div class="right_box">
          <rightTopChart />
          <rightBottomChart />
        </div>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script setup>
import topTilte from "./cpn/topTilte.vue";
import Menu from "@components/Menu/index.vue";
import Header from "@components/Header/index.vue";
import leftTopChart from "./cpn/leftTopChart.vue";
import rightTopChart from "./cpn/rightTopChart.vue";
import leftBottomChart from "./cpn/leftBottomChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";

</script>

<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100%;

  height: 100%;
  width: 100%;
  position: relative;


  .main {
    margin: 8px 48px 48px;

    .bottom {
      display: flex;
      margin: 40px 0 0;

      .right_box {
        margin-left: 55px;
      }
    }
  }
}
</style>
