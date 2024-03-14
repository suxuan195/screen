<template>
  <div class="footer">
    <div class="list">
      <div :class="`${state.active == item.tag ? 'active' : ''} item`" v-for="item in state.tabs" :key="item.tag"
        @click="selectTag(item.tag)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const state = reactive({
  tabs: [
    // {
    //   name: "境内分布情况",
    //   tag: 0,
    // },
    // {
    //   name: "境外分布情况",
    //   tag: 1,
    // },
    // {
    //   name: "级次分布情况",
    //   tag: 2,
    // },
  ],
  active: 0,
});

const emits = defineEmits(["selectTag"]);
const selectTag = (e) => {
  state.active = e;
  emits("selectTag", e);
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  width: 1600px;
  height: 74px;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: url("@images/overview/footer.png") 0% 0% / 100% 100% no-repeat;
  background-position-y: 30px;
  display: flex;
  justify-content: center;
  z-index: 3;

  .list {
    display: flex;
    align-content: center;
    justify-content: space-around;
    width: 480px;
    height: 36px;

    .item {
      cursor: pointer;
      color: #d6ebf7;
      font-size: 12px;
      line-height: 36px;
      text-align: center;
      width: 110px;
      background: url("@images/propertyManagement/footer-item.png") center / 90% 76% no-repeat;

      &:hover {
        background: url("@images/propertyManagement/footer-item-hover.png") 0% 0% / 100% 100% no-repeat;
        color: #f5a756;
      }
    }

    .item.active {
      background: url("@images/propertyManagement/footer-item-hover.png") 0% 0% / 100% 100% no-repeat;
      color: #f5a756;
    }
  }
}
</style>