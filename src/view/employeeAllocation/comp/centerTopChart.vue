<template>
  <div class="chartBox">
    <div class="chart">
      <!-- <div class="bar">
        <div :class="`${index == state.tag ? 'active' : ''} item`" @click="selcetBar(index)"
          v-for="(item, index) in state.bar" :key="index">
          {{ item }}
        </div>
      </div> -->
      <div class="list">
        <div class="item" v-for="(item, index) in state.list" :key="index" @click="tabClick(item, index)">
          <div class="num">
            <span v-for="(v, i) in item.value" :key="i">{{ v }}</span>
          </div>
          <div class="title ttf">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <centerTopDialog ref="centerTopDialogRef" :tableHeader="state.tableHeader" :tableData="state.tableData" />
  </div>
</template>
      
<script setup>
import { reactive, onMounted, ref } from "vue";
import centerTopDialog from "../dialog/centerTopDialog.vue";
import { centerTopDialogData } from '../data/analogData'
const state = reactive({
  bar: ["当月数据", "年度数据"],
  tag: 0,
  list: [
    {
      name: "工资发放总额(万元)",
      value: '2937638',
    },
    {
      name: "职工总人数",
      value: '392412',
    },
    {
      name: "人均工资(元)",
      value: '7.4861',
    },
  ],
  tableHeader: [],
  tableData: []
});
// const init = () => {
//   state.list.forEach((item) => {
//     item.value = item.value.toString().padStart(5, "0");
//   });
// };
const centerTopDialogRef = ref(null);
const tabClick = (item, index) => {
  centerTopDialogRef.value.showModel = true
  state.tableHeader = [
    {
      label: '企业名称',
      prop: "enterpriseName"
    },
    {
      label: item.name,
      prop: "wagesTotal"
    }
  ]
  state.tableData = centerTopDialogData[index]
}
onMounted(() => {
  // init();
});

const selcetBar = (e) => {
  state.tag = e;
};
</script>
      
<style lang="scss" scoped>
.chartBox {
  width: 864px;
  height: 268px;
  margin-bottom: 50px;
  margin-top: 32px;
  background: url("@images/employeeAllocation/centerTop-bg.png") 0% 0% / 100% 100% no-repeat;

  .chart {
    position: relative;

    .list {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 268px;
      color: #fff;

      .item {
        width: 220px;
        height: 125px;
        margin: 0 32px;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        background: url("@images/employeeAllocation/ct-bg.png") 0% 0% / 100% 100% no-repeat;
        cursor: pointer;

        .num {
          margin-top: 20px;
          margin-bottom: 4px;

          span {
            display: inline-block;
            width: 24px;
            height: 28px;
            line-height: 28px;
            background: url("@images/employeeAllocation/num-bg.png") 0% 0% / 100% 100% no-repeat;
            margin: 0 2px;
            text-align: center;
          }
        }

        .title {
          font-size: 14px;
        }
      }
    }

    .bar {
      position: absolute;
      right: 10px;
      top: 21px;
      font-size: 12px;
      display: flex;
      z-index: 9;

      .item {
        color: #fff;
        margin-left: 15px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        width: 82px;
        cursor: pointer;
        border-radius: 15px;
        box-sizing: border-box;

        &:hover {
          background: #1766a1;
          border: 1px solid #166cff;
        }
      }

      .item.active {
        background: #1766a1;
        border: 1px solid #166cff;
      }
    }
  }
}
</style>
      