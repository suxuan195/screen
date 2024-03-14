<template>
  <div class="centerBottomChart">
    <ul class="plant">
      <li v-for="(item, index) in state.bottomList" :key="index">
        <p :style="`background-image: url(${item.img});`"></p>
        <div class="content" @click="bottomShowModel(index)">
          <h2>{{ item.name }}</h2>
          <span>{{ item.value }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, computed, nextTick} from 'vue'
import windImg1 from '@images/IntelligentEnergyManagement/风电厂站.png'
import windImg2 from '@images/IntelligentEnergyManagement/光伏厂站.png'
import windImg3 from '@images/IntelligentEnergyManagement/水电厂站.png'
import windImg4 from '@images/IntelligentEnergyManagement/火电厂站.png'
import {useIndex} from "../hooks/index";

const {getResult2} = useIndex();
const stationTotals = ref([])
let coordinatesArray = reactive([])
let windStation = ref([])
let lightStation = ref([])
let waterStation = ref([])
let fireStation = ref([])

// 使用计算属性来确保响应性
const bottomList = computed(() => [
  {
    name: '风电厂站',
    img: windImg1,
    value: stationTotals.value[0] || 0
  },
  {
    name: '光伏厂站',
    img: windImg2,
    value: stationTotals.value[1] || 0
  },
  {
    name: '水电厂站',
    img: windImg3,
    value: stationTotals.value[2] || 0
  },
  {
    name: '火电厂站',
    img: windImg4,
    value: stationTotals.value[3] || 0
  }
])
const state = reactive({
  bottomList: bottomList
})
const emit = defineEmits(['bottomShowModel', 'getCoordinatesArray'])
const bottomShowModel = async (e) => {
  // console.log(e, 'e')
  let arr = []
  let title = ''
  switch (e) {
    case 0:
      arr = windStation.value
      title = '风电厂站'
      break;
    case 1:
      arr = lightStation.value
      title = '光伏厂站'
      break;
    case 2:
      arr = waterStation.value
      title = '水电厂站'
      break;
    case 3:
      arr = fireStation.value
      title = '火电厂站'
      break;
    default:
      arr = windStation.value
      title = '风电厂站'
  }
  await nextTick();
  emit('bottomShowModel', e, arr, title)
}
const extractCoordinatesArray = (dataArray) => {
  return dataArray.map(item => {
    return {
      name: item['厂站名称'],
      value: item["经纬度"].split(',').map(Number),
      count:item['装机容量']
    }
  });
}
onMounted(async () => {
  windStation.value = await getResult2(6)
  stationTotals.value.push(windStation.value.length)
  lightStation.value = await getResult2(7)
  stationTotals.value.push(lightStation.value.length)
  waterStation.value = await getResult2(8)
  stationTotals.value.push(waterStation.value.length)
  fireStation.value = await getResult2(9)
  stationTotals.value.push(fireStation.value.length)

  const windStationArr = extractCoordinatesArray(windStation.value);
  const lightStationArr = extractCoordinatesArray(lightStation.value);
  const waterStationArr = extractCoordinatesArray(waterStation.value);
  const fireStationArr = extractCoordinatesArray(fireStation.value);
  coordinatesArray = windStationArr.concat(lightStationArr).concat(waterStationArr).concat(fireStationArr)
  emit('getCoordinatesArray', coordinatesArray)
})
</script>

<style lang="scss" scoped>
.centerBottomChart {
  width: 776px;
  height: 104px;
  background-image: url('@images/IntelligentEnergyManagement/centerBottom_bg.png');
  background-size: 100% 100%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
  padding: 22px 24px;
  box-sizing: border-box;

  .plant {
    display: flex;
    justify-content: space-between;

    li {
      display: flex;

      p {
        width: 72px;
        height: 80px;
        background-size: 100% 100%;
      }

      .content {
        cursor: pointer;
        padding-left: 8px;
        display: flex;
        flex-direction: column;

        h2 {
          padding-top: 5px;
          font-size: 18px;
          font-weight: normal;
          line-height: 24px;
          letter-spacing: 0px;
          color: #FFFFFF;

        }

        span {
          padding-top: 10px;
          font-size: 28px;
          font-weight: normal;
          line-height: 28px;
          letter-spacing: 0px;
          color: #00CCFF;
          z-index: 0;
        }
      }
    }
  }

}
</style>
