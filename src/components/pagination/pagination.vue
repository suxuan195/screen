<template>
    <div class="pagination">
        <div class="info">共{{ props.total }}条</div>
        <div class="page-size">
            每页
            <div class="select" @click.self="state.explanShow = true"> {{ state.selectVal }} <el-icon>
                    <CaretBottom />
                </el-icon>
                <div class="explan" v-show="state.explanShow">
                    <span v-for="(item, index) in  props.pageSizes" :key="index" @click.stop="selectChange(item)">{{ item
                    }}</span>
                </div>
            </div>
            条
        </div>
        <div class="pager">
            <el-pagination small background layout="prev, pager, next" :total="props.total" @current-change="pageChage" />
        </div>
    </div>
</template>
  
<script setup>
import { reactive } from 'vue'
const props = defineProps({
    total: {
        type: Number,
        default: 1929
    },
    currentPage: {
        type: Number,
        default: 0
    },
    pageSize: {
        type: Number,
        default: 10
    },
    pageSizes: {
        type: Array,
        default() {
            return [10, 20, 30, 40]
        }
    }
})

const state = reactive({
    selectVal: 10,
    explanShow: false
})

const emit = defineEmits(['pageChage', 'sizeChange'])
const pageChage = (currentPage) => {
    emit('pageChage', currentPage)
}
const selectChange = (val) => {
    state.selectVal = val
    state.explanShow = false
    emit('sizeChange', val)
}
</script>
<style lang="scss" scoped>
:deep(.pagination) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 32px;
    position: relative;
    z-index: 10000;

    .el-select {
        margin: 0 5px;

        .el-input__wrapper {
            width: 60px;
            background: transparent;

            .el-input__inner {
                color: #FFFFFF;

            }
        }
    }

    .info {
        font-size: 14px;
        font-weight: normal;
        line-height: 14px;
        letter-spacing: 0px;
        color: rgba(255, 255, 255, 0.75);
    }


    .page-size {
        margin-left: 10px;
        font-size: 14px;
        font-weight: normal;
        line-height: 14px;
        letter-spacing: 0px;
        color: rgba(255, 255, 255, 0.75);
        display: flex;
        align-items: center;

        .select {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 5px;
            width: 59.92px;
            height: 28px;
            border-radius: 4px;
            opacity: 1;
            border: 1px solid #1D83CF;
            cursor: pointer;
            position: relative;

            .el-icon {
                margin-left: 20px;
            }

            .explan {
                z-index: 100;
                position: absolute;
                top: 28px;
                left: 0;
                width: 100%;
                height: 100px;
                max-height: 100px;
                background: rgb(18, 50, 86);
                padding: 5px 0;
                box-sizing: border-box;

                span {
                    display: block;
                    line-height: 22px;
                    text-align: center;
                }
            }
        }


    }

    .pager {
        margin-left: 30px;

        .btn-prev,
        .btn-next {
            background: transparent;
            color: #FFFFFF;
            font-size: 20px;
        }

        .el-pager {
            li {
                background: transparent;
                color: rgba(255, 255, 255, 0.75);
                font-size: 14px;
                margin: 0 15px;
            }

            .is-active {
                background: #0093FF;
                color: #FFFFFF;
            }
        }
    }

}
</style>

  