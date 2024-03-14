<template>
  <div class="centerBottomChart">
    <div class="ttf title">{{title}}</div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="left-top">
          <div class="score">
            <span class="score-title">{{score.label}}</span>
            <span class="score-value">{{score.value}}</span>
          </div>
        </div>
        <div class="left-center">
          <scoreComponent :top-list="leftCenterTopList" :bottom-list="leftCenterBottomList"/>
        </div>
        <div class="left-bottom">
          <scoreComponent :top-list="leftBottomTopList" :bottom-list="leftBottomBottomList"/>
        </div>
      </div>
      <div class="bottom-right">
        <div class="right-top">
          <div class="hazard" v-for="(item,index) in hazardList" :key="index">
            <div>
              <span class="hazard-title">{{item.label}}</span>
              <span class="hazard-value">{{item.value}}</span>
            </div>
            <div class="score" v-if="index === 0">
              <span class="score-title">{{hazardCategory.label}}</span>
              <span class="score-value">{{hazardCategory.value}}</span>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <scoreComponent :top-list="rightBottomTopList" :bottom-list="rightBottomBottomList"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import scoreComponent from "./scoreComponent.vue"
import {ref, reactive} from 'vue'

const title = ref('金川集团')
const score = ref({
  label:'年度安全责任评分',
  value:'70'
})
const hazardCategory = ref({
  label:'危险性类别',
  value:'5'
})
const leftCenterTopList = ref({
  title:'季度',
  list:[
    '第一季度',
    '第二季度',
    '上半年'
  ]
})
const leftCenterBottomList = ref({
  title:'安全生产责任评分',
  list:[
    '90',
    '60',
    '80'
  ]
})
const leftBottomTopList = ref({
  title:'季度',
  list:[
    '第三季度',
    '第四季度',
    '下半年'
  ]
})
const leftBottomBottomList = ref({
  title:'安全生产责任评分',
  list:[
    '60',
    '90',
    '90'
  ]
})
const rightBottomTopList = ref({
  title:'危险等级',
  list:[
    '一级',
    '二级',
    '三级',
    '四级'
  ]
})
const rightBottomBottomList = ref({
  title:'安全生产责任评分',
  list:[
    '2',
    '4',
    '9',
    '8'
  ]
})
const hazardList = ref([
  {
    label:'危险化学重大危险源',
    value:'70'
  },
  {
    label:'工业园区危险化学品重大危险源',
    value:'70'
  },
  {
    label:'不是工业园区危险化学品重大危险源',
    value:'70'
  }
])
</script>

<style lang="scss" scoped>
.centerBottomChart {
  background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
  width: 864px;
  height: 283px;
  padding: 16px;
}
.title{
  font-size: 18px;
  background: linear-gradient(to bottom, #ffffff, #54B8FE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bottom{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bottom-left{
  flex: 1;
  margin-right: 12px;
}
.left-top{

}
.score{

}
.score-title{
  font-size: 16px;
  color: #ffffff;
}
.score-value{
  font-size: 24px;
  color: #6BDAFF;
  margin-left: 8px;
}
.bottom-right{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 12px;
}
.right-top{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 149px;
}
.hazard{
  display: flex;
  align-items: center;
  justify-content: space-between;
 }
.hazard-title{
  font-size: 16px;
  color: #ffffff;
}
.hazard-value{
  font-size: 24px;
  color: #F1606C;
  margin-left: 8px;
}
</style>
