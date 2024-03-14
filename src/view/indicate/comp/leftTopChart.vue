<template>
  <div class="leftTopChart">
    <div class="mainTitle ttf">
      <p>项目分布情况</p>
    </div>
    <div class="chart">
      <div class="head">
        <div class="title ttf">领导重要指示批示</div>
        <div class="text">
          <p class="subtitle">党的十八大以来，国资委共办理领导重要指示批示</p>
          <p>
            <span class="num">16<span class="unit">件</span></span>，其中党的十九大以来的重要指示共<span class="num">8<span
                class="unit">件</span></span>。
          </p>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in state.list" :key="index">
          <div class="icon">
            <img :src="getImageUrl(item.icon)" alt="" />
          </div>
          <div class="text">
            <div class="name">{{ item.name }}</div>
            <div class="value">
              {{ item.value }}<span class="unit">件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const state = reactive({
  list: [
    {
      name: "全面从严治党",
      value: "2",
      icon: "全面从严治党",
    },
    {
      name: "三大攻坚",
      value: "3",
      icon: "三大攻坚",
    },
    {
      name: "国企改革和加强监管",
      value: "1",
      icon: "国企改革",
    },
    {
      name: "安全生产",
      value: "1",
      icon: "安全生产",
    },
    {
      name: "民生与社会稳定",
      value: "1",
      icon: "民生与社会",
    },
    {
      name: "全面从严治党自主创新",
      value: "2",
      icon: "全面从严治党自主创新",
    },
    {
      name: "外交及国际化经营",
      value: "1",
      icon: "外交及国际化经营",
    },
    {
      name: "中美经贸",
      value: "3",
      icon: "中美经贸",
    },
    {
      name: "其他",
      value: "2",
      icon: "其他",
    },
  ],
});

const getImageUrl = (name) => {
  return new URL(`../../../images/indicate/${name}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.leftTopChart {
  margin-bottom: 50px;

  .chart {
    width: 432px;
    height: 516px;
    background: url("@images/indicate/item-bg.png") 0% 0% / 100% 100% no-repeat;
    position: relative;
    padding: 16px;
    box-sizing: border-box;

    .head {
      .title {
        font-size: 18px;
        line-height: 18px;
        background: linear-gradient(180deg, #ffffff 14%, #54b8fe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        margin-bottom: 10px;
      }

      .subtitle {
        padding-left: 18px;
      }

      .text {
        font-size: 14px;
        letter-spacing: 0.2em;
        color: #ffffff;
        line-height: 1.4;
        position: relative;

        .num {
          font-size: 20px;
          letter-spacing: 0em;
          color: #00ccff;

          .unit {
            font-size: 12px;
          }
        }

        &::before {
          position: absolute;
          content: "";
          left: 0;
          top: -4px;
          width: 11.67px;
          height: 22.23px;
          background: url("@/images/indicate/left.png") 0% 0% / 100% 100% no-repeat;
        }

        &::after {
          position: absolute;
          content: "";
          right: 20px;
          bottom: 0;
          width: 11.67px;
          height: 22.23px;
          background: url("@/images/indicate/left.png") 0% 0% / 100% 100% no-repeat;
          transform: rotate(180deg);
        }
      }
    }

    .list {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      margin-top: 20px;

      .item {
        text-align: center;

        img {
          width: 80px;
        }

        .text {
          .name {
            font-size: 14px;
            line-height: 20px;
            color: #ffffff;
            white-space: nowrap;
          }

          .value {
            font-size: 20px;
            font-weight: bold;
            line-height: 20px;
            color: #00ccff;

            .unit {
              margin-left: 2px;
              display: inline-block;
              font-size: 14px;
              line-height: 1.5;
              color: #ffffff;
              transform: translateY(-1px);
            }
          }
        }
      }
    }
  }
}</style>
