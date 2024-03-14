<template>
  <div :class="`${state.menuShow ? 'show' : ''} menu`">
    <div class="left" @click.self="isHide(1)">
      <ul>
        <template v-for="(item, index) in state.menuData" :key="index">
          <li v-if="index < 13">
            <div :class="`${route.path == item.path ? 'active' : ''} item`" @click="routeTo(item.path)">
              <span>{{ item.title }}</span>
            </div>
          </li>
        </template>
      </ul>
      <div class="bar"></div>
      <div class="click" @mouseover.stop="isHide(0)"></div>
    </div>
    <div class="right" @click.self="isHide(1)">
      <ul>
        <template v-for="(item, index) in state.menuData" :key="index">
          <li v-if="index >= 13">
            <div :class="`${route.path == item.path ? 'active' : ''} item`" @click="routeTo(item.path)">
              <span>{{ item.title }}</span>
            </div>
          </li>
        </template>
      </ul>
      <div class="bar"></div>
      <div class="click" @mouseover.stop="isHide(0)"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const state = reactive({
  menuShow: 1,
  menuData: [
    {
      title: "国资总览",
      path: '/'
    },
    {
      title: "企业画像",
      path: '/jGEnterpriseManagement'
    },
    {
      title: "业绩考核",
      path: "/performanceObjectives",
    },
    {
      title: "负责人薪酬",
      path: "/headPayManagment",
    },
    {
      title: "能源安全智能化",
      path: "/IntelligentEnergyManagement",
    },
    {
      title: "职工分配调控",
      path: "/workdEmployeeDistribution",
    },
    {
      title: "国有资产统计",
      path: "/stateOwnedAssetsTotal",
    },
    {
      title: "财务风险预警",
      path: "/riskWarning",
    },
    {
      title: "党建工作",
      path: "/partyBuildingPublicity",
    },
    {
      title: "安全生产",
      path: "/safeProduction",
    },
    {
      title: "国企改革",
      path: '/stateEnterpriseReform'
    },
    {
      title: "国有资产追责",
      path: "/stateOwnedAssets",
    },
    {
      title: "应用平台监测",
      path: '/applicationPlatform'
    },
    {
      title: "企业信息",
      path: '/enterpriseInfo'
    },
    {
      title: "企业服务平台监测",
      path: "/enterpriseService",
    },
    {
      title: "产融结合",
      path: "/iFCombine",
    },
    {
      title: "交易监测",
      path: "/propertyMonitoringManagement",
    },
    {
      title: "经济运行监测",
      path: "/industrialEconomyRun",
    },

    {
      title: "产权管理",
      path: "/propertyManagement",
    },
    {
      title: "一带一路",
      path: "/lead",
    },
    {
      title: "供给侧改革",
      path: "/supplySideReformManagment",
    },
    {
      title: "领导指示批复",
      path: '/indicate'
    },
    {
      title: "三重一大",
      path: "/tripleAndLarge",
    },

    {
      title: "财务监督",
      path: '/financialSupervision'
    },
    {
      title: '投资项目综合分析',
      path: "/comprehensiveAnalysis"
    },
    {
      title: "大额资金",
      path: "",
    },










  ],
});

const routeTo = (path) => {
  if (path) {
    router.push(path); 
  }
};

const isHide = (e) => {
  state.menuShow = e;
};
</script>

<style lang="scss" scoped>
.menu {
  ul {
    width: 238px;
    height: 848px;
    display: grid;
    grid-template-rows: repeat(14, 1fr);
    /* 将一行分成12等份 */
    align-items: center;
    /* 垂直居中对齐 */
    justify-content: center;

    li {
      .item {
        cursor: pointer;
        width: 194px;
        height: 40px;
        border-radius: 4px;
        background: rgba(5, 67, 117, 0.24);
        box-sizing: border-box;
        border: 1px solid rgba(62, 168, 255, 0.16);
        box-shadow: inset 0px 0px 5px 0px rgba(154, 252, 255, 0.3);
        text-align: center;
        line-height: 40px;
        transition: all 0.3s;
        position: relative;

        span {
          font-size: 20px;
          color: rgba(214, 235, 247, 0.6);
        }

        &:hover {
          transform: scale(1.1);
          border-color: #00d1f7;

          &::before {
            content: "";
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 100%;
            background: #59dbff;
          }

          &::after {
            content: "";
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 100%;
            background: #59dbff;
          }
        }
      }

      .item.active {
        transform: scale(1.1);
        border-color: #00d1f7;

        &::before {
          content: "";
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 100%;
          background: #59dbff;
        }

        &::after {
          content: "";
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 100%;
          background: #59dbff;
        }
      }
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: 100;
    background: linear-gradient(to right,
        rgba(0, 0, 0, 0.9) 20%,
        rgba(0, 0, 0, 0));
    transition: left 0.3s;

    .bar {
      position: absolute;
      top: 50%;
      left: 228px;
      transform: translate(0, -50%);
      width: 113px;
      height: 934px;
      background: url("@images/menu-left-hover.png") 0% 0% /100% 100% no-repeat;
      background-position-x: 10px;
    }

    .click {
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 282px;
      transform: translate(0, -50%);
      width: 20px;
      height: 300px;
      z-index: 99;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left,
        rgba(0, 0, 0, 0.9) 20%,
        rgba(0, 0, 0, 0));
    transition: right 0.3s;

    .bar {
      position: absolute;
      top: 50%;
      right: 228px;
      transform: translate(0, -50%);
      width: 113px;
      height: 934px;
      background: url("@images/menu-right-hover.png") 0% 0% / 100% 100% no-repeat;
      background-position-x: -10px;
    }

    .click {
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 282px;
      transform: translate(0, -50%);
      width: 20px;
      height: 300px;
      z-index: 99;
    }
  }
}

.menu.show {
  .left {
    width: 320px;
    left: -290px;
    background: linear-gradient(to right,
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 0));

    .click {
      right: 10px;
    }
  }

  .right {
    right: -290px;
    width: 320px;
    background: linear-gradient(to right,
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 0));

    .click {
      left: 10px;
    }
  }
}
</style>
