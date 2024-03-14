<template>
  <div class="total">
    <div class="list">
      <div class="item" v-for="(item, index) in state.data" :key="index">
        <div class="img">
          <img :src="item.icon" alt="" />
        </div>
        <div class="text">
          <p>{{ item.name }}</p>
          <div class="num">
            <span class="value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import img1 from "@images/propertyManagement/total-1.png";
import img2 from "@images/propertyManagement/total-2.png";
import img3 from "@images/propertyManagement/total-3.png";
const state = reactive({
  data: [
    {
      name: "登记企业总数",
      value: "1890",
      unit: "户",
      decimals: 0,
      icon: img1,
    },
    {
      name: "登记企业实收资本",
      value: "7766.7722",
      unit: "亿元",
      decimals: 2,
      icon: img2,
    },
    {
      name: "登记企业国有资本",
      value: "7066.3101",
      unit: "亿元",
      decimals: 2,
      icon: img3,
    },
  ],
});
</script>
<style lang="scss" scoped>
.total {
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 768px;
    height: 104px;
    padding: 20px 24px;
    box-sizing: border-box;
    color: #fff;
    .item {
      display: flex;
      align-items: center;
      .img {
        img {
          width: 72px;
          height: 68px;
          object-fit: cover;
          object-position: 0 -9px;
        }
      }
      .text {
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 16px;
          line-height: 24px;
          color: #ffffff;
          margin-bottom: 6px;
        }
        .num {
          .value {
            font-size: 28px;
            line-height: 28px;
            color: #00ccff;
          }
          .unit {
            margin-left: 4px;
            font-size: 16px;
            line-height: 20px;
            color: #ffffff;
            display: inline-block;
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}
</style>
