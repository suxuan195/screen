<template>
  <div class="rightBottom">
    <div class="title">
      <p class="ttf">{{ title }}</p>
      <div class="more" @click="moreClick">更多</div>
    </div>
    <div class="list">
      <ul>
        <li class="item" v-for="(item, index) in state.data" :key="index">
          <p class="value">{{ item.value }}%</p>
          <p class="text">{{ item.text }}</p>
          <p class="title">{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </div>
  <enterprisePopUp :showModel="showModel" />
</template>

<script setup>
import emitBus from "@utils/bus";
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import enterprisePopUp from "@components/popup/payrollManagement/enterprisePopUp.vue";
const title = ref("负责人社保福利情况");
const state = reactive({
  data: [
    {
      value: 8,
      text: "平均个人缴费比",
      title: "基本养老保险",
    },
    {
      value: 0.50,
      text: "平均个人缴费比",
      title: "基本失业保险",
    },
    {
      value: 10,
      text: "平均个人缴费比",
      title: "基本医疗保险",
    },
    {
      value: 0.50,
      text: "平均企业缴费比",
      title: "工伤保险",
    },
  ],
});

const showModel = ref(false);
//点击更多事件
const moreClick = () => {
  showModel.value = true;
};
onBeforeMount(() => {
  emitBus.off("closeModel");
});
onMounted(() => {
  emitBus.on("closeModel", () => {
    showModel.value = false;
  });
});
</script>

<style lang="scss" scoped>
.rightBottom {
  border-radius: 10px;
  padding: 18px;
  box-sizing: border-box;
  width: 888px;
  height: 240px;
  background: url("@images/payrollManagement/border.png") 0% 0% / 100% 100% no-repeat;

  .list {
    width: 100%;
    color: #fff;
    font-size: 12px;

    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;

      li.item {
        background: url("@images/payrollManagement/base.png") 0% 0% / 100% 100% no-repeat;
        list-style: none;
        width: 186px;
        height: 142px;
        text-align: center;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 1.44px;
        color: #ffffff;

        p {
          margin: 0;
        }

        .value {
          font-size: 32px;
          font-weight: normal;
          line-height: 40px;
          color: #00ccff;
          letter-spacing: 0;
          margin-bottom: 8px;
        }

        .text {
          margin-bottom: 61px;
        }
      }
    }
  }

  &>.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    p {
      margin: 0;
      font-size: 18px;
      font-weight: normal;
      line-height: 18px;
      letter-spacing: 0px;
      background: linear-gradient(180deg, #ffffff 14%, #54b8fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .more {
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: rgba(214, 239, 255, 0.6);
      cursor: pointer;

      &:hover {
        color: rgba(214, 239, 255, 1);
      }
    }
  }
}
</style>
