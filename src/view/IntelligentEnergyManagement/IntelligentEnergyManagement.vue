<template>
  <div class="screen">
    <Header title="能源安全智能化"></Header>
    <div class="main">
      <div class="top">
        <topCartList @showModel="showModel" />
      </div>
      <div class="bottom">
        <div class="topChart">
          <div class="left">
            <leftTopChart />
            <leftBottomChart />
          </div>
          <div class="right">
            <rightTopChart />
            <rightBottomChart />
          </div>
        </div>
        <div class="bottomChart">
          <centerBottomChart @bottomShowModel="bottomShowModel" @get-coordinates-array="getCoordinatesArray" />
        </div>
      </div>
    </div>
    <center-map-chat :coordinates-array="state.coordinatesArray"></center-map-chat>
    <div class="bg_bottom"></div>
    <Menu></Menu>
    <electricityTotalPopUp v-if="state.currentIndex === 0" :showModel="state.showModel" />
    <coalTotalPopUp v-else-if="state.currentIndex === 1" :showModel="state.showModel" />
    <InstalledCapacityPopUp v-else-if="state.currentIndex === 2" :showModel="state.showModel" />
    <yearTotalPowerGenerationPopUp v-else-if="state.currentIndex === 3" :showModel="state.showModel" />
    <energyCompaniesPopUp v-else-if="state.currentIndex === 4" :showModel="state.showModel" />
    <windPowerPlantPopUp v-else-if="state.currentIndex === 5" :showModel="state.showModel" :title="state.title"
      :power-plant-list="state.powerPlantList" />
  </div>
</template>
electricity
<script setup>
import emitBus from "@utils/bus";
import { onMounted, reactive, ref, nextTick } from "vue";
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import centerMapChat from "./cpn/centerMapChat.vue";
import topCartList from "./cpn/topCartList.vue";
import leftTopChart from "./cpn/leftTopChart.vue";
import leftBottomChart from "./cpn/leftBottomChart.vue";
import rightTopChart from "./cpn/rightTopChart.vue";
import rightBottomChart from "./cpn/rightBottomChart.vue";
import centerBottomChart from "./cpn/centerBottomChart.vue";
import coalTotalPopUp from "@components/popup/IntelligentEnergyManagement/coalTotalPopUp.vue";
import windPowerPlantPopUp from "@components/popup/IntelligentEnergyManagement/windPowerPlantPopUp.vue";
import energyCompaniesPopUp from "@components/popup/IntelligentEnergyManagement/energyCompaniesPopUp.vue";
import electricityTotalPopUp from "@components/popup/IntelligentEnergyManagement/electricityTotalPopUp.vue";
import yearTotalPowerGenerationPopUp from "@components/popup/IntelligentEnergyManagement/yearTotalPowerGenerationPopUp.vue";
onMounted(() => {
  emitBus.on("closeModel", () => {
    state.showModel = false;
    state.currentIndex = 0;
  });
});

const state = reactive({
  showModel: false,
  currentIndex: 0,
  powerPlantList: [],
  title: '',
  coordinatesArray: []
});
const showModel = (e) => {
  state.currentIndex = e;
  state.showModel = true;
};
const bottomShowModel = async (index, arr, title) => {
  state.currentIndex = 5;
  state.powerPlantList = arr
  state.title = title
  await nextTick(); // 等待 DOM 更新
  state.showModel = true;
};

const getCoordinatesArray = (arr) => {
  state.coordinatesArray = arr
}
</script>

<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;

  .main {
    .bottom {
      margin: 51px 50px 0;

      .topChart {
        display: flex;
        justify-content: space-between;
      }
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
