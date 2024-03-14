<template>
  <div class="screen">
    <Header :title="title"></Header>
    <div
      style="position: absolute;right: 100px;cursor: pointer;width: 8px;height: 8px;background-color: #fff;border-radius: 50%;"
      @click="rourerClick"></div>
    <div class="mainBox">
      <div class="left">
        <LeftTopChart></LeftTopChart>
        <LeftCenterChart></LeftCenterChart>
        <LeftBottomChart></LeftBottomChart>
      </div>
      <div class="center">
        <CenterTopChart></CenterTopChart>
        <CenterChart></CenterChart>
        <CenterBottomChart></CenterBottomChart>
      </div>
      <div class="right">
        <RightTopChart></RightTopChart>
        <RightCenterChart></RightCenterChart>
        <RightBottomChart></RightBottomChart>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>
      
<script setup>
import { ref } from "vue";
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import LeftTopChart from "./comp/leftTopChart.vue";
import LeftCenterChart from "./comp/leftCenterChart.vue";
import LeftBottomChart from "./comp/leftBottomChart.vue";
import RightTopChart from "./comp/rightTopChart.vue";
import RightCenterChart from "./comp/rightCenterChart.vue";
import RightBottomChart from "./comp/rightBottomChart.vue";
import CenterTopChart from "./comp/centerTopChart.vue";
import CenterChart from "./comp/centerChart.vue";
import CenterBottomChart from "./comp/centerBottomChart.vue";

const title = ref("职工分配调控");
import { useRouter } from "vue-router";
const router = useRouter();
const rourerClick = () => {
  router.push({
    name: "workdEmployeeDistribution"
  })
}

</script>
      
<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;

  .mainBox {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
  }
}

:deep(.mainTitle) {
  box-sizing: border-box;
  background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
  width: 420px;
  height: 62px;
  padding-left: 65px;

  p {
    white-space: nowrap;
    font-size: 20px;
    font-weight: normal;
    line-height: 40px;
    letter-spacing: 0.2em;
    background: linear-gradient(180deg,
        #ffffff 0%,
        #ffffff 52%,
        #90d1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
  }
}
</style>