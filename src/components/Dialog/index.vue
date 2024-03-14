<template>
  <div class="popup" v-show="props.showModel" @click.self="closeModel">
    <div class="box" :style="`width: ${width}px; height: ${height}px`">
      <div class="left"></div>
      <div class="right"></div>
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="header1">
        <div class="goBack ttf" v-if="isBack" @click="goBack">
          <el-icon>
            <ArrowLeftBold />
          </el-icon>
          <span>返回上一级</span>
          <div class="line ttf"></div>
        </div>
        <div class="title ttf">{{ title }}</div>
        <div class="close" @click="closeModel">
          <el-icon>
            <CloseBold />
          </el-icon>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  showModel: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: "默认",
    required: true,
  },
  isBack: {
    type: Boolean,
    default: false,
  }
});
const emits = defineEmits(["close", "goBack"]);
const closeModel = () => {
  emits("close");
};
const goBack = () => {
  emits('goBack')
}
</script>
  
<style lang="scss" scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  background: linear-gradient(270deg,
      rgba(1, 7, 17, 0.8) 9%,
      rgba(1, 7, 17, 0.8) 89%);
  z-index: 10000;

  .box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* border: 1px solid #ffffff; */
    background: linear-gradient(108deg,
        rgba(43, 139, 200, 0.18) 12%,
        rgba(50, 96, 126, 0.3) 85%);

    // backdrop-filter: blur(5px);
    .header1 {
      height: 50px;
      background-image: url("@images/chart_title.png");
      background-size: 100% 100%;

      .title {
        display: inline-block;
        font-size: 24px;
        font-weight: normal;
        line-height: 24px;
        padding-bottom: 4px;
        letter-spacing: 0.2em;
        background: linear-gradient(180deg,
            #ffffff 0%,
            #ffffff 52%,
            #90d1ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
      }

      .goBack {
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        font-weight: normal;
        letter-spacing: 0.2em;
        text-shadow: 0px 4px 10px #00CCFF;
        padding-bottom: 6px;
        /* <返回上一级 */
        color: #00CCFF;
        margin-right: 24px;

        .line {
          width: 5px;
          height: 18px;
          line-height: 18px;
          background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
          transform: skewX(-15deg);
          margin-left: 24px;
        }
      }

      .close {
        color: #ffffff;
        cursor: pointer;
        position: absolute;
        right: 20px;

        .el-icon {
          font-size: 24px;
        }
      }

      display: flex;
      align-items: center;
      padding-left: 85px;
      padding-right: 12px;
    }

    .left {
      background-image: url("@images/路径-2.png");
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      width: 50px;
      height: 50px;
    }

    .right {
      background-image: url("@images/路径.png");
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      width: 50px;
      height: 50px;
      cursor: pointer;
    }

    .top {
      background-image: url("@images/路径-4.png");
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 50px;
    }

    .bottom {
      background-image: url("@images/路径-3.png");
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
  