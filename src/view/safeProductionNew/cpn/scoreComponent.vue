<template>
  <div class="score">
    <div class="score-item">
      <div class="title">{{ props.topList.title }}</div>
      <div class="value">
        <div v-for="(item,index) in props.topList.list" :key="index" class="item">{{item}}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="score-item">
      <div class="title">{{props.bottomList.title}}</div>
      <div class="value">
        <div v-for="(item,index) in props.bottomList.list" :key="index" class="item">{{item}}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  topList: {
    type: Object,
    default() {
      return {}
    }
  },
  bottomList: {
    type: Object,
    default() {
      return {}
    }
  }
})

// const topList = ref({
//   title:'季度',
//   list:[
//       '第一季度',
//       '第二季度',
//       '第三季度'
//   ]
// })
// const bottomList = ref({
//   title:'安全生产责任评分',
//   list:[
//     '70',
//     '90',
//     '60'
//   ]
// })
</script>



<style scoped lang="scss">
.score{
  margin: 12px 0;
  border-bottom:1px dashed rgba(112,128,139,0.9);
  padding-bottom: 18px;
}
.score-item{
  display: flex;
  align-items: center;
}
.title{
  flex: 1;
  color: #32D6F9;
  font-size: 16px;
}
.value{
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item{
  font-size: 16px;
  color: #32D6F9;
  width: 100%;
  text-align: center;
}
.line{
  height: 2px;
  margin: 16px 0;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.2) 1%,
      rgba(153,203,243, 1) 50%,
      rgba(255, 255, 255, 0.2) 99%);
}
</style>
