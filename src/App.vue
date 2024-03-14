<template>
  <div class="main-screen">
    <div class="screen-wrapper">
      <div class="screen-box" id="screen">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script  setup>
import { onMounted, onUnmounted } from "vue";
onMounted(() => {
  handleScreenAuto();
  window.onresize = () => handleScreenAuto();
});
onUnmounted(() => {
  window.onresize = () => null;
});
// 大屏自适应
const handleScreenAuto = () => {
  const designDraftWidth = 1920; //设计稿的宽度
  const designDraftHeight = 1080; //设计稿的高度
  //根据屏幕的变化适配的比例
  const scale =
    document.documentElement.clientWidth /
      document.documentElement.clientHeight <
      designDraftWidth / designDraftHeight
      ? document.documentElement.clientWidth / designDraftWidth
      : document.documentElement.clientHeight / designDraftHeight;
  //缩放比例
  document.querySelector(
    "#screen"
  ).style.transform = `scale(${scale}) translate(-50%,-50%)`;
};

</script>

<style scoped lang="scss">
#nprogress .bar {
  background: #7c99fe !important;
}

.main-screen {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;

  .screen-wrapper {
    height: 100%;
    width: 100%;
    background-color: #000;
    position: relative;
  }

  .screen-box {
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: 0 0;
    overflow: hidden;
  }
}

body,
html {
  background: black;
}
</style>
