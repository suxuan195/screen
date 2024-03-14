<template>
  <div class="screen">
    <Header :title="title"></Header>
    <div class="mainBox">
      <div class="left">
        <LeftTopChart></LeftTopChart>
        <LeftCenterTable></LeftCenterTable>
        <LeftBottomTable></LeftBottomTable>
      </div>
      <div class="center">
        <CenterTotal></CenterTotal>
        <div v-show="tag == 0">
          <CenterMapChart></CenterMapChart>
        </div>
        <div v-show="tag == 1">
          <CenterGeo2dChart></CenterGeo2dChart>
        </div>
        <div v-show="tag == 2">
          <CenterGraphChart></CenterGraphChart>
        </div>
        <CenterBottomChart></CenterBottomChart>
      </div>
      <div class="right">
        <RightTopChart></RightTopChart>
        <RightCenterChart></RightCenterChart>
        <RightBottomList></RightBottomList>
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
import CenterMapChart from "./comp/centerMapChart.vue";
import CenterGraphChart from "./comp/centerGraphChart.vue";
import CenterTotal from "./comp/centerTotal.vue";
import LeftTopChart from "./comp/leftTopChart.vue";
import LeftCenterTable from "./comp/leftCenterTable.vue";
import LeftBottomTable from "./comp/leftBottomTable.vue";
import RightTopChart from "./comp/rightTopChart.vue";
import RightCenterChart from "./comp/rightCenterChart.vue";
import RightBottomList from "./comp/rightBottomList.vue";
import CenterBottomChart from "./comp/centerBottomChart.vue";
import CenterGeo2dChart from "./comp/centerGeo2dChart.vue";
import FooterList from "./comp/footerList.vue";
const title = ref("产权管理");
const tag = ref(0);

const selectTag = (e) => {
  tag.value = e;
};
</script>
  
<style lang="scss" scoped>
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
      z-index: 1;
    }

    .left,
    .right {
      position: relative;
      z-index: 2;
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
      font-size: 20px;
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