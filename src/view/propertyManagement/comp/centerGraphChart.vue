<template>
  <div class="centerMap">
    <img src="@images/propertyManagement/map-left.png" alt="" />
    <div ref="container" class="map" style="width: 687px; height: 600px"></div>
    <img src="@images/propertyManagement/map-right.png" alt="" />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import { read, utils } from "xlsx";
import axios from "axios";
const container = ref(null);
const state = reactive({
  colorList: ["#3458c9", "#caa138", "#42a3bc"],
  treeData: [],
  data: [],
  links: [],
  sizeList: [100, 55, 45],
  option: {
    series: [
      {
        type: "graph",
        legendHoverLink: false,
        layout: "force",
        force: {
          repulsion: 300,
          edgeLength: 100,
        },
        nodeScaleRatio: 0.6,
        symbolSize: 100,
        draggable: true,
        roam: true,
        scaleLimit: {
          //所属组件的z分层，z值小的图形会被z值大的图形覆盖
          min: 0.5, //最小的缩放值
          max: 3, //最大的缩放值
        },
        draggable: false,
        animation: false,
        lineStyle: {
          type: "dashed",
          color: "#fff",
          opacity: 1,
          width: 1,
          curveness: 0.3,
        },
        label: {
          show: true,
          fontSize: 12,
          color: "#A9D5FD",
        },
        force: {
          repulsion: 230,
          layoutAnimation: false,
          gravity: 0.2,
        },
        itemStyle: {
          color: "rgba(0, 213, 255,.8)",
          shadowColor: "rgb(31,93,134)",
          shadowBlur: 6,
          borderColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "rgb(91,152,177,.4)", // 起始颜色
              },
              {
                offset: 0.2,
                color: "rgba(31,93,134,.3)", // 起始颜色
              },
              {
                offset: 0.8,
                color: "rgba(30,92,136,.4)", // 结束颜色
              },
            ],
          },
          borderWidth: 6,
        },
        data: [],
        links: [],
      },
    ],
  },
});

const handleFileRead = async () => {
  try {
    const response = await axios.get("./产权管理20231009.xls", {
      responseType: "arraybuffer",
    });
    const data = new Uint8Array(response.data);
    const workbook = read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[10]];
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
    let arr = jsonData.map((item) => {
      return {
        code: item[0],
        level: item[1],
        name: item[2],
        p_code: item[3],
        p_name: item[4],
      };
    });
    state.treeData = [
      {
        name: "甘肃省国资委",
        level: 0,
        children: arrayToTree(arr, "11620000739610982J"),
      },
    ];
  } catch (error) {
    console.error(error);
  }
};

// 数组转tree数据
function arrayToTree(array) {
  const map = {};
  const tree = [];
  for (const item of array) {
    map[item.code] = { ...item, children: [] };
  }
  for (const item of array) {
    const parent = map[item.p_code];
    if (parent) {
      parent.children.push(map[item.code]);
    } else {
      tree.push(map[item.code]);
    }
  }
  return tree;
}

const getData = (data, arr) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    arr.push({
      name: node.name,
      itemStyle: {
        color: state.colorList[node.level % 3],
      },
      symbolSize: state.sizeList[node.level],
    });
    if (node.children && node.children.length > 0) {
      getData(node.children, arr);
    }
  }
};

const generateObjectArray = (data, parentName = null) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const obj = {
      source: parentName,
      target: node.name,
    };
    result.push(obj); // 将生成的对象添加到结果数组中
    if (node.children && node.children.length > 0) {
      const childrenResult = generateObjectArray(node.children, node.name); // 递归调用，生成子节点的对象数组
      result.push(...childrenResult); // 将子节点的对象数组合并到结果数组中
    }
  }
  return result;
};
let myChart;
const init = async () => {
  await handleFileRead();
  myChart = echarts.init(container.value);
  getData(state.treeData, state.data);
  state.links = generateObjectArray(state.treeData);
  state.option.series[0].data = state.data;
  state.option.series[0].links = state.links;
  myChart.setOption(state.option);
};
onMounted(() => {
  init();
});
defineExpose({
  init,
});
</script>

<style lang="scss" scoped>
.centerMap {
  width: 960px;
  height: 555px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;

  .map {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -50px;
  }
}
</style>