<template>
  <div class="topTitle">
    <div class="leftTitle">
      <h2 class="ttf">总交易金额</h2>
      <span>（单位万元）</span>
    </div>
    <div class="centerNum">
      <div class="item">
        <p><span>2</span></p>
        <p><span>5</span></p>
        <p><span>1</span></p>
      </div>
      <div class="item">
        <p><span>1</span></p>
        <p><span>2</span></p>
        <p><span>3</span></p>
      </div>
      <div class="item">
        <p><span>4</span></p>
        <p><span>5</span></p>
        <p><span>8</span></p>
      </div>
    </div>
    <div class="right">
      <center-total />
    </div>
  </div>
</template>

<script setup>
import centerTotal from "./centerTotal.vue";
</script>

<style lang="scss">
.topTitle {
  width: 100%;
  height: 146.63px;
  border-radius: 8px;
  background: url("@images/propertyManagement/item-bg.png");
  background-size: 100% 100%;
  background-color: rgba(7, 19, 33, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  .leftTitle {
    padding-left: 80px;
    display: flex;
    align-items: flex-end;
    h2 {
      font-size: 32px;
      font-weight: normal;
      line-height: 32px;
      letter-spacing: 0.2em;
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        #ffffff 52%,
        #90d1ff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
    }
    span {
      padding-bottom: 5px;
      vertical-align: bottom;
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: normal;
      line-height: 14px;
      letter-spacing: 0.2em;
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        #ffffff 52%,
        #90d1ff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
    }
  }
  .centerNum {
    margin-left: 17px;
    display: flex;
    .item:not(:last-child) {
      margin-right: 16px;
    }
    .item {
      p {
        background-image: url("@images/propertyMonitoringManagement/chang.png");
        background-size: 100% 100%;
        margin-right: 2px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 48px;
        border-radius: 2px;
        font-weight: normal;
        line-height: 40px;
        letter-spacing: 0.2em;
        span {
          font-size: 40px;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #ffffff 52%,
            #90d1ff 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
        }
      }
    }
  }
  .right {
    margin-left: 200px;
  }
}
</style>
