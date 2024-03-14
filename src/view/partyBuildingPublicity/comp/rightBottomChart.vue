<template>
  <div class="rightBottom">
    <div class="mainTitle ttf">
      <p>“两优一先”表彰</p>
    </div>
    <div class="list">
      <div class="tabs">
        <p v-for="item, index in state.tabs" :key="index" :class="index == key ? 'active' : ''" @click="key = index">{{
          item }}</p>
      </div>
      <div class="item" v-for="(item, index) in state.list" :key="index" :style="`left:${item.left}px;
                        top:${item.top}px;
                        background:${item.background};
                        box-shadow:${item.boxShadow};
                        width:${item.width};
                        height:${item.height}`">
        <div v-if="item.isHaveItem" class="item-circle">
          <div class="circle-title">
            <span :style="`color:#fff;font-size:16px;`" style="white-space: nowrap;">{{ item.name }}</span>
            <span style="color: #ffffff;">
              <span style="font-size: 32px;">{{ state.dataList[key][index] }}</span>
              <span style="font-size: 14px;">{{ item.unit }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeMount, ref, nextTick } from "vue";
import emitBus from "@/utils/bus";
const refRightBottomDiaChart = ref(null);
const key = ref(0)
const state = reactive({
  tabs: ['国家级', '省级', '省国资委', '企业集团'],
  dataList: [
    [130, 310, 240],
    [60, 40, 20],
    [40, 20, 30],
    [30, 30, 40],
  ],
  showModel: false,
  list: [
    {
      name: "优秀共产党员",
      num: '30',
      unit: '名',
      left: 150,
      width: '120px',
      height: '120px',
      top: 50,
      isHaveItem: true,
      color: '#00CCFF',
      background: 'radial-gradient(70% 70% at 53% 50%, #02252E 10%, #00CCFF 100%);',
      boxShadow: '0px 0px 20px 0px rgba(0, 204, 255, 0.7),inset 0px 0px 9px 0px #00CCFF;'
    },
    {
      name: "优秀党务工作者",
      num: '30',
      unit: '名',
      left: 37,
      top: 224,
      width: '120px',
      height: '120px',
      isHaveItem: true,
      color: '#F6BB3B',
      background: 'radial-gradient(62% 60% at 50% 50%, #2B1D00 17%, #B38728 64%, #F3C45F 77%, #F6BB3B 100%);',
      boxShadow: '0px 0px 20px 0px rgba(246, 187, 59, 0.7),inset 0px 0px 9px 0px #F6BB3B;'
    },
    {
      name: "先进基层党组织",
      num: '40',
      unit: '人',
      left: 266,
      top: 183,
      width: '120px',
      height: '120px',
      isHaveItem: true,
      color: '#26C296',
      background: 'radial-gradient(69% 69% at 55% 44%, #05271E 17%, #18FFBE 95%);',
      boxShadow: '0px 0px 20px 0px rgba(38, 194, 150, 0.7),inset 0px 0px 9px 0px #26C296;'
    },
    {
      name: "",
      num: '',
      left: 91,
      top: 74,
      width: '20px',
      height: '20px',
      isHaveItem: false,
      color: '#26C296',
      background: 'radial-gradient(73% 73% at 61% 39%, #041A36 0%, #45E79D 100%);',
      boxShadow: '0px 0px 30px 0px #50CC93,inset 0px 0px 10px 0px #B5F3FA;'
    },
    {
      name: "",
      num: '',
      left: 300,
      top: 69,
      width: '12px',
      height: '12px',
      isHaveItem: false,
      color: '#26C296',
      background: 'radial-gradient(73% 73% at 61% 39%, #041A36 0%, #00E5FF 100%);',
      boxShadow: '0px 0px 30px 0px rgba(63, 255, 255, 0.7),inset 0px 0px 10px 0px #B5F3FA;'
    },
    {
      name: "",
      num: '',
      left: 75,
      top: 149,
      width: '40px',
      height: '40px',
      isHaveItem: false,
      color: '#26C296',
      background: 'radial-gradient(73% 73% at 61% 39%, #041A36 0%, #00E5FF 100%);',
      boxShadow: '0px 0px 30px 0px rgba(63, 255, 255, 0.7),inset 0px 0px 10px 0px #B5F3FA;'
    },
    {
      name: "",
      num: '',
      left: 311,
      top: 126,
      width: '16px',
      height: '16px',
      isHaveItem: false,
      color: '#26C296',
      background: 'radial-gradient(107% 107% at 50% 50%, #041A36 0%, #58699A 100%);',
      boxShadow: '0px 0px 30px 0px #9AAEE8,inset 0px 0px 10px 0px #81B2FF;'
    },
    {
      name: "",
      num: '',
      left: 209,
      top: 230,
      width: '24px',
      height: '24px',
      isHaveItem: false,
      color: '#26C296',
      background: 'radial-gradient(73% 73% at 61% 39%, #041A36 0%, #58699A 100%);',
      boxShadow: '0px 0px 30px 0px #9AAEE8,inset 0px 0px 10px 0px #81B2FF;'
    },
    {
      name: "",
      num: '8人',
      left: 244,
      top: 316,
      width: '20px',
      height: '20px',
      isHaveItem: false,
      color: '#26C296',
      background: 'radial-gradient(73% 73% at 61% 39%, #041A36 0%, #45E79D 100%);',
      boxShadow: '0px 0px 30px 0px #50CC93,inset 0px 0px 10px 0px #B5F3FA;'
    }
  ],
});
onBeforeMount(() => {
  emitBus.off("closeModel");
});
onMounted(() => {
  emitBus.on("closeModel", () => {
    state.showModel = false;
  });
});
</script>

<style lang="scss" scoped>
.rightBottom {
  width: 420px;
  height: 442px;

  .list {
    position: relative;
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    height: 382px;
    width: 420px;

    //padding: 10px;
    //display: grid;
    //grid-template-columns: repeat(4, 1fr);
    //grid-template-rows: repeat(4, 1fr);
    //grid-gap: 4px;
    .item {
      position: absolute;
      //left: 0px;
      //top: 0px;
      //width: 120px;
      //height: 120px;
      border-radius: 50%;
      opacity: 1;
      border: 1px dashed #47DAFF;

      .item-circle {
        position: absolute;
        left: 11px;
        top: 11px;
        width: 80%;
        height: 80%;
        border-radius: 50%;
        opacity: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
        transform: rotate(45deg);

        .circle-title {
          transform: rotate(-45deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}

.tabs {
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  padding-top: 10px;
  gap: 20px;

  p {
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    padding: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;

    &.active,
    &:hover {
      background-color: rgba(204, 159, 57, 0.7);

    }
  }

}
</style>
