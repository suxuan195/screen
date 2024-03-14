<template>
  <div class="screen">
    <Header title="应用平台监测"></Header>
    <div class="checkRouter">
      <span @click="rourerClick"></span>
    </div>
    <div class="menu">
      <div class="left marginRight24">
        <navTitle title="平台应用系统总量" />
        <applicationPlatformNavLeft :imageUrl="state.imgUrl"  :total="state.total[0]"/>
      </div>
      <div class="centerLeft marginRight48">
        <navTitle title="平台注册用户总量" />
        <applicationPlatformNavCenter :imageUrl="state.imgUrl"  :total="state.total[1]"/>
      </div>
      <div class="centerRight marginRight24">
        <navTitle title="平台用户访问总量" />
        <applicationPlatformNavRight :imageUrl="state.imgUrl"  :total="state.total[2]"/>
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <div style="width:93%">
          <leftTopChart></leftTopChart>
          <rightTopChart></rightTopChart>
          <!-- <leftBottom></leftBottom> -->
        </div>
      </div>
     <div class="right" style="color: red;">
      <div style="width:93%;">
        <!-- <rightTopChart></rightTopChart> -->
        <leftBottom></leftBottom>
        <appicationBottom></appicationBottom>
      </div>
  
  </div>
    </div>
    <Menu></Menu>

  </div>
</template>
<script setup>
import { reactive } from "vue";
import Menu from "@components/Menu/index.vue";
import Header from "@components/Header/index.vue";
import navTitle from "@components/navTitle/navTitle.vue";
import applicationPlatformNavLeft from "./cpn/applicationPlatformNavLeft.vue";
import applicationPlatformNavCenter from "./cpn/applicationPlatformNavCenter.vue"
import applicationPlatformNavRight from "./cpn/applicationPlatformNavRight.vue"
import leftTopChart from "./cpn/leftTopChart.vue"
import rightTopChart from "./cpn/rightTopChart.vue"
import appicationBottom from "./cpn/applicationBottom.vue"
import leftBottom from "./cpn/leftBottom.vue"
import { useRouter } from "vue-router";
const router = useRouter();
const rourerClick = () => {
  router.push({
    name: "applicationModuleManagment"
  })
}
const state=reactive({
    imgUrl:"'@images/applicationModuleManagment/应用系统总数量icon.png'",
    total:["26","2333","5896"]
    })


</script>
<style lang="scss" scoped>
.screen {
  background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
  height: 100%;
  width: 100%;
  position: relative;
.menu {
    padding: 20px 60px 22px 47px;
    display: flex;
    // background: pink;
justify-content: space-between;

    // .marginRight24,.marginRight48 {
    //   // width:33%;

    // }
    // .marginRight48,.marginRight24{
    //     // margin-left: 24px;
    // }
}

.bottom{
  width: 100%;
  height: 100%;
  padding: 20px 47px 22px 47px;
  display: flex;

  .right{
    flex:1;
    display: flex; 
    flex-direction: column;
  }
  .left{
    // flex:1;
    width: 60%;
    display: flex; 
    flex-direction: column;
  }
}
}

.checkRouter {
  position: fixed;
  right: 180px;
  top: 100px;
  display: flex;
  gap: 6px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgba(255, 255, 255, .4);

    &:hover {
      background-color: rgba(255, 255, 255, .8);
    }
  }
}
</style>