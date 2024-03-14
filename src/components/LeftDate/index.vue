<template>
  <div class="left-date">
    <div class="date text">{{ dateStr }}</div>
    <span class="line"></span>
    <div class="timer text">{{ timer }}</div>
    <!-- <span class="line"></span> -->
    <!-- <div class="text">你好！欢迎您！</div> -->
  </div>
</template>

<script setup >
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const dateStr = ref("");
const timer = ref("");
const t = ref(null);
const getDate = () => {
  dateStr.value = `${dayjs().format("YYYY-MM-DD")}\u00A0\u00A0${dayjs().format('dddd')
    }`;
  timer.value = dayjs().format("HH:mm:ss");
  t.value = setInterval(() => {
    timer.value = dayjs().format("HH:mm:ss");
  }, 1000);
};
const clearTimer = () => {
  clearInterval(t.value);
  t.value = null;
};

onMounted(() => {
  getDate();
});
onBeforeUnmount(() => {
  clearTimer();
});
</script>

<style lang="scss" scoped>
.left-date {
  padding-left: 20px;
  background: url("@images/triangle.svg") no-repeat left 3px;
  display: flex;
  position: absolute;
  left: 24px;

  .date {
    /* 星期四 */
    margin-left: 5px;
  }

  .text {
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
    letter-spacing: 0em;
    color: #ffffff;
  }

  .timer {
    width: 60px;
  }

  .line {
    /* 矩形 */
    display: block;
    margin: 3px 16px;
    width: 1px;
    height: 16px;
    background: linear-gradient(45deg, #6dcbff 5%, #a9fff2 100%);
  }
}
</style>