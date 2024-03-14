<template>
    <div class="screen">
        <Header title="业绩考核"></Header>
        <div class="checkRouter">
            <span @click="rourerClick"></span>
        </div>
        <ul class="mainBox">
            <li class="leftBox">
                <navTitle title="往年考核结果" />
                <leftBox />
            </li>
            <li class="rightBox">
                <navTitle title="本年度考核目标" />
                <rightBox />
            </li>
        </ul>
        <!-- <rightBottomDialog ref="rightBottomDialogRef" /> -->
        <Menu></Menu>
    </div>
</template>
          
<script setup>
import Menu from "@components/Menu/index.vue";
import leftBox from "./cpn/leftBox.vue";
import rightBox from "./cpn/rightBox.vue"
import rightBottomDialog from "./dialog/rightBottomDialog.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const rourerClick = () => {
  router.push({
    name: "performanceEvaluation"
  })
}
// import { onMounted, ref } from 'vue';
// const rightBottomDialogRef = ref(null);
// onMounted(() => {
//     rightBottomDialogRef.value.showModel = true
// })
</script>
          
<style lang="scss" scoped>
.screen {
    background: url("@images/payrollManagement/main-bg.jpg") 0% 0% / 100% 100% no-repeat;
    width: 100%;
    height: 100%;

    .mt40 {
        margin-top: 40px;
    }

    .mainBox {
        display: flex;
        padding: 38px 47px;
        justify-content: space-between;
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
