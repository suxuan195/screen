<template>
    <div class="pagination">
        <el-pagination v-model:current-page="state.page" v-model:page-size="state.size" :page-sizes="[10, 20, 30, 40, 50]"
            background layout="total, sizes, prev, pager, next" :total="props.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
    
<script setup>
import { reactive } from 'vue'
const props = defineProps({
    total: {
        type: Number,
        default: 100
    },
    page: {
        type: Number,
        default: 1
    },
    size: {
        type: Number,
        default: 10
    }
})
const state = reactive({
    page: 1,
    size: 10
})
const emit = defineEmits(['handleCurrentChange', 'handleSizeChange'])
const handleCurrentChange = (page) => {
    emit('handleCurrentChange', page)
}

const handleSizeChange = (size) => {
    emit('handleSizeChange', size)
}
</script>
    
<style lang="scss" scoped>
.pagination {
    float: right;
    margin-top: 32px;

    :deep(.el-pagination__total) {
        color: #fff;
        font-size: 14px;
    }

    :deep(.el-select .el-input__wrapper) {
        background-color: transparent;
        border-radius: 4px;
        height: 28px;
        line-height: 28px;
        border: none;
        box-shadow: 0 0 0 1px #0093ff inset;
    }

    .el-select {
        margin-top: 20px;
    }

    :deep(.el-select .el-input__inner) {
        color: #fff;
    }

    :deep(.btn-prev) {
        background-color: transparent !important;
        color: #fff;
        position: relative;
        z-index: 100;

        &:hover {
            background-color: #0093ff !important;
        }
    }

    :deep(.btn-next) {
        background-color: transparent !important;
        color: #fff;
        position: relative;
        z-index: 100;

        &:hover {
            background-color: #0093ff !important;
        }
    }

    :deep(.el-pager li) {
        background-color: transparent !important;
        color: #fff;
        border-radius: 4px;
        font-size: 14px;
    }

    :deep(.el-pager li.is-active) {
        background-color: #0093ff !important;
    }

    :deep(.el-pagination .el-select .el-input) {
        width: 100px;
    }
}
</style>