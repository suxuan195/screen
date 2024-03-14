<template>
  <div class="screen">
    <Header :title="title"></Header>
    <div class="mainBox">
      <div class="left" v-show="tag != 2">
        <LeftTopChart></LeftTopChart>
        <LeftBottomChart></LeftBottomChart>
      </div>
      <div class="center">
        <div v-show="tag == 0">
          <CenterGeo2dChart></CenterGeo2dChart>
        </div>
        <div v-show="tag == 1">
          <CenterMapChart></CenterMapChart>
        </div>
        <div v-show="tag == 2">
          <!-- <CenterGeoChart ></CenterGeoChart> -->
        </div>
      </div>
      <div class="right" v-show="tag != 2">
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
import CenterMapChart from "./comp/CenterMapChart.vue";
// import CenterGeoChart from "./comp/centerGeoChart.vue";
import CenterGeo2dChart from "./comp/centerGeo2dChart.vue";
import LeftBottomChart from "./comp/leftBottomChart.vue";
import LeftTopChart from "./comp/leftTopChart.vue";
import RightBottomChart from "./comp/rightBottomChart.vue";
import RightTopChart from "./comp/rightTopChart.vue";
import FooterList from "./comp/footerList.vue";
const title = ref("一带一路");
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
}

.left,
.right {
  position: relative;
  z-index: 1;
}

.left {
  z-index: 2;
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
</style>