<template>
  <div class="rightBottomChart">
    <div class="mainTitle ttf">
      <p>省属企业落实领导重要批示</p>
    </div>
    <div class="chart">
      <p class="subtitle ttf">贯彻落实领导重要指示批示情况</p>
      <ul>
        <li class="item" v-for="(item, index) in state.data" :key="index">
          <p class="value">{{ item.value }}</p>
          <p class="title">{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script setup>
import { reactive } from "vue";

const state = reactive({
  data: [
    {
      value: 2285,
      title: "会议数量",
    },
    {
      value: 3986,
      title: "议题数量",
    },
  ],
});
</script>
  
<style lang="scss" scoped>
.rightBottomChart {
  margin-bottom: 50px;

  .chart {
    width: 420px;
    height: 224px;
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    position: relative;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;

    .subtitle {
      position: absolute;
      left: 16px;
      top: 16px;
      font-size: 18px;
      line-height: 18px;
      background: linear-gradient(180deg, #ffffff 14%, #54b8fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;

      li.item:first-child {
        background: url("@images/indicate/ul1-bg.png") center / 95% 95% no-repeat;
      }

      li.item:last-child {
        background: url("@images/indicate/ul-bg.png") center / 95% 95% no-repeat;

        .value {
          color: #ffc58f;
        }
      }

      li.item {
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
          margin-top: 20px;
          margin-bottom: 85px;
        }

        .title {
          font-size: 16px;
          background: linear-gradient(180deg,
              #ffffff 0%,
              #ffffff 52%,
              #90d1ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          text-shadow: 0px 3.98px 9.96px rgba(166, 178, 255, 0.91);
        }
      }
    }
  }
}
</style>
  