<template>
  <div class="screen">
    <Header :title="title"></Header>
    <div class="mainBox">
      <div class="left">
        <LeftTopChart></LeftTopChart>
        <leftBottomChart></leftBottomChart>
      </div>
      <div class="center">
        <div v-if="tag == 0">
          <HeatMapChart></HeatMapChart>
        </div>
        <div v-if="tag == 1">
          <centerMapChart1></centerMapChart1>
        </div>
        <div v-if="tag == 2">
          <CenterMapChart></CenterMapChart>
        </div>
      </div>
      <div class="right">
        <RightTopChart></RightTopChart>
        <RightBottomChart></RightBottomChart>
      </div>
    </div>
    <FooterList @selectTag="selectTag"></FooterList>
    <Menu></Menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import HeatMapChart from "./comp/heatMapChart.vue";
import CenterMapChart from "./comp/centerMapChart.vue";
import CenterMapChart1 from "./comp/centerMapChart1.vue";
import LeftTopChart from "./comp/leftTopChart.vue";
import leftBottomChart from "./comp/leftBottomChart.vue";
import RightTopChart from "./comp/rightTopChart.vue";
import RightBottomChart from "./comp/RightBottomChart.vue";
import FooterList from "./comp/footerList.vue";
const title = ref("党建工作");
const tag = ref(0);

const selectTag = (e) => {
  tag.value = e;
};
</script>

<style lang="scss" scoped>
/*
  css
  */

.screen {
  background: url("@images/propertyManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;

  .mainBox {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;

    .center {
      width: 768px;
    }
  }

  :deep(.mainTitle) {
    box-sizing: border-box;
    background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
    width: 420px;
    height: 46px;
    padding-left: 75px;

    p {
      white-space: nowrap;
      font-size: 24px;
      font-weight: normal;
      line-height: 24px;
      letter-spacing: 0.2em;
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 52%, #90d1ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
    }
  }
}
</style>
