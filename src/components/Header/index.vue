<template>
  <div class="header">
    <Logo></Logo>
    <div class="all" v-if="allShow" @click="allClick">所有企业</div>
    <div class="title ttf" @click="scale">{{ title }}</div>
    <LeftDate></LeftDate>
    <div class="rightButton" @click.stop="goBack">返回首页</div>
  </div>
</template>

<script setup >
import { ref } from "vue";
import Logo from "@components/Logo/index.vue";
import LeftDate from "@components/LeftDate/index.vue";
const props = defineProps({
  title: {
    type: String,
    default: "数据可视化大屏",
  },
  allShow: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(['allClick'])
const allClick = () => {
  emits('allClick')
}
const fullscreen = ref(false);
const scale = () => {
  if (!fullscreen.value) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  // 切换全屏状态
  fullscreen.value = !fullscreen.value;
};
const goBack = () => {
  window.location.href = 'http://172.31.100.3/gateway/portalindex'
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 98px;
  padding: 0 24px;
  background: url("@images/header.png") 0% 0% / 100% 100% no-repeat;
  position: relative;

  .all {
    cursor: pointer;
    position: absolute;
    top: 34px;
    left: 350px;
    width: 90px;
    text-align: center;
    height: 26px;
    line-height: 26px;
    font-weight: 600;
    border-radius: 80px;
    background: #DBDBDB;
    border-image: linear-gradient(255deg, rgba(255, 255, 255, 0.64) 0%, rgba(50, 64, 200, 0.64) 31%, rgba(255, 255, 255, 0.8) 98%) 1;
    box-shadow: 0px 0px 3px 0px rgba(80, 157, 253, 0.2431), inset 0px 0px 13px 0px rgba(80, 157, 253, 0.5922);
    font-size: 18px;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .title {
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 18px;
    transform: translateX(-50%);
    font-size: 40px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 0.2em;
    background: linear-gradient(180deg, #ffffff 0%, #ffffff 52%, #90d1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
  }

  .rightButton {
    cursor: pointer;
    color: #fff;
    height: 32px;
    padding: 0 30px 0 14px;
    line-height: 32px;
    background: url('./bg.png') center / 100% 100% no-repeat;
    border-radius: 16px 0 0 16px;
    position: absolute;
    right: 24px;
  }
}
</style>