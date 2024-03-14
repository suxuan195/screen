<template>
  <div class="centerTopChart">
    <div class="list" @wheel="handleWheel" id="scroll-container">
      <div class="item" @click="showChart(item)" v-for="(item, index) in list" :key="index">
        <div class="item-child" v-for="(it,ind) in item" :key="ind">
          <span class="item-label">{{ it.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, reactive, nextTick, onMounted} from 'vue'
const list = reactive([
  [
    {
      label: '金川集团股份有限公司',
      value: ''
    },
    {
      label: '酒泉钢铁（集团）有限责任公司',
      value: ''
    },
    {
      label: '白银有色集团股份有限公司',
      value: ''
    },
    {
      label: '兰州兰石集团有限公司',
      value: ''
    },
    {
      label: '甘肃省农垦集团有限责任公司',
      value: ''
    }
  ],
  [
    {
      label: '甘肃省国际物流集团有限公司',
      value: ''
    },
    {
      label: '甘肃省民航机场集团有限公司',
      value: ''
    },
    {
      label: '甘肃省国有资产投资集团有限公司',
      value: ''
    },
    {
      label: '甘肃省建设投资（控股）集团有限公司',
      value: ''
    },
    {
      label: '甘肃省电力投资集团有限责任公司',
      value: ''
    }
  ]
  ,
  [
    {
      label: '甘肃省公路航空旅游投资集团有限公司',
      value: ''
    },
    {
      label: '甘肃省城乡发展投资集团有限公司',
      value: ''
    },
    {
      label: '甘肃能源化工投资集团有限公司',
      value: ''
    },
    {
      label: '甘肃能化股份有限公司',
      value: ''
    },
    {
      label: '甘肃省铁路投资建设集团有限公司',
      value: ''
    }
  ],
  [
    {
      label: '甘肃工程咨询集团股份有限公司',
      value: ''
    },
    {
      label: '甘肃电气装备集团有限公司',
      value: ''
    },
    {
      label: '甘肃省公路交通建设集团有限公司',
      value: ''
    },
    {
      label: '甘肃科技投资集团有限公司',
      value: ''
    },
    {
      label: '丝绸之路信息港股份有限公司',
      value: ''
    }
  ]
  ,
  [
    {
      label: '甘肃药业投资集团有限公司',
      value: ''
    },
    {
      label: '甘肃文旅产业集团有限公司',
      value: ''
    },
    {
      label: '甘肃省水务发展集团有限公司',
      value: ''
    },
    {
      label: '甘肃新盛国资管理运营有限公司',
      value: ''
    },
    {
      label: '甘肃省新业资产经营有限责任公司',
      value: ''
    }
  ]
  ,
  [

    {
      label: '白银有色产业集团有限责任公司',
      value: ''
    },
    {
      label: '甘肃省长城建设集团有限责任公司',
      value: ''
    },
    {
      label: '丝绸之路国际知识产权港有限责任公司',
      value: ''
    }
  ]
])
const showChart = (name) => {
};
const handleWheel = (event) => {
  // 阻止默认的滚动行为
  event.preventDefault();

  // 获取滚轮的滚动量，这里的 `100` 是滚动速度，可以根据需要调整
  const delta = event.deltaY > 0 ? 35 : -100;

  // 设置滚动
  event.currentTarget.scrollLeft += delta;
}
</script>

<style lang="scss" scoped>
.centerTopChart {
  background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
  width: 864px;
  height: 498px;
  padding: 2px 4px;
}

.list {
  display: flex;
  overflow: hidden;
  //overflow-x: auto;
}

.item {

}

.item-child{
  width: 256px;
  margin: 14px 16px;
  box-sizing: border-box;
  //cursor: pointer;
  border-radius: 16px;
  border: 1px solid #D8D8D8;
  padding: 4px 12px;
  background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #C6EBF4 71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 12px #5CB2C7;

  box-shadow: inset 0 0 20px rgba(23, 59, 127, 1);
}

.item-label {
  font-size: 24px;
  background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #C6EBF4 71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
