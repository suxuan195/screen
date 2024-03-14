<template>
  <div class="leftCenterTable">
    <div class="mainTitle ttf">
      <p>资金支出情况</p>
    </div>
    <div class="tableBox">
      <div class="list">
        <div :class="`item it${index}`" v-for="(item, index) in state.list" :key="index">
          <div class="top">
            <p class="value" @click="itemClick(index)">
              {{ item.value }}
              <span class="unit">{{ item.unit }}</span>
            </p>
            <p class="perce" v-if="item.perce">
              {{ item.perce }}<span>%</span>
            </p>
          </div>
          <p class="name">{{ item.name }}</p>
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
      name: "大额资金明细",
      value: "8",
      unit: "笔",
    },
    {
      name: "本月大额支出",
      value: "7.83",
      unit: "亿元",
      perce: "-99.01",
    },
    {
      name: "昨日新增总支出",
      value: "31.92",
      unit: "亿元",
    },
    {
      name: "本月支出金额",
      value: "39.03",
      unit: "亿元",
      perce: "-95.54",
    },
  ],
});
const itemClick = (index) => {
  switch (index) {
    case 0:

      break;
    case 1:

      break;
    case 2:

      break;
    case 3:

      break;

    default:
      break;
  }
}
</script>

<style lang="scss" scoped>
.leftCenterTable {
  width: 432px;
  height: 264px;
  margin-bottom: 40px;

  .tableBox {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    height: 202px;
    width: 432px;
    padding: 16px;
    box-sizing: border-box;

    .list {
      width: 400px;
      height: 170px;
      background: url("@images/overview/bg.png") no-repeat;
      background-position: center;
      background-size: contain;

      position: relative;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;

          .perce {
            margin-bottom: 6px;
            font-size: 18px;
            line-height: 18px;
            color: #ffffff;
            text-shadow: 0px 0px 4px #00a7ff, 0px 0px 10px #0091ff;

            span {
              margin-left: 4px;
              font-size: 12px;
              line-height: 14px;
              color: #ffffff;
            }
          }
        }

        width: 210px;
        height: 56px;
        background: url("@images/overview/line2r.png") 0% 0% / 100% 100% no-repeat;
        position: absolute;
        padding: 5px 12px 5px 24px;
        box-sizing: border-box;

        .value {
          font-size: 18px;
          line-height: 18px;
          color: #ffffff;
          text-shadow: 0px 0px 4px #00a7ff, 0px 0px 10px #0091ff;
          margin-bottom: 6px;
        }

        .unit {
          font-size: 12px;
          line-height: 18px;
          color: #ffffff;
          display: inline-block;
          transform: translateY(-2px);
        }

        .name {
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
        }
      }

      .it0 {
        left: 0;
        top: 0;
      }

      .it1 {
        right: 0;
        top: 0;
      }

      .it2 {
        left: 0;
        bottom: 0;
      }

      .it3 {
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
