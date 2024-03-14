<template>
  <div class="tableX">
    <el-table :data="props.tableData" tooltip-effect="light" style="width: 100%" max-height="356px"
      :cell-style="cellStyle" class="custom-table" :header-cell-style="headerCellStyle">
      <slot></slot>
    </el-table>
  </div>
</template>

<script setup>
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
});
const cellStyle = {
  background: 'rgba(18,50,86)',
  color: 'white',
  border: '2px solid #193362',
}
const headerCellStyle = {
  borderTop: '2px solid #11518C',
  borderBottom: '2px solid #1D80CF',
  borderLeft: '2px solid',
  borderRight: '2px solid',
  borderImage: 'linear-gradient(180deg,  rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2' /* 先设置透明的左边框 */
}
</script>

<style lang="scss" scoped>
.tableX {
  padding: 16px 20px;
  width: 1079px;
  height: 356px;
  border-radius: 8px;

  :deep(.custom-table) {
    .el-table__header {
      th {
        background: linear-gradient(0deg,
            rgba(0, 155, 255, 0) 0%,
            rgba(0, 155, 255, 0.3) 100%);
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
    background-color: rgba($color: rgba(32, 153, 245, 0.12),
        $alpha: 0.9) !important;
  }

  .el-table__body tr.current-row>td {
    background-color: rgba($color: rgba(32, 153, 245, 0.12),
        $alpha: 0.9) !important;
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
  overflow: scroll;
}

:deep(.el-table__inner-wrapper::before) {
  display: none !important;
}
</style>