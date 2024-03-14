<template>
  <div class="total">
    <div class="list">
      <div class="item" v-for="(item, index) in state.data" :key="index">
        <div class="img">
          <img :src="item.icon" alt="" />
        </div>
        <div class="text" @click="itemClick(index)">
          <p>{{ item.name }}</p>
          <div class="num">
            <span class="value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 企业总数 -->
    <teleport to="#screen">
      <total-number-enterprises-dialog ref="totalNumberEnterprisesRef" />
    </teleport>
    <!-- 企业员工人数 -->
    <teleport to="#screen">
      <enterpriseEmployeeDialog ref="enterpriseEmployeeRef" />
    </teleport>
    <!-- 企业资产总额 -->
    <teleport to="#screen">
      <totale-enterprise-assets-dialog ref="totaleEnterpriseAssetsRef" />
    </teleport>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import totalNumberEnterprisesDialog from '../dialog/totalNumberEnterprisesDialog.vue';
import enterpriseEmployeeDialog from '../dialog/enterpriseEmployeeDialog.vue';
import totaleEnterpriseAssetsDialog from '../dialog/totaleEnterpriseAssetsDialog.vue'
import img1 from "@images/overview/icon-1.png";
import img2 from "@images/overview/icon-2.png";
import img3 from "@images/overview/icon-3.png";
const state = reactive({
  data: [
    {
      name: "企业总数（户）",
      value: "1,891",
      icon: img1,
    },
    {
      name: "资产总额（亿元）",
      value: "16,842.51",
      icon: img2,
    },
    {
      name: "员工总数（人）",
      value: "291,896",
      icon: img3,
    },
  ],
});
const totalNumberEnterprisesRef = ref(null)
const enterpriseEmployeeRef = ref(null)
const totaleEnterpriseAssetsRef = ref(null)
const itemClick = (index) => {
  switch (index) {
    case 0:
      totalNumberEnterprisesRef.value.showModel = true
      break;
    case 1:
      totaleEnterpriseAssetsRef.value.showModel = true
      break;
    case 2:
      enterpriseEmployeeRef.value.showModel = true
      break;
    default:
      break;
  }
}
</script>
<style lang="scss" scoped>
.total {
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  background: url(/src/images/overview/total-bg.png) 0% 0%/100% 100% no-repeat;

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
          height: 64px;
          object-fit: cover;
          object-position: 0 -5px;
        }
      }

      .text {
        cursor: pointer;
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
