<template>
  <div class="centerMap">
    <div class="main">
      <div class="text">
        <div class="item" v-for="(item, index) in text" :key="index">
          <div class="p">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="img">
        <div class="bg-1"></div>
        <div class="bg-2"></div>
        <div class="bg-3"></div>
        <div class="bg-4"></div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
const text = ref("领导重要指示批示");
</script>
  
<style lang="scss" scoped>
.centerMap {
  width: 864px;
  height: 516px;
  position: fixed;
  left: 50%;
  top: 108px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  background: url("@images/indicate/center-bg.png") 0% 0% / 100% 100% no-repeat;
  margin-top: 36px;
  padding: 32px 16px;
  box-sizing: border-box;

  .main {
    width: 100%;
    height: 100%;
    background: url("@images/indicate/center.png") 0% 0% / 100% 100% no-repeat;
    position: relative;

    .text {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;

      .item {
        margin-bottom: 130px;
        width: 60px;
        height: 70px;
        font-size: 40px;
        font-weight: normal;
        line-height: 70px;
        letter-spacing: 0.2em;
        text-align: center;
        background: linear-gradient(180deg,
            #ffffff 0%,
            #ffffff 52%,
            #90d1ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: 0px 3.98px 9.96px rgba(166, 178, 255, 0.91);

        .p {
          background: url("@images/indicate/text-bg.png") center / 100% 100% no-repeat;
          box-sizing: border-box;
          padding-left: 7px;
        }

        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .img {
      width: 598px;
      height: 259px;
      position: absolute;
      left: 117px;
      top: 28px;
      overflow: hidden;
      z-index: 1;

      div {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .bg-1 {
        background: url("@images/indicate/bg-1.png") -20px 60px / 200% 100% no-repeat;

        animation: toRight 12s linear infinite alternate;
      }

      .bg-2 {
        background: url("@images/indicate/bg-2.png") -20px 60px / 200% 100% no-repeat;

        animation: toRight1 10s linear infinite alternate;
      }

      .bg-3 {
        background: url("@images/indicate/bg-3.png") -20px 60px / 200% 100% no-repeat;

        animation: toRight2 8s linear infinite alternate;
      }

      .bg-4 {
        background: url("@images/indicate/bg-4.png") -20px 60px / 200% 100% no-repeat;

        animation: toRight3 6s linear infinite alternate;
      }
    }
  }
}

@keyframes toRight {
  0% {
    background-position: 10% 80px;
  }

  100% {
    background-position: 90% 80px;
  }
}

@keyframes toRight1 {
  0% {
    background-position: 10% 80px;
  }

  100% {
    background-position: 90% 80px;
  }
}

@keyframes toRight2 {
  0% {
    background-position: 10% 80px;
  }

  100% {
    background-position: 90% 80px;
  }
}

@keyframes toRight3 {
  0% {
    background-position: 20% 120px;
  }

  100% {
    background-position: 90% 120px;
  }
}
</style>