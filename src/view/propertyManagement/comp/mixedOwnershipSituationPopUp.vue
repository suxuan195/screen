<template>
  <popup :width="1127" :height="456" :showModel="props.showModel" title="混合所有制情况" class="popup1">
    <div class="tableX">
      <el-table :data="state.tableData" style="width: 100%" max-height="356px" :cell-style="{
        color: 'white',
        border: '1px solid #193362',
      }" class="custom-table" :header-cell-style="{
  borderTop: '1px solid #11518C',
  borderBottom: '1px solid #1D80CF', borderLeft: '2px solid',
  borderRight: '1px solid',
  borderImage: 'linear-gradient(180deg,  rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2' /* 先设置透明的左边框 */

}">
        <template v-for="(item, index) in state.tableHeader" :key="index">
          <el-table-column show-overflow-tooltip :prop="item.prop" :label="item.label" :width="item.width"
            align="center" />
        </template>
      </el-table>
    </div>
  </popup>
</template>

<script setup>
import popup from "@components/popup/pop.vue";
import { nationalCapital, stateOwnedLegalPersonCapital, nonStateOwnedCapital } from '../temp/mixedOwnershipSituationData.js'
import { reactive, watch } from "vue";
const state = reactive({
  tableData: [],
  tableHeader: [
    {
      label: "部门",
      width: "400",
      prop: "department",
    },
    {
      label: "金额",
      width: "350",
      prop: "money",
    },
    {
      label: "比例",
      width: "330",
      prop: "proportion",
    }
  ],
});
const props = defineProps({
  showModel: {
    type: Boolean,
    default: false,
  },
  modelId: {
    type: String,
    default: '-1'
  }
});
watch(() => props.modelId, (v) => {
  getTableData()
})
const getTableData = () => {
  console.log(props.modelId, 'props.modelId')
  if (props.modelId === '国有资本') {
    state.tableData = nationalCapital
  } else if (props.modelId === '国有法人资本') {
    state.tableData = stateOwnedLegalPersonCapital
  } else if (props.modelId === '非国有资本') {
    state.tableData = nonStateOwnedCapital
  } else {
    state.tableData = []
  }
}
</script>

<style lang="scss" scoped>
/* 修改滚动条的样式 */
.left_scroll::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条的宽度 */
  background: linear-gradient(108deg,
      rgba(43, 139, 200, 0.18) 12%,
      rgba(50, 96, 126, 0.3) 85%);
  backdrop-filter: blur(40px);
  border-radius: 10px;
}

/* 修改滚动条滑块的样式 */
.left_scroll::-webkit-scrollbar-thumb {
  width: 2px;
  height: 50px;
  border-radius: 10px;
  opacity: 1;
  background: #d8d8d8;
}

/* 修改滚动条鼠标悬停时滑块的样式 */
.left_scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
  /* 设置鼠标悬停时滑块的背景色 */
}

.tableX {
  padding: 16px 20px;
  width: 1079px;
  height: 356px;
  border-radius: 8px;

  :deep(.custom-table) {
    .el-table__header {
      th {
        background: linear-gradient(0deg, rgba(0, 155, 255, 0.00) 0%, rgba(0, 155, 255, 0.30) 100%);
        border-color: #0c223a;
        color: #ffffff;
        font-size: 14px;
        font-weight: normal;
        line-height: normal;
        text-align: center;
        letter-spacing: 0em;
      }
    }

    /* 这里可以根据需要调整边框线的样式 */
  }
}

:deep(.el-table) {
  background: rgba(32, 153, 245, 0.12);

  .el-table__body tr:hover>td {
    background-color: rgba($color: rgba(32, 153, 245, 0.12), $alpha: .9) !important;
  }

  .el-table__body tr.current-row>td {
    background-color: rgba($color: rgba(32, 153, 245, 0.12), $alpha: .9) !important;
  }
}

:deep(.el-table__expanded-cell) {
  background-color: transparent !important;
}

:deep(.el-table th),
:deep(.el-table tr),
:deep(.el-table td) {
  background-color: transparent;
}

:deep(.el-table__inner-wrapper::before) {
  background: transparent;
}
</style>
