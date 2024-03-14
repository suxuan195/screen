<template>
  <div class="screen">
    <Header title="领导指示批复"></Header>
    <div class="mainBox">
      <div class="left">
        <LeftTopChart></LeftTopChart>
        <LeftBottomChart></LeftBottomChart>
      </div>
      <div class="center">
        <CenterTopChart></CenterTopChart>
        <CenterBottomChart></CenterBottomChart>
      </div>
      <div class="right">
        <RightTopChart></RightTopChart>
        <RightBottomChart></RightBottomChart>
      </div>
    </div>
    <FooterList></FooterList>
    <Menu></Menu>
  </div>
</template>
    
<script setup>
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import CenterTopChart from "./comp/CenterTopChart.vue";
import CenterBottomChart from "./comp/CenterBottomChart.vue";
import LeftBottomChart from "./comp/leftBottomChart.vue";
import LeftTopChart from "./comp/leftTopChart.vue";
import RightBottomChart from "./comp/rightBottomChart.vue";
import RightTopChart from "./comp/rightTopChart.vue";
import FooterList from "./comp/footerList.vue";
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