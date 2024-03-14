<template>
  <div class="rightCenterChart">
    <div class="mainTitle">
      <p class="ttf">决策分析</p>
      <div class="unit">单位：个</div>
    </div>

    <div class="chart">
      <div class="list">
        <div class="item" v-for="(item, index) in state.titleMenu" :key="index">
          <div class="title line">{{ item }}</div>
          <div class="num line" v-for="(v, i) in state.data[index]" :key="`data${i}`">
            <div class="text" @click="itemClick(index, i)">
              <p class="value" :style="`color:${state.colorList[index][i]};`">
                {{ v }}
              </p>
              <p class="subtitle">{{ state.title[index][i] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 决策分析-异常情况：总数 -->
    <decision-analysis-exceptions-dialog ref="decisionAnalysisExceptionsRef" :title="title" />
    <!-- 决议情况 -->
    <resolution-situation-dialog ref="resolutionSituationRef" />
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import decisionAnalysisExceptionsDialog from '../dialog/decisionAnalysisExceptionsDialog.vue'
import resolutionSituationDialog from '../dialog/resolutionSituationDialog.vue'
const state = reactive({
  titleMenu: ["决议情况", "异常情况"],
  data: [
    ["25,425", "72", "57"],
    ["555", "450", "105"],
  ],
  title: [
    ["通过", "缓议", "否决"],
    ["总数", "整改", "未整改"],
  ],
  colorList: [
    ["#34FF9D", "#FFD74A", "#FF6420"],
    ["#FFD74A", "#34FF9D", "#FF6420"],
  ],
});
const title = ref('')
const decisionAnalysisExceptionsRef = ref(null)
const resolutionSituationRef = ref(null)
onMounted(() => { });
const itemClick = (index, i) => {
  if (index === 0) {
    resolutionSituationRef.value.showModel = true
  } else {
    title.value = '决策分析异常总数:' + state.title[index][i]
    decisionAnalysisExceptionsRef.value.showModel = true
  }
}
</script>

<style lang="scss" scoped>
.rightCenterChart {
  width: 432px;
  height: 264px;
  margin-bottom: 40px;

  .mainTitle {
    position: relative;

    .unit {
      font-size: 16px;
      line-height: 16px;
      color: rgba(214, 239, 255, 0.6);
      position: absolute;
      right: 0;
      top: 6px;
    }
  }

  .chart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;

    .list {
      width: 432px;
      height: 202px;
      padding: 16px;
      box-sizing: border-box;

      .item {
        display: flex;
        align-items: center;
        width: 400px;
        height: 80px;
        background: url("@images/overview/bg-1.png") 0% 0% / 100% 100% no-repeat;

        .title {
          padding: 0 20px;
          width: 80px;
          height: 24px;
          font-size: 20px;
          line-height: 24px;
          color: #00ccff;
        }

        .num {
          width: 90px;
          text-align: center;

          .text {
            cursor: pointer;

            .value {
              font-size: 24px;
              line-height: 28px;
              margin-bottom: 4px;
            }

            .subtitle {
              font-size: 16px;
              line-height: 1;
              color: #fff;
            }
          }
        }

        .num:last-child {
          &::before {
            display: none !important;
          }
        }
      }
    }
  }
}

.line {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 56px;
    background: linear-gradient(180deg,
        rgba(255, 255, 255, 0.03) 0%,
        #ffffff 51%,
        rgba(255, 255, 255, 0.06) 100%);
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
