<template>
  <div class="scroll-table">
    <el-table :data="tableData" :height="height" style="width: 100%" tooltip-effect="light" @row-click="rowClick">
      <!-- 序号 -->
      <el-table-column :label="hasIndexTitle" width="85" v-if='hasIndex' align="center">
        <template #default="scope">
          <p :class="props.IndexColorList && props.IndexColorList.length ? 'item' : ''"
            :style="props.IndexColorList ? props.IndexColorList[scope.$index] : ''">{{ scope.$index + 1
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column v-for="item in options" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
        show-overflow-tooltip :class-name="item.className" align="center">
        <template #default="scope">
          <div v-if="colorList.includes(item.prop)">
            <span style="color: #32D6F9;"> {{ scope.row[item.prop] }} </span>
          </div>
          <div v-if="otherColorList.includes(item.prop)">
            <span :style="{ color: scope.row[item.prop] < 0 ? ' #F1606C' : '#07EB71' }">{{
              scope.row[item.prop] +
              (scope.row[item.prop] ? '%' : '')
            }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
<script setup>
const props = defineProps({
  hasIndex: {
    type: Boolean,
    default: false
  },
  hasIndexTitle: {
    type: String,
    default: '序号'
  },
  IndexColorList: {
    type: Array,
    default: () => [],
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  height: {
    type: Number,
    default: 180,
  },
  colorList: {
    type: Array,
    default: () => [],
  },
  otherColorList: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['rowClick'])
const rowClick = (row) => {
  emit('rowClick', row)
}
</script>
  
<style lang="scss" scoped>
.scroll-table {
  padding: 14px;

  .flex {
    display: flex;
  }

  :deep(.item) {
    width: 24px;
    height: 24px;
    opacity: 1;
    text-align: center;
    line-height: 24px;
    margin: 0 20px;
    border-radius: 50%;
  }
}

.el-table {
  :deep(.active) {
    color: red !important;
  }

  :deep(thead) {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 0;
      border-bottom: 2px solid !important;
      border-image: linear-gradient(90deg,
          rgba(54, 177, 255, 0) 0%,
          rgba(54, 177, 255, 0.6) 50%,
          rgba(0, 0, 0, 0) 99%) !important;
      border-image-slice: 1 !important;
      left: 0;
      bottom: 0;
    }
  }

  :deep(th.el-table__cell) {
    border: none !important;
  }

  :deep(.el-table__cell) {
    background: transparent !important;
    border-bottom: 1px dashed rgba(219, 249, 255, 0.5) !important;
  }

  :deep(tr) {
    background: transparent !important;
  }

  :deep(th) {
    padding: 0;

    .cell {
      font-size: 14px;
      line-height: 34px;
      color: #32d6f9;
      background: transparent !important;
    }
  }

  :deep(td) {
    padding: 0;

    .cell {
      font-size: 14px;
      line-height: 34px;
      color: #DBF9FF;
    }
  }
}

:deep(.el-table__inner-wrapper::before) {
  display: none;
}

:deep(.el-table--fit) {
  background: transparent !important;
}
</style>