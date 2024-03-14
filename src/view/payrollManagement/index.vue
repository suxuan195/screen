<template>
  <div class="screen">
    <Header title="负责人薪酬管理"></Header>
    <div
      style="position: absolute;right: 100px;cursor: pointer;width: 8px;height: 8px;background-color: #fff;border-radius: 50%;"
      @click="rourerClick"></div>
    <div class="centerChart">
      <div class="centerLeft">
        <div class="mainTitle ttf">
          <p>业绩考核情况汇总</p>
        </div>
        <div class="centerLeftTop mb24">
          <LeftTopChart></LeftTopChart>
        </div>
        <div class="centerLeftBottom">
          <LeftBottomChart></LeftBottomChart>
        </div>
      </div>
      <div class="centerRight">
        <div class="mainTitle ttf">
          <p>负责人薪酬情况汇总</p>
        </div>
        <div class="centerRightTop mb24">
          <div class="centerRightTopL mr24px">
            <RightTopLChart></RightTopLChart>
          </div>
          <div class="centerRightTopR">
            <RightTopRChart></RightTopRChart>
          </div>
        </div>
        <div class="centerRightBottom">
          <RightBottomChart></RightBottomChart>
        </div>
      </div>
    </div>
    <div class="bottomChart">
      <div class="mainTitle ttf">
        <p>企业负责人薪酬与企业经营状况关联图</p>
      </div>
      <BottomChart></BottomChart>
    </div>
    <Menu></Menu>
  </div>
</template>

<script setup>
import Header from "@components/Header/index.vue";
import Menu from "@components/Menu/index.vue";
import LeftTopChart from "./comp/LeftTopChart.vue";
import LeftBottomChart from "./comp/LeftBottomChart.vue";
import RightTopLChart from "./comp/RightTopLChart.vue";
import RightTopRChart from "./comp/RightTopRChart.vue";
import RightBottomChart from "./comp/RightBottomChart.vue";
import BottomChart from "./comp/BottomChart.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const rourerClick = () => {
  router.push({
    name: "headPayManagment"
  })
}
</script>

<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;

  .centerChart {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 48px;
  }

  .mb24 {
    margin-bottom: 24px;
  }

  .mr24px {
    margin-right: 24px;
  }

  .bottomChart {
    padding: 0 48px;
    margin-top: 48px;
  }

  .centerRight {
    .centerRightTop {
      display: flex;
    }
  }
}

.mainTitle {
  box-sizing: border-box;
  background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
  width: 431px;
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

.checkRouter {
  position: fixed;
  right: 180px;
  top: 100px;
  display: flex;
  gap: 6px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgba(255, 255, 255, .4);

    &:hover {
      background-color: rgba(255, 255, 255, .8);
    }
  }
}
</style>
